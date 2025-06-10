export class CryptocurrencyPosition {
  /**
   * Creates a new CryptocurrencyPosition.
   * @param {string} name - The name of the cryptocurrency (e.g., "Bitcoin").
   * @param {string} symbol - The symbol of the cryptocurrency (e.g., "BTC").
   * @param {number} amount - The amount of the cryptocurrency held.
   */
  constructor(name, symbol, amount) {
    /** @type {string} */
    this.name = name;
    /** @type {string} */
    this.symbol = symbol;
    /** @type {number} */
    this.amount = amount;
  }
}
