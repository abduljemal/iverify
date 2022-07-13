const jsigs = require('jsonld-signatures');

const {Ed25519KeyPair} = require('crypto-ld');
const {RSAKeyPair} = require('crypto-ld');
const {documentLoaders} = require('jsonld');
const {node: documentLoader} = documentLoaders;
const {contexts} = require('security-context');
const credentialsv1 = require('./credentials.json');
const vc = require('vc-js');

let documentLoaderMapping = {"https://w3id.org/security/v1" : contexts.get("https://w3id.org/security/v1")};
documentLoaderMapping['https://www.w3.org/2018/credentials#'] = credentialsv1;
documentLoaderMapping["https://www.w3.org/2018/credentials/v1"] = credentialsv1;

let publicKey = {};
let controller = {};
let certificateDID = '';
let publicKeyBase58 = '';
const KeyType = {
  RSA: "RSA",
  ED25519: "ED25519"
};
let signingKeyType = KeyType.RSA;

const getPublicKey = (config) => {
  switch(config.keyType) {
    case KeyType.RSA:
      return {
        '@context': jsigs.SECURITY_CONTEXT_URL,
        id: config.CERTIFICATE_DID,
        type: 'RsaVerificationKey2018',
        controller: config.CERTIFICATE_PUBKEY_ID,
        publicKeyPem: config.publicKeyPem
      };
    case KeyType.ED25519: 
      return {
        '@context': jsigs.SECURITY_CONTEXT_URL,
        id: config.CERTIFICATE_DID,
        type: 'Ed25519VerificationKey2018',
        controller: config.CERTIFICATE_PUBKEY_ID
      }
  }
}

const setDocumentLoader = (customLoaderMapping, config) => {
    privateKeyPem = config.privateKeyPem;
    maxRetrycount = config.CERTIFICATE_RETRY_COUNT;
    signingKeyType = config.keyType || KeyType.RSA;
    publicKey = getPublicKey(config);
    controller = {
        '@context': jsigs.SECURITY_CONTEXT_URL,
        id: config.CERTIFICATE_CONTROLLER_ID,
        publicKey: [publicKey],
        assertionMethod: [publicKey.id]
    };
    documentLoaderMapping[config.CERTIFICATE_DID] = publicKey;
    documentLoaderMapping[config.CERTIFICATE_PUBKEY_ID] = publicKey;
    documentLoaderMapping = {...documentLoaderMapping, ...customLoaderMapping}
    certificateDID = config.CERTIFICATE_DID;
    publicKeyBase58 = config.publicKeyBase58 || '';
    privateKeyBase58 = config.privateKeyBase58 || '';
};

const customLoader = url => {
  console.log("checking " + url);
  let context = documentLoaderMapping[url];
  if (context === undefined) {
    context = contexts[url];
  }
  if (context !== undefined) {
    return {
      contextUrl: null,
      documentUrl: url,
      document: context
    };
  }
  if (url.startsWith("{")) {
    return JSON.parse(url);
  }
  console.log("Fallback url lookup for document :" + url);
  return documentLoader()(url);
};


async function verifyJSON(signedJSON) {
  const {AssertionProofPurpose} = jsigs.purposes;
  let result;
  console.log(signingKeyType,'key type')
  if(signingKeyType === "RSA") {
    const key = new RSAKeyPair({...publicKey});
    const {RsaSignature2018} = jsigs.suites;
    result = await jsigs.verify(signedJSON, {
      suite: new RsaSignature2018({key}),
      purpose: new AssertionProofPurpose({controller}),
      documentLoader: customLoader,
      compactProof: false
    });
  } else if (signingKeyType === "ED25519") {
    const purpose = new AssertionProofPurpose({
      controller: controller
    });
    const {Ed25519Signature2018} = jsigs.suites;
    const key = new Ed25519KeyPair(
      {
        publicKeyBase58: publicKeyBase58,
        id: certificateDID
      }
    );
    result = await vc.verifyCredential({
      credential: signedJSON,
      suite: new Ed25519Signature2018({key}),
      purpose: purpose,
      documentLoader: customLoader,
      compactProof: false
    });
  }

  return result
}

module.exports = {
  verifyJSON,
  customLoader,
  setDocumentLoader,
};
