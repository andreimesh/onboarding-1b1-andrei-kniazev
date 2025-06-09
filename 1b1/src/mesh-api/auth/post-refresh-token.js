import { secret, baseUrl } from "../secret"


export async function postRefreshToken(refreshToken, brokerType) {
  if (!refreshToken) {
    throw new Error("Refresh token is required to refresh the access token.");
  }
  if (!brokerType) {
    throw new Error("Broker type is required to refresh the access token.");
  }

  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().clientId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
      type: brokerType,
    })
  };
  const response = await fetch(`${baseUrl()}/api/v1/token/refresh`, options);
  const jsonResponse = await response.json();
  return jsonResponse.content;
}
