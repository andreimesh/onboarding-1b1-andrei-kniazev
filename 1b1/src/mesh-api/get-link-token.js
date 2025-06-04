import { secret, baseUrl } from "./secret"

/**
 * Represents the response from a function that generates a link token or similar operation.
 *
 * @typedef {Object} LinkTokenResponse
 * @property {Object} content - The content payload of the response.
 * @property {string} content.linkToken - The generated link token (usually a Base64 or encoded URL string).
 * @property {string} status - The status of the request, e.g., 'ok' for success.
 * @property {string} message - Optional message from the API, typically empty on success.
 * @property {string} errorType - Error type, if any. Empty string if no error occurred.
 * @returns {LinkTokenResponse}
 */
export async function getLinkToken() {
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

  const response = await fetch(`${baseUrl()}/api/v1/linktoken`, options)
  return response.json()
}
