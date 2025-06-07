import { secret, baseUrl } from "./secret"


export async function refreshToken(type, refreshToken) {
  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().clientId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
      type: type
    })
  };

  const response = await fetch(`${baseUrl()}/api/v1/token/refresh`, options);
  const responseJson = await response.json();
  console.warn(responseJson);
}
