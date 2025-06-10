export class NetworkModel {
  /**
   * Creates a new NetworkInfo instance.
   * @param {Object} params
   * @param {string} params.caipNetworkId - The CAIP network identifier (e.g., "eip155:8453").
   * @param {boolean} params.eligibleForTransfer - Whether transfer is eligible.
   * @param {boolean} params.eligibleForTransferWithFunding - Whether transfer is eligible if funded.
   * @param {string} params.id - The unique identifier for the network.
   * @param {string} params.ineligibilityReason - The reason for ineligibility, if any.
   * @param {string} params.logoUrl - The logo URL for the network.
   * @param {string} params.name - The display name of the network.
   */
  constructor({
    caipNetworkId,
    eligibleForTransfer,
    eligibleForTransferWithFunding,
    id,
    ineligibilityReason,
    logoUrl,
    name
  }) {
    /** @type {string} */
    this.caipNetworkId = caipNetworkId;
    /** @type {boolean} */
    this.eligibleForTransfer = eligibleForTransfer;
    /** @type {boolean} */
    this.eligibleForTransferWithFunding = eligibleForTransferWithFunding;
    /** @type {string} */
    this.id = id;
    /** @type {string} */
    this.ineligibilityReason = ineligibilityReason;
    /** @type {string} */
    this.logoUrl = logoUrl;
    /** @type {string} */
    this.name = name;
  }
}
