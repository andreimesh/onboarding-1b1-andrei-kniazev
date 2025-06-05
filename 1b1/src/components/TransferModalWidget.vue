<script setup>
import { ref, computed } from 'vue'
import { useLinksState } from '../state/link-state'

const showModal = ref(false)

const { isConnected, links } = useLinksState();

const isBothConnected = computed(() => {
  return isConnected("linkA") && isConnected("linkB");
});
</script>

<template>
  <div class="modal-actions">
    <button @click="showModal = true">Transfer Money</button>
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <div v-if="!isBothConnected" class="error-message">
          <p>Error! Please connect both links to transfer money.</p>
          <button @click="showModal = false">Close</button>
        </div>
        <div v-else>
          <h2>Transfer Money</h2>
          <div class="content">
            <div>
              <button>Transfer from {{ links.linkA.brokerType }}</button>
            </div>
          </div>
          <button @click="showModal = false">Close</button>
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
  min-width: 300px;
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
  padding: 12px 34px;
  background: #4078c0;
  color: #fff;
  border: none;
  border-radius: 22px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(64, 120, 192, 0.08);
  transition: background 0.2s, transform 0.15s;
}

.modal-actions button:hover {
  background: #305d8a;
  transform: translateY(-2px) scale(1.04);
}

.error-message {
  color: #a12a27;
  font-weight: 500;
  text-align: center;
}

.error-message p {
  margin-bottom: 16px;
}
</style>
