import { secret, baseUrl } from "../secret"


export async function postHoldingsGet(authToken, brokerType) {
  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().clientId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      authToken: authToken,
      type: brokerType,
    })
  };
  const response = await fetch(`${baseUrl()}/api/v1/holdings/get`, options);
  const jsonResponse = await response.json();
  return jsonResponse.content;
}
