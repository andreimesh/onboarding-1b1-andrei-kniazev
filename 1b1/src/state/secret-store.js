
/**
 * @typedef {Object} BrokerBrandInfo
 * @property {string} brokerLogoUrl - The URL to the broker's logo (light version).
 * @property {string} brokerLogo - The base64-encoded broker logo.
 * @property {string} logoLightUrl - The URL to the light version of the logo.
 * @property {string} logoDarkUrl - The URL to the dark version of the logo.
 * @property {string} iconLightUrl - The URL to the light version of the icon.
 * @property {string} [iconDarkUrl] - The URL to the dark version of the icon (optional).
 */

/**
 * @typedef {Object} AccountToken
 * @property {any} [properties] - Properties of the account token (object shape unspecified).
 */

/**
 * @typedef {Object} AccessToken
 * @property {AccountToken[]} accountTokens - Array of account tokens associated with the access token.
 * @property {BrokerBrandInfo} brokerBrandInfo - Branding information for the broker.
 * @property {string} brokerName - Name of the broker (e.g., "Coinbase").
 * @property {string} brokerType - Type of the broker (e.g., "coinbase").
 * @property {number} expiresInSeconds - Time in seconds until the access token expires.
 * @property {number|undefined} [refreshTokenExpiresInSeconds] - Time in seconds until the refresh token expires, if available.
 */

/**
 * Root object containing accessToken details.
 * 
 * @typedef {Object} AccessTokenResponse
 * @property {AccessToken} accessToken - The main access token object.
 */

/** @type {AccessToken|null} */
let storedPayload = null;

/**
 * @param {AccessTokenResponse} payload - The payload to store, containing access token details.
 * @param {'linkA'|'linkB'} key - The key of the link to disconnect.
 */
export function storeOnIntegrationsPayload(payload, key) {
  if (key == null) throw new Error("Key must be provided to store payload.");
  storedPayload = payload.accessToken;
  // store the payload in session storage
  sessionStorage.setItem(`meshAccessToken-${key}`, JSON.stringify(storedPayload));
}

/**
 * @returns {AccessToken} The stored access token.
 * @throws {Error} If no stored payload is found.
 * @param {'linkA'|'linkB'} key - The key of the link to disconnect.
 */
export function getStoredPayload(key) {
  if (key == null) throw new Error("Key must be provided to store payload.");
  const storedPayload = sessionStorage.getItem(`meshAccessToken-${key}`);
  if (storedPayload) {
    const parsedPayload = JSON.parse(storedPayload);
    return parsedPayload;
  }
  throw new Error("No stored payload found, please link first.");
}

/**
 * @param {'linkA'|'linkB'} key - The key of the link to disconnect.
 * @return {string} The stored access token.
 */
export function getAuthToken(key) {
  if (key == null) throw new Error("Key must be provided to store payload.");
  const storedPayload = sessionStorage.getItem(`meshAccessToken-${key}`);
  if (storedPayload) {
    const parsedPayload = JSON.parse(storedPayload);
    return parsedPayload.accountTokens[0].accessToken;
  }
  throw new Error("No stored payload found, please link first.");
}

export function getBrokerType(key) {
  if (key == null) throw new Error("Key must be provided to store payload.");
  const storedPayload = sessionStorage.getItem(`meshAccessToken-${key}`);
  if (storedPayload) {
    const parsedPayload = JSON.parse(storedPayload);
    return parsedPayload.brokerType;
  }
  throw new Error("No stored payload found, please link first.");
}


export function storeRefreshToken(refreshToken, key) {
  if (key == null) throw new Error("Key must be provided to store payload.");
  // store the refresh token in session storage
  sessionStorage.setItem(`meshRefreshToken-${key}`, refreshToken);
}

export function getRefreshToken(key) {
  if (key == null) throw new Error("Key must be provided to store payload.");
  const storedRefreshToken = sessionStorage.getItem(`meshRefreshToken-${key}`);
  if (storedRefreshToken) {
    return storedRefreshToken;
  }
  throw new Error("No stored refresh token found, please link first.");
}

/**
 * @returns {AccessToken|null} Return null if no stored payload is found
 */
export function tryGetStoredPayload(key) {
  if (key == null) throw new Error("Key must be provided to store payload.");
  const storedPayload = sessionStorage.getItem(`meshAccessToken-${key}`);
  if (storedPayload) {
    const parsedPayload = JSON.parse(storedPayload);
    return parsedPayload;
  }
  return null;
}


export function clearStoredPayloadForAll() {
  sessionStorage.removeItem(`meshAccessToken-linkA`);
  sessionStorage.removeItem(`meshAccessToken-linkB`);
  storedPayload = null;
}
