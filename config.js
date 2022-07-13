const urlPath = "/certificate";
const registerMemberLimit = 4;
const certificatePublicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0xhXTEY4yw8wFnVUsu0UGG/d9vqGJ014C/P9hPZJbddMMnyneoVW+lx7TYO1Im2aF09lQEDiB6zgr7ZOv7yW0EPhUnFGrZWj23OrM7/GBL1hqnsNE7rsM7tMAHReZgvd7zY4mI7fmcDB6NfU2V9CQsd/ldctfmgqH+wP2ADHjlsL9VRUS3djvTRbZgEdZyCgxilO/U1Ya5u4jEOBelkFhKV3ve+wtqfgHNql2FWM6x2vw7Ff2BYplV57zEYltoscvMezu8iad/xmbDdTJQ4I0gT//KhQvoU7uaNBqByWCjAJNLeDTh41T8UsTzj5JsYfLXkK6ZRiaxMTN/IxNsvDxwIDAQAB\n-----END PUBLIC KEY-----"

const CERTIFICATE_CONTROLLER_ID = 'https://efda.gov.et/';
const CERTIFICATE_NAMESPACE = "https://efda.gov.et/contexts/v1";
const CERTIFICATE_PUBKEY_ID = 'https://efda.gov.et/i/efda';
const CERTIFICATE_DID = 'did:efda';
const CERTIFICATE_SCAN_TIMEOUT = '45000';
const CERTIFICATE_SIGNED_KEY_TYPE =  'ED25519';
const certificatePublicKeyBase58 = "5tSs7o9ETnfERNP7Kh3WGxEDWny1WHRa1P4BuL9rbtWx";
const CERTIFICATE_FILE = "certificate.json";

module.exports = {
    urlPath,
    certificatePublicKey,
    registerMemberLimit,
    CERTIFICATE_CONTROLLER_ID,
    CERTIFICATE_DID,
    CERTIFICATE_NAMESPACE,
    CERTIFICATE_PUBKEY_ID,
    CERTIFICATE_SCAN_TIMEOUT,
    CERTIFICATE_SIGNED_KEY_TYPE,
    certificatePublicKeyBase58,
    CERTIFICATE_FILE
};