import { ref } from "vue"
import { getLinkToken } from '../mesh-api/get-link-token';
import { createLink } from '@meshconnect/web-link-sdk';

/**
* @type {Array<LinkedEntity>}
*/
const linkedEntities = ref([]);


export class LinkedEntity {


  isConnected = false;

  authToken = {
    refreshToken: null,
    accessToken: null
  }

  brokerName = null;
  brokerType = null;


  /**
   * @param {number} index 
   */
  constructor(index) {
    this.index = index;
  }

  get isConnected() {
    return this.isConnected;
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
      refreshToken: payload.accessToken.refreshToken,
      accessToken: payload.accessToken.accessToken
    };
    this.brokerName = payload.brokerName;
    this.brokerType = payload.brokerType;

    console.log(this);
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
