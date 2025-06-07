import { ref, computed } from "vue"
import { getLinkToken } from '../mesh-api/get-link-token';
import { createLink } from '@meshconnect/web-link-sdk';
import { secret } from '../mesh-api/secret';
import { postBalanceGet } from '../mesh-api/balance/post-balance-get';
import { postRefreshToken } from '../mesh-api/auth/post-refresh-token';

/**
* @type {Array<LinkedEntity>}
*/
export const linkedEntities = ref([]);


export class LinkedEntity {
  isConnected = ref(false);

  authToken = {
    refreshToken: null,
    accessToken: null
  }

  brokerName = ref("");
  brokerType = ref("");


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

  get displayName() {
    const brokerName = this.brokerName.value ?? "";
    return computed(() => this.index + "# " + brokerName);
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
    this.isConnected = ref(true);
    this.authToken = {
      refreshToken: payload.accessToken.accountTokens[0].refreshToken,
      accessToken: payload.accessToken.accountTokens[0].accessToken
    };
    this.brokerName.value = payload.accessToken.brokerName;
    this.brokerType.value = payload.accessToken.brokerType;

    console.log("LinkedEntity index:", this.index, "is connected");
    console.log(this);
  }

  async getRefreshedToken() {
    console.log("LinkedEntity.getRefreshedToken() called for index:", this.index);
    guardAgainstNotConnected(this);
    const refreshedToken = postRefreshToken(this.authToken.refreshToken, this.brokerType.value);
    console.warn(refreshedToken);
    console.log("Token was refreshed");
  }

  async updateBalance() {
    guardAgainstNotConnected(this);
    await this.getRefreshedToken();
    // await postBalanceGet(thi)
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
  if (!entity.isConnected.value) {
    throw new Error("Entity is not connected. Please connect first.");
  }
}


