import { getLinkToken } from '../mesh-api/get-link-token';
import { createLink } from '@meshconnect/web-link-sdk';
import { secret } from '../mesh-api/secret';
import { postBalanceGet } from '../mesh-api/balance/post-balance-get';
import { postRefreshToken } from '../mesh-api/auth/post-refresh-token';
import { postHoldingsGet } from '../mesh-api/holdings/post-holdings-get'
import { ref } from 'vue';
import { CryptocurrencyPosition } from '../models/CryptocurrencyPosition';

/**
* @type {Array<LinkedEntity>}
*/
export const linkedEntities = ref([]);


export class LinkedEntity {
  isConnected = false;

  authToken = {
    refreshToken: null,
    accessToken: null
  }

  brokerName = null;
  brokerType = null;


  balance = {
    buyingPower: 0,
    cash: 0,
    currencyCode: "USD"
  }

  /**
   * @type {Array<CryptocurrencyPosition>}
   */
  cryptocurrencyPositions = [];

  /**
   * @param {number} index 
   */
  constructor(index) {
    this.index = index;
  }

  static createLink(index) {
    const link = new LinkedEntity(index);
    linkedEntities.value.push(link);
  }

  get isRefreshNeeded() {
    return this.authToken.refreshToken != null;
  }

  async connect() {
    console.log("LinkedEntity.connect() called for index:", this.index);
    const token = await getLinkToken();
    const meshLink =
      createLink({
        clientId: secret().clientId,
        onIntegrationConnected: (payload) => { this.connectThisLink(payload) },
      })
    meshLink.openLink(token.content.linkToken)
  }

  connectThisLink(payload) {
    this.isConnected = true;
    this.authToken = {
      refreshToken: payload.accessToken.accountTokens[0].refreshToken,
      accessToken: payload.accessToken.accountTokens[0].accessToken
    };
    this.brokerName = payload.accessToken.brokerName;
    this.brokerType = payload.accessToken.brokerType;

    console.log("LinkedEntity index:", this.index, "is connected");
    console.log(this);
  }

  async getRefreshedToken() {
    console.log("LinkedEntity.getRefreshedToken() called for:", this);
    guardAgainstNotConnected(this);
    if (this.authToken.refreshToken == null) {
      console.log("No refresh token available for index:", this.index);
      console.log("Skipping token refresh.");
      return;
    }
    const refreshedToken = await postRefreshToken(
      this.authToken.refreshToken,
      this.brokerType);

    this.authToken = {
      refreshToken: refreshedToken.brokerAccountTokens[0].refreshToken,
      accessToken: refreshedToken.brokerAccountTokens[0].accessToken
    };
    console.log("Token was refreshed");
  }

  async updateBalance() {
    guardAgainstNotConnected(this);
    await this.getRefreshedToken();
    const balance = await postBalanceGet(this.authToken.accessToken, this.brokerType)
    this.balance = {
      buyingPower: balance.balances[0].buyingPower,
      cash: balance.balances[0].cash,
      currencyCode: balance.balances[0].currencyCode
    };
    console.log("New balance:", balance);
    console.log("Balance updated for:", this);
  }

  async updateHoldings() {
    guardAgainstNotConnected(this);
    await this.getRefreshedToken();
    const holdings = await postHoldingsGet(this.authToken.accessToken, this.brokerType)
    this.holdings = holdings;
    console.log("New holdings:", holdings);
    console.log("Holdings updated for:", this);
    for (const holding of holdings.cryptocurrencyPositions) {
      this.cryptocurrencyPositions.push(new CryptocurrencyPosition(
        holding.name,
        holding.symbol,
        holding.amount
      ));
    }
  }

  /**
   * @param {number} index
   * @return {LinkedEntity|null}
   */
  getLinkedEntity(index) {
    const entity = linkedEntities.value.find(ent => ent.index === index);
    return entity || null;
  }


  async getToken() {

  }
}



/**
 * Will throw if not connected.
 * @param {LinkedEntity} entity
 */
function guardAgainstNotConnected(entity) {
  if (entity.isConnected === false) {
    console.error(entity);
    throw new Error("Entity is not connected. Please connect first.");
  }
}


