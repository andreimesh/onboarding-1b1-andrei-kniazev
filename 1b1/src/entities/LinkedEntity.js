import { ref, computed } from "vue"
import { getLinkToken } from '../mesh-api/get-link-token';
import { createLink } from '@meshconnect/web-link-sdk';
import { secret } from '../mesh-api/secret';


/**
* @type {Array<LinkedEntity>}
*/
const linkedEntities = ref([]);


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

  get isConnected() {
    return this.isConnected;
  }

  get isRefreshNeeded() {
    return this.authToken.refreshToken != null;
  }

  get displayName() {
    return computed(() => this.index + "# " + this.brokerName.value);
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
    this.isConnected.value = true;
    this.authToken = {
      refreshToken: payload.accessToken.accountTokens[0].refreshToken,
      accessToken: payload.accessToken.accountTokens[0].accessToken
    };
    this.brokerName.value = payload.accessToken.brokerName;
    this.brokerType.value = payload.accessToken.brokerType;

    console.log("LinkedEntity index:", this.index, "is connected");
    console.log(this);
  }

  async updateBalance() {
    guardAgainstNotConnected(this);
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


