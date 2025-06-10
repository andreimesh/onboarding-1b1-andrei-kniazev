/**
 * Represents the relevant fields for a transfer preview, as used in the PreviewTransfer component.
 */
export class PreviewTransferResult {
  /**
   * @param {Object} params
   * @param {string} params.networkName
   * @param {string} params.symbol
   * @param {number|string} params.amount
   * @param {Object} params.estimatedNetworkGasFee
   * @param {number|string} params.estimatedNetworkGasFee.fee
   * @param {string} params.estimatedNetworkGasFee.feeCurrency
   * @param {number|string} params.totalEstimatedAmount
   * @param {string} params.toAddress
   * @param {string} [params.refundAddress]
   * @param {number|string} params.amountToReceive
   * @param {number|string} params.amountInFiat
   * @param {string} params.fiatCurrency
   */
  constructor({
    networkName,
    symbol,
    amount,
    estimatedNetworkGasFee,
    totalEstimatedAmount,
    toAddress,
    refundAddress,
    amountToReceive,
    amountInFiat,
    fiatCurrency
  }) {
    this.networkName = networkName;
    this.symbol = symbol;
    this.amount = amount;
    this.estimatedNetworkGasFee = estimatedNetworkGasFee;
    this.totalEstimatedAmount = totalEstimatedAmount;
    this.toAddress = toAddress;
    this.refundAddress = refundAddress;
    this.amountToReceive = amountToReceive;
    this.amountInFiat = amountInFiat;
    this.fiatCurrency = fiatCurrency;
  }
}
