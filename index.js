const config = require('./config');
const JSZip = require('jszip');
const { verifyCredentials } = require('./certificate-signer/signer');

async function unzipData(data) {
    //remove this
    return data;
    const zip = new JSZip();
    return zip.loadAsync(data).then((contents) => {
        return contents.files[config.CERTIFICATE_FILE].async('text')
    });
};
async function verifyData(data) {
    try {
        const unZippedData = await unzipData(data)
        const signedJson = JSON.parse(unZippedData)
      return  await verifyCredentials(JSON.parse(data)).then(result => {
            if (result.verified)
                return { verified: true, data: signedJson.credentialSubject }
            return { verified: false, data: {} }
        });
    } catch (e) {
           return { verified: false, data: {} }
    }
}
console.log(verifyData(JSON.stringify({
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://dev.vc.efda.gov.et/context/v1"
    ],
    "type": [
        "VerifiableCredential",
        "marketAuthorizationCertificateDevice"
    ],
    "credentialSubject": {
        "id": "04908/07179/NFDR/2021",
        "type": "marketAuthorizationCertificateDevice",
        "infoUrl": "https://dev.vc.efda.gov.et/api/v1/certificate/614b96a9-a5df-4d6a-a37b-3e66dd3ddae5",
        "registrationNo": "189/09/NMDR/LD",
        "typeOfRegistration": "New IVD",
        "productName": "Anticoagulant Citrate Dextrose Solution",
        "agentName": "Infinity Advanced Technology Solution PLC",
        "approvalDate": "2022-07-01T12:12:00Z",
        "expiryDate": "2021-07-01T12:12:00Z",
        "brandName": "",
        "manufacturer": {
            "name": "Terumo Penpol Private Limited",
            "country": "India"
        }
    },
    "issuanceDate": "2022-07-01T12:12:00Z",
    "issuer": "did:efda:23423#21",
    "proof": {
        "type": "Ed25519Signature2018",
        "created": "2022-11-07T09:05:34Z",
        "verificationMethod": "did:efda:23423#21",
        "proofPurpose": "assertionMethod",
        "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..ydhF1X_PzOyxErfvUIesfgM7Hm91uK2EIEy8b-LOzNOMDWIJSITbn3CC7BXIIQz4X1aNjo-IvJZbQ9twEUaOBQ"
    }
})));