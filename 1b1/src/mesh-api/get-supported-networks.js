import { secret, baseUrl } from "./secret"


export async function getSupportedNetworks() {
  const options = {
    method: 'GET',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().clientId,
      'Content-Type': 'application/json'
    },
  };

  const response = await fetch(`${baseUrl()}/api/v1/transfers/managed/networks`, options)
  return response.json()
} 
