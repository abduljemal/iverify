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
        const result = await verifyJSON(signedJson).then(result => {
            if (result.verified)
                return { verified: true, data: signedJson.credentialSubject }
            return { verified: false, data: {} }
        });
    } catch (e) {
        return { verified: false, data: {} }
    }
}
