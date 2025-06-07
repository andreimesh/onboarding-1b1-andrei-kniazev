<script setup>
import { ref, computed, watch } from 'vue'
import { useLinksState } from '../state/link-state'
import { getSupportedNetworks } from '../mesh-api/get-supported-networks'
import { clearStoredPayloadForAll } from "../state/secret-store";
import { configureTransfer } from '@/mesh-api/configure-transfer';
import { getAuthToken, getBrokerType } from '../state/secret-store';

const showModal = ref(false)

const { isConnected, links } = useLinksState();

const isBothConnected = computed(() => {
  return isConnected("linkA") && isConnected("linkB");
});


const networks = ref([]);

// Not needed anymore, but keeping for reference
// getSupportedNetworks().then(fetchedNetworks => {
//   networks.value = fetchedNetworks.content.networks;
//   console.log(JSON.stringify(networks.value));
// });

/**
 * @param {'linkA'|'linkB'} fromKey 
 * @param {'linkA'|'linkB'} toKey
 */
async function transferMoney(fromKey, toKey) {
  const to = {
    brokerType: getBrokerType(toKey),
    authToken: getAuthToken(toKey),
  }
  const from = {
    brokerType: getBrokerType(fromKey),
    authToken: getAuthToken(fromKey),
  }

  await configureTransfer(from, to);
}

function resetAll() {
  clearStoredPayloadForAll();
}
</script>

<template>
  <div class="modal-actions">
    <button @click="showModal = true">Transfer Money</button>
    <button @click="resetAll()">Reset All</button>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <div v-if="!isBothConnected" class="error-message">
          <p>Error! Please connect both links to transfer money.</p>
          <button @click="showModal = false">Close</button>
        </div>
        <div v-else>
          <div class="content">
            <h2>Transfer Money</h2>
            <div>
              <button class="transfer-button" @click="transferMoney('linkA', 'linkB')">
                Transfer 5$: {{ links.linkA.brokerType }} to {{ links.linkB.brokerType }}</button>
            </div>
            <div>
              <button class="transfer-button" @click="transferMoney('linkB', 'linkA')">
                Transfer 5$: {{ links.linkB.brokerType }} to {{ links.linkA.brokerType }}</button>
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
