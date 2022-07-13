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
async function unzipData(data) {
    const zip = new JSZip();
    return zip.loadAsync(data).then((contents) => {
        return contents.files[config.CERTIFICATE_FILE].async('text')
    });
};
init_signer(signingConfig, {}, {});
async function verifyData(data) {
    try {
        const unZippedData = await unzipData(data)
        const signedJson = JSON.parse(unZippedData)
      return  await verifyJSON(signedJson).then(result => {
            if (result.verified)
                return { verified: true, data: signedJson.credentialSubject }
            return { verified: false, data: {} }
        });
    } catch (e) {
           return { verified: false, data: {} }
    }
}