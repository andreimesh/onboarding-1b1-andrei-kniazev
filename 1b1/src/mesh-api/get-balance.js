import { secret, baseUrl, getStoredPayload } from "./secret"


export async function getBalance() {
  const authToken = getStoredPayload().accountTokens[0].accessToken;
  console.log("Auth Token:", authToken);
  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().clientId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      authToken: authToken,
      type: "coinbase",
    })
  };

  const response = await fetch(`${baseUrl()}/api/v1/balance/get`, options);
  const jsonResponse = await response.json();
  console.log(jsonResponse);

}
