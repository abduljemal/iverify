const signer = require('./signer');
let config ={};
let signingPayloadTransformerFunc;
async function init_signer(conf, signingPayloadTransformer, documentLoader) {
  config = conf;
  signingPayloadTransformerFunc = signingPayloadTransformer;
  signer.setDocumentLoader(documentLoader, conf);
}
async function verifyJSON(signedJSON) {
  return signer.verifyJSON(signedJSON)
}
module.exports = {
  init_signer,
  verifyJSON
};
