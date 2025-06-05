import { secret, baseUrl, getStoredPayload } from "./secret"


/**
 * @typedef {Object} Balance
 * @property {number} buyingPower - The available buying power in the account.
 * @property {number} cash - The cash available in the account.
 * @property {number} cryptocurrencyBuyingPower - The available buying power for cryptocurrencies.
 * @property {string} currencyCode - The currency code (e.g., "USD").
 */

/**
 * @typedef {Object} BalancesResponse
 * @property {Balance[]} balances - Array of balance objects for different currencies/accounts.
 * @property {number} totalBuyingPowerUsdValue - The total buying power in USD.
 * @property {number} totalCashUsdValue - The total cash value in USD.
 */


/**
 * @param {'linkA'|'linkB'} key
 * @returns {Promise<BalancesResponse>} A promise that resolves to the balances response object.
 */
export async function getBalance(key) {
  const authToken = getStoredPayload(key).accountTokens[0].accessToken;
  const brokerType = getStoredPayload(key).brokerType;
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

  const response = await fetch(`${baseUrl()}/api/v1/balance/get`, options);
  const jsonResponse = await response.json();
  return jsonResponse.content;
}
