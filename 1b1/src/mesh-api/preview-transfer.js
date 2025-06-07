export async function previewTransfer(from, to) {
  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': from.keySecret,
      'X-Client-Id': from.clientId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isInclusiveFeeEnabled: false,
      fromAuthToken: from.authToken,
      fromType: from.brokerType,
      toAuthToken: to.authToken,
      toType: to.brokerType,
      networkId: "",
      symbol: "USDT",
      toAddress: "0x9Bf6207f8A3f4278E0C989527015deFe10e5D7c6",
      amount: 10
    })
  };

  fetch('https://integration-api.meshconnect.com/api/v1/transfers/managed/preview', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  console.warn("Previewing transfer with options:", options);

  const response = await fetch(`${from.baseUrl}/api/v1/transfers/managed/preview`, options);
  const responseJson = await response.json();
  console.warn(responseJson);
  return responseJson;
}
