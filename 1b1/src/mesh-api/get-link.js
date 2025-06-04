import { secret } from './secret';



export function getLink(integration) {

  const body = {
    userId: "UserId",
    configurationId: "18a20b11-e47f-43b9-8546-94284e9ee547",
    restrictMultipleAccounts: true,
    transferOptions: {
      toAddresses: [
        // {
        //   networkId: "47624467-e52e-4938-a41a-7926b6c27acf",
        //   symbol: "Coinbase",
        //   address: "0x00000000000000000000000"
        // },
        // {
        //   networkId: "8a60d227-2825-4158-b14b-3c8443a2b681",
        //   symbol: "Rainbow",
        //   address: "0x00000000000000000000000"
        // },
      ],
      amountInFiat: 10,
      isInclusiveFeeEnabled: false,
      generatePayLink: false
    },
    disableApiKeyGeneration: false
  };
  const bodyCoinbase = {
    "userId": "12345",
    "restrictMultipleAccounts": true,
    "integrationId": "47624467-e52e-4938-a41a-7926b6c27acf" //metamask identifier
  }

  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().keyId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyCoinbase)
  };

  fetch('https://integration-api.meshconnect.com/api/v1/linktoken', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
