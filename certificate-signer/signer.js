const jsigs = require('jsonld-signatures');
const {Ed25519KeyPair, RSAKeyPair} = require('crypto-ld');
const {Ed25519Signature2018, RsaSignature2018} = jsigs.suites;
const vc = require('vc-js');
const {contexts} = require('security-context');
const credentialsv1 = require('./credentialsv1.json');
const { CERTIFICATE_NAMESPACE,CERTIFICATE_CONTROLLER_ID } = require('../config');
const {documentLoaders} = require('jsonld');
const { certificateContexts } = require('./contexts');
const issuers = require('./issuers');
const {node: documentLoader} = documentLoaders;
const DEFAULT = "default";

const KeyType = {
    RSA: "RSA", ED25519: "ED25519"
};

function getKeys(issuer) { 
    let key = (issuer in issuers)?issuer:DEFAULT;
    if (issuers[key] !== undefined) {
        let {publicKey, privateKey, signatureType, verificationMethod} = issuers[key];
        return {publicKey: publicKey, privateKey: privateKey, signatureType: signatureType, verificationMethod};
    }
    throw new Error("Invalid issuer");
}

let documentLoaderMapping = {"https://w3id.org/security/v1": contexts.get("https://w3id.org/security/v1")};
documentLoaderMapping['https://www.w3.org/2018/credentials#'] = credentialsv1;
documentLoaderMapping["https://www.w3.org/2018/credentials/v1"] = credentialsv1;
documentLoaderMapping[CERTIFICATE_NAMESPACE] = certificateContexts;



const customLoader =url => {
    console.log("checking " + url);
    let context = documentLoaderMapping[url];
    if (context === undefined) {
        context = contexts[url];
    }
    if (context !== undefined) {
        return {
            contextUrl: null, documentUrl: url, document: context
        };
    }
    if (url.startsWith("{")) {
        return JSON.parse(url);
    }
    console.log("Fallback url lookup for document :" + url);
    const loadedContext =  documentLoader()(url);
    documentLoaderMapping[url] = loadedContext;
    return loadedContext;
};

function getPublicKey(signingKeyType, publicKey = null, issuerDid = null) {
    const keyType = signingKeyType===KeyType.ED25519?'Ed25519VerificationKey2018':'RsaVerificationKey2018';
    let publicKeyObject =  {
        '@context': jsigs.SECURITY_CONTEXT_URL,
        id: issuerDid,
        type: keyType,
        controller: CERTIFICATE_CONTROLLER_ID,
    };
    let publicKeyPropertyKey = signingKeyType===KeyType.ED25519?'publicKeyBase58':'publicKeyPem';
    publicKeyObject[publicKeyPropertyKey] = publicKey;
    return publicKeyObject;
};

function inferSignatureAlgoType(signedCredentials) {
    switch (signedCredentials?.proof?.type) {
        case 'RsaSignature2018':
        case 'RsaVerificationKey2018':
            return KeyType.RSA;
        default:
            return KeyType.ED25519;
    };
}

const verifyCredentials = async (signedCredentials, externalPublicKey = null) => {

    const signingKeyType = inferSignatureAlgoType(signedCredentials)
    let publicKeyStr = externalPublicKey;
    let {publicKey, verificationMethod} = getKeys(signedCredentials.issuer);
    if (publicKeyStr === null) {
        publicKeyStr = publicKey;
    }

    const publicKeyObject = getPublicKey(signingKeyType, publicKeyStr, verificationMethod);
    const controller = {
        '@context': jsigs.SECURITY_CONTEXT_URL,
        id: verificationMethod,
        publicKey: [publicKeyObject], 
        assertionMethod: [publicKeyObject.id]
    };
    switch (signingKeyType) {
        case KeyType.RSA:
            return await verifyRSACredentials(controller, signedCredentials, publicKeyStr, verificationMethod);
        case KeyType.ED25519:
            return await verifyED25519Credentials(controller, signedCredentials, publicKeyObject);
    }
};

const verifyRSACredentials = async (controller, signedCredentials, externalPublicKey, verificationMethod) => {
    const key = new RSAKeyPair({"id": verificationMethod, "publicKeyPem": externalPublicKey});
    const {AssertionProofPurpose} = jsigs.purposes;
    return await jsigs.verify(signedCredentials, {
        suite: new RsaSignature2018({key}),
        purpose: new AssertionProofPurpose({controller}),
        compactProof: false,
        documentLoader: customLoader
    });
};


async function verifyED25519Credentials(controller, signedCredentials, publicKeyObject) {
    const key = new Ed25519KeyPair({...publicKeyObject});
    const {AssertionProofPurpose} = jsigs.purposes;
    const purpose = new AssertionProofPurpose({
        controller: controller
    });
    return await vc.verifyCredential({
        credential: signedCredentials,
        suite: new Ed25519Signature2018({key}),
        purpose: purpose,
        documentLoader: customLoader,
        compactProof: false
    });
}

module.exports = {
 verifyCredentials
};