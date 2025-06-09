import { secret, baseUrl } from "./secret"

/**
 * Calls the Mesh API to preview a managed transfer.
 * @param {Object} params
 * @param {string} params.fromAuthToken
 * @param {string} params.fromType
 * @param {string} params.toAuthToken
 * @param {string} params.toType
 * @param {string} params.networkId
 * @param {string} params.symbol
 * @param {string} params.toAddress
 * @param {number} params.amount
 * @returns {Promise<Object>} API response
 */
export async function postPreview({
  fromAuthToken,
  fromType,
  toAuthToken,
  toType,
  networkId,
  symbol,
  toAddress,
  amount,
}) {
  const response = await fetch(`${baseUrl}/api/v1/transfers/managed/preview`, {
    method: "POST",
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().clientId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fromAuthToken,
      fromType,
      toAuthToken,
      toType,
      networkId,
      symbol,
      toAddress,
      amount
    })
  });

  if (!response.ok) {
    throw new Error(`Preview transfer failed: ${response.statusText}`);
  }

  return await response.json();
}
