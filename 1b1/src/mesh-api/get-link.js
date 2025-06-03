import { secret } from './secret';

export function getLink() {

  const body = {
    userId: "UserId",
    configurationId: "18a20b11-e47f-43b9-8546-94284e9ee547",
    restrictMultipleAccounts: true,
    transferOptions: {
      toAddresses: [
        {
          networkId: "e3c7fdd8-b1fc-4e51-85ae-bb276e075611",
          symbol: "ETH",
          address: "0x00000000000000000000000"
        },
        {
          networkId: "e3c7fdd8-b1fc-4e51-85ae-bb276e075611",
          symbol: "USDC",
          address: "0x00000000000000000000000"
        },
        {
          networkId: "7436e9d0-ba42-4d2b-b4c0-8e4e606b2c12",
          symbol: "MATIC",
          address: "0x00000000000000000000000"
        },
        {
          networkId: "7436e9d0-ba42-4d2b-b4c0-8e4e606b2c12",
          symbol: "USDC",
          address: "0x00000000000000000000000"
        }
      ],
      amountInFiat: 10,
      isInclusiveFeeEnabled: false,
      generatePayLink: false
    },
    disableApiKeyGeneration: false
  };

  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().keyId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  fetch('https://integration-api.meshconnect.com/api/v1/linktoken', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
