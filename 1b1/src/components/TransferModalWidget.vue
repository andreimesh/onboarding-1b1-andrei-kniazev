<script setup>
import { ref, computed, } from 'vue'
import { useLinksState } from '../state/link-state'
import { getSupportedNetworks } from '../mesh-api/get-supported-networks'
import { clearStoredPayloadForAll } from "../state/secret-store";
import { configureTransfer } from '@/mesh-api/configure-transfer';
import { getAuthToken, getBrokerType } from '../state/secret-store';
import { linkedEntities, LinkedEntity } from '../entities/LinkedEntity';

const props = defineProps({
  entities: {
    required: true,
    type: Array
  }
})


const showModal = ref(false)

const { isConnected, links } = useLinksState();

const isBothConnected = computed(() => {
  return props.entities.every(entity => entity.isConnected);
});


const networks = ref([]);
// Not needed anymore, but keeping for reference
// getSupportedNetworks().then(fetchedNetworks => {
//   networks.value = fetchedNetworks.content.networks;
//   console.log(JSON.stringify(networks.value));
// });

/**
 * @param {LinkedEntity} fromEntity
 * @param {LinkedEntity} toEntity
 */
async function transferMoney(fromEntity, toEntity) {
  await fromEntity.getRefreshedToken();
  await toEntity.getRefreshedToken();

  const to = {
    brokerType: toEntity.brokerType,
    authToken: toEntity.authToken.accessToken,
  }
  const from = {
    brokerType: fromEntity.brokerType,
    authToken: fromEntity.authToken.accessToken,
  }

  await configureTransfer(from, to);
}

function showModalTrue() {
  showModal.value = true;
  console.log(props.entities)
}



</script>

<template>
  <div class="modal-actions">
    <button @click="showModalTrue()">Transfer</button>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <div v-if="!isBothConnected" class="error-message">
          <p>Error! Please connect both links to transfer.</p>
          <button @click="showModal = false">Close</button>
        </div>
        <div v-else>
          <div class="content">
            <h2>Transfer</h2>
            <div>
              <button class="transfer-button" @click="transferMoney(entities[0], entities[1])">
                Transfer 5 USDC: {{ entities[0].brokerName }} to {{ entities[1].brokerName }}</button>
            </div>
            <div>
              <button class="transfer-button" @click="transferMoney(entities[1], entities[0])">
                <!-- https://docs.meshconnect.com/guides/link-initialization#transferring-for-a-specific-amount -->
                (USE UI MESH SDK!) Transfer 5 USDC: {{ entities[1].brokerName }} to {{ entities[0].brokerName
                }}</button>
            </div>
            <div>
              <button @click="showModal = false">Close</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: black;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  min-width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}


.modal-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 42px;
  margin-bottom: 24px;
}

.modal-actions button {
  padding: 6px 15px;
  background: #4078c0;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(64, 120, 192, 0.08);
  transition: background 0.2s, transform 0.15s;
}

.modal-actions button:hover {
  background: #305d8a;
  transform: translateY(-2px) scale(1.02);
}

.error-message {
  color: #a12a27;
  font-weight: 500;
  text-align: center;
}

.error-message p {
  margin-bottom: 16px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.content .transfer-button {
  padding: 12px 24px;
  border: 1px solid #28a745;
  border-color: #28a745;
  color: black;
  border-radius: 6px;
  font-size: 1em;
  background-color: white;

  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.08);
}

.content .transfer-button:hover {
  background-color: #28a745;
  color: white;
  transform: translateY(-1px) scale(1.01);
}
</style>
