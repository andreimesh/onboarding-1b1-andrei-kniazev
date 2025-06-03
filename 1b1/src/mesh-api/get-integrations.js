import { secret } from './secret';

/**
 * @returns {[]} This is the result
 */
export async function getIntegrations() {
  const options = {
    method: 'GET',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().keyId
    }
  };
  const response = await fetch('https://integration-api.meshconnect.com/api/v1/integrations', options)
  const json = await response.json();
  return json.content.items;
}
