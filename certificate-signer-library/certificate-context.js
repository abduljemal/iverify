const CertificateContext = {

  "@context": {
    "@version": 1.1,
    "@protected": true,
    "id": "@id",
    "type": "@type",
    "infoUrl": "schema:infoUrl",
    "importPermitCertificate": {
      "@id": "cred:importPermitCertificate",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "applicationNumber": "schema:applicationNumber",
        "performaInvoiceNumber": "schema:performaInvoiceNumber",
        "amount": "schema:amount",
        "agentName": "schema:agentName",
        "agentTin": "schema:agentTin",
        "decisionDate": "schema:decisionDate",
        "supplierName": {
          "@id": "cred:importPermitCertificate",
          "@context": {
            "name": "schema:name",
            "country": "schema:country",
          }
        },
        "products": {
          "@id": "cred:importPermitCertificate",
          "@context": {
            "name": "schema:name",
            "quantity": "schema:quantity",
            "manufacturer": "schema:manufacturer"
          }
        }
      }
    },
    "marketAuthorizationCertificateMedicine": {
      "@id": "cred:marketAuthorizationCertificateMedicine",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "registrationNo": "schema:registrationNo",
        "typeOfRegistration": "schema:typeOfRegistration",
        "productName": "schema:productName",
        "agentName": "schema:agentName",
        "approvalDate": "schema:approvalDate",
        "validUntil": "schema:validUntil",
        "manufacturer": {
          "@id": "cred:marketAuthorizationCertificateMedicine",
          "@context": {
            "name": "schema:name",
            "country": "schema:type"
          }
        }
      }
    },
    "marketAuthorizationCertificateDevice": {
      "@id": "cred:marketAuthorizationCertificateDevice",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "registrationNo": "schema:registrationNo",
        "typeOfRegistration": "schema:typeOfRegistration",
        "productName": "schema:productName",
        "agentName": "schema:agentName",
        "approvalDate": "schema:approvalDate",
        "validUntil": "schema:validUntil",
        "manufacturer": {
          "@id": "cred:marketAuthorizationCertificateDevice",
          "@context": {
            "name": "schema:name",
            "country": "schema:type"
          }
        }
      }
    },
    "marketAuthorizationCertificateFood": {
      "@id": "cred:marketAuthorizationCertificateFood",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "registrationNo": "schema:registrationNo",
        "typeOfRegistration": "schema:typeOfRegistration",
        "productName": "schema:productName",
        "agentName": "schema:agentName",
        "approvalDate": "schema:approvalDate",
        "validUntil": "schema:validUntil",
        "manufacturer": {
          "@id": "cred:marketAuthorizationCertificateFood",
          "@context": {
            "name": "schema:name",
            "country": "schema:type"
          }
        }
      }
    },
    "variationNotificationLetterMedicine": {
      "@id": "cred:variationNotificationLetterMedicine",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "applicationNumber": "schema:applicationNumber",
        "productName": "schema:productName",
        "agentName": "schema:agentName",
        "agentTin": "schema:agentTin",
        "manufacturer": {
          "@id": "cred:variationNotificationLetterMedicine",
          "@context": {
            "name": "schema:name",
            "country": "schema:type"
          }
        },
      }
    },
    "foodNotificationCertificate": {
      "@id": "cred:foodNotificationCertificate",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "registrationNo": "schema:registrationNo",
        "typeOfRegistration": "schema:typeOfRegistration",
        "productName": "schema:productName",
        "agentName": "schema:agentName",
        "approvalDate": "schema:approvalDate",
        "validUntil": "schema:validUntil",
        "manufacturer": {
          "@id": "cred:foodNotificationCertificate",
          "@context": {
            "name": "schema:name",
            "country": "schema:type"
          }
        },
      }
    },
    "accessoryRegistrationApprovalLetter": {
      "@id": "cred:accessoryRegistrationApprovalLetter",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "productName": "schema:productName",
        "agentName": "schema:agentName",
        "approvalDate": "schema:approvalDate",
        "validUntil": "schema:validUntil"
      }
    },
    "licenseInspectionLetter": {
      "@id": "cred:licenseInspectionLetter",
      "@context": {
        "@version": 1.1,
        "@protected": true,
        "certificateId": "schema:id",
        "facility": "schema:facility",
        "agentName": "schema:agentName",
        "agentTin": "schema:agentTin",
        "applicationNumber": "schema:applicationNumber",
        "licenseNumber": "schema:licenseNumber",
        "decisionDate": "schema:decisionDate"
      }
    },
  }
};

module.exports = {
  CertificateContext
};
