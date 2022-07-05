const { CertificateContext } = require('./certificate-signer-library/certificate-context');
const { verifyJSON, init_signer } = require('./certificate-signer-library')
const config = require('./config');
const JSZip = require('jszip');
let signingConfig = {
    publicKeyPem: config.certificatePublicKey,
    publicKeyBase58: config.certificatePublicKeyBase58,
    CERTIFICATE_DID: config.CERTIFICATE_DID,
    CERTIFICATE_PUBKEY_ID: config.CERTIFICATE_PUBKEY_ID,
    CERTIFICATE_CONTROLLER_ID: config.CERTIFICATE_CONTROLLER_ID,
    keyType: config.CERTIFICATE_SIGNED_KEY_TYPE
};
let documentLoaderMapping = {
    [config.CERTIFICATE_NAMESPACE]: CertificateContext
}
async function unzipData(data) {
    const zip = new JSZip();
    return zip.loadAsync(data).then((contents) => {
        return contents.files[config.CERTIFICATE_FILE].async('text')
    });
};
init_signer(signingConfig, {}, documentLoaderMapping);
async function verifyData(zippedData) {
    try {
        const unZippedData = await unzipData(zippedData)
        const signedJson = JSON.parse(unZippedData)
        console.log(signedJson,"unzippedData");
        const result = await verifyJSON(signedJson).then(result => {
            if (result.verified)
                return { verified: true, data: signedJson.credentialSubject }
            return { verified: false, data: {} }
        });
        console.log(result, "result");
    } catch (e) {
        console.log("true");
        console.log(e);
        return { verified: false, data: {} }
    }
}
// console.log(verifyData(JSON.stringify({ "@context": ["https://www.w3.org/2018/credentials/v1", "https://efda.gov.et/contexts/v1"], "type": ["VerifiableCredential"], "credentialSubject": { "id": "did:efda:02250/03651/NFDR/2022", "type": "marketAuthorizationCertificateFood", "infoUrl": "https://vc.efda.gov.et/api/v1/certificate/713292fe-e647-4362-99d8-80414e0e7ea1", "registrationNo": "02250/03651/NFDR/2022", "agentName": "ZAF Pharmacuticals", "typeOfRegistration": "Imported Food", "productName": "sdfer", "approvalDate": "30-06-2022", "validUntil": "30-06-2027", "manufacturer": { "name": "2,4 Dichloro Benzyl Alcohol", "country": "Germany" } }, "issuer": "https://efda.gov.et/", "issuanceDate": "2022-06-30T08:04:10.555Z", "proof": { "type": "Ed25519Signature2018", "created": "2022-06-30T08:04:10Z", "verificationMethod": "did:efda", "proofPurpose": "assertionMethod", "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..afcr0MIrHDKwEdPy4ksGHZi5ek2KIDlbAgONriVlQ7z7acTKuxgtfc3BGmSARxHkHk5zdmumRWkWq0W_v3v0DQ" } })))

