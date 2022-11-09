const contexts = {
  '@context': {
    '@version': 1.1,
    '@protected': true,
    id: '@id',
    type: '@type',
    infoUrl: 'schema:infoUrl',
    certificateId: 'schema:id',
    importPermitCertificate: {
      '@id': 'cred:importPermitCertificate',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        applicationNumber: 'schema:applicationNumber',
        performaInvoiceNumber: 'schema:performaInvoiceNumber',
        amount: 'schema:amount',
        agentName: 'schema:agentName',
        agentTin: 'schema:agentTin',
        decisionDate: 'schema:decisionDate',
        supplier: {
          '@id': 'cred:importPermitCertificate',
          '@context': {
            name: 'schema:name',
            country: 'schema:country',
          },
        },
        products: {
          '@id': 'cred:importPermitCertificate',
          '@context': {
            name: 'schema:name',
            quantity: 'schema:quantity',
            manufacturer: 'schema:manufacturer',
          },
        },
      },
    },
    marketAuthorizationCertificateMedicine: {
      '@id': 'cred:marketAuthorizationCertificateMedicine',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        registrationNo: 'schema:registrationNo',
        typeOfRegistration: 'schema:typeOfRegistration',
        productName: 'schema:productName',
        agentName: 'schema:agentName',
        approvalDate: 'schema:approvalDate',
        expiryDate: 'schema:expiryDate',
        brandName: 'schema:brandName',
        manufacturer: {
          '@id': 'cred:marketAuthorizationCertificateMedicine',
          '@context': {
            name: 'schema:name',
            country: 'schema:type',
          },
        },
      },
    },
    marketAuthorizationCertificateDevice: {
      '@id': 'cred:marketAuthorizationCertificateDevice',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        registrationNo: 'schema:registrationNo',
        typeOfRegistration: 'schema:typeOfRegistration',
        productName: 'schema:productName',
        agentName: 'schema:agentName',
        approvalDate: 'schema:approvalDate',
        expiryDate: 'schema:Text',
        brandName: 'schema:brandName',
        manufacturer: {
          '@id': 'cred:marketAuthorizationCertificateDevice',
          '@context': {
            name: 'schema:name',
            country: 'schema:type',
          },
        },
      },
    },
    marketAuthorizationCertificateFood: {
      '@id': 'cred:marketAuthorizationCertificateFood',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        registrationNo: 'schema:registrationNo',
        typeOfRegistration: 'schema:typeOfRegistration',
        productName: 'schema:productName',
        agentName: 'schema:agentName',
        approvalDate: 'schema:approvalDate',
        expiryDate: 'schema:expiryDate',
        brandName: 'schema:brandName',
        manufacturer: {
          '@id': 'cred:marketAuthorizationCertificateFood',
          '@context': {
            name: 'schema:name',
            country: 'schema:type',
          },
        },
      },
    },
    variationNotificationLetterMedicine: {
      '@id': 'cred:variationNotificationLetterMedicine',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        applicationNumber: 'schema:applicationNumber',
        productName: 'schema:productName',
        agentName: 'schema:agentName',
        agentTin: 'schema:agentTin',
        brandName: 'schema:brandName',
        manufacturer: {
          '@id': 'cred:variationNotificationLetterMedicine',
          '@context': {
            name: 'schema:name',
            country: 'schema:type',
          },
        },
      },
    },
    foodNotificationCertificate: {
      '@id': 'cred:foodNotificationCertificate',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        registrationNo: 'schema:registrationNo',
        typeOfRegistration: 'schema:typeOfRegistration',
        productName: 'schema:productName',
        agentName: 'schema:agentName',
        approvalDate: 'schema:approvalDate',
        expiryDate: 'schema:expiryDate',
        brandName: 'schema:brandName',
        manufacturer: {
          '@id': 'cred:foodNotificationCertificate',
          '@context': {
            name: 'schema:name',
            country: 'schema:type',
          },
        },
      },
    },
    accessoryRegistrationApprovalLetter: {
      '@id': 'cred:accessoryRegistrationApprovalLetter',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        productName: 'schema:productName',
        agentName: 'schema:agentName',
        approvalDate: 'schema:approvalDate',
        expiryDate: 'schema:expiryDate',
        brandName: 'schema:brandName',
      },
    },
    licenseInspectionLetter: {
      '@id': 'cred:licenseInspectionLetter',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        facility: 'schema:facility',
        agentName: 'schema:agentName',
        agentTin: 'schema:agentTin',
        applicationNumber: 'schema:applicationNumber',
        licenseNumber: 'schema:licenseNumber',
        decisionDate: 'schema:decisionDate',
      },
    },
    iLicenseCompetencyCertificate: {
      '@id': 'cred:iLicenseCompetencyCertificate',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        applicationNumber: 'schema:applicationNumber',
        applicationType: 'schema:applicationType',
        changeType: 'schema:changeType',
        licenseNumber: 'schema:licenseNumber',
        nameOfOrganization: 'schema:nameOfOrganization',
        tinNumber: 'schema:tinNumber',
        facilityType: 'schema:facilityType',
        productType: 'schema:productType',
        product: {
          '@id': 'cred:iLicenseCompetencyCertificate',
          '@context': {
            name: 'schema:name',
            code: 'schema:code',
          },
        },
        issueDate: 'schema:issueDate',
        expiryDate: 'schema:expiryDate',
      },
    },
    cGMPCertificate: {
      '@id': 'cred:cGMPCertificate',
      '@context': {
        '@version': 1.1,
        '@protected': true,
        applicationNumber: 'schema:applicationNumber',
        certificateNumber: 'schema:applicationNumber',
        manufacturer: {
          '@id': 'cred:cGMPCertificate',
          '@context': {
            name: 'schema:name',
            country: 'schema:type',
          },
        },
        issueDate: 'schema:issueDate',
        expiryDate: 'schema:expiryDate',
      },
    },
  },
};

module.exports = { certificateContexts: contexts };
