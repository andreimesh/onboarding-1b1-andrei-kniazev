<script setup>
import { defineProps } from 'vue'
import { useLinksState } from '../state/link-state';
import { createLink } from '@meshconnect/web-link-sdk';
import { getLinkToken } from '../mesh-api/get-link-token';
import { secret, storeOnIntegrationsPayload, getStoredPayload, tryGetStoredPayload } from '../mesh-api/secret';

const props = defineProps({
  linkKey: {
    type: String,
    required: true,
    validator: value => ['linkA', 'linkB'].includes(value)
  }
})

const { isConnected, connectLink } = useLinksState();

checkConnectionStatusOnLoad();


const connectedStatusForThisLink = isConnected(props.linkKey);

async function connect() {
  try {
    const token = await getLinkToken();
    const meshLink =
      createLink({
        clientId: secret().clientId,
        onIntegrationConnected: (payload) => { connectThisLinkCard() },
      })
    meshLink.openLink(token.content.linkToken)
  }
  catch (e) {
    console.error(e)
  }
}

function connectThisLinkCard() {
  console.log('Link connected for', props.linkKey);
  storeOnIntegrationsPayload(payload, props.linkKey);
  connectLink(props.linkKey, meshLink);
}

function checkConnectionStatusOnLoad() {
  const payload = tryGetStoredPayload(props.linkKey);
  connectLink(props.linkKey, payload);
}
</script>

<template>
  <div class="card">
    <div v-if="connectedStatusForThisLink">
      Connected!
    </div>
    <div v-else>
      <h1>Not connected</h1>
      <button @click="connect">Connect</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 42px 24px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
  color: black;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.13);
}

.card h1 {
  font-size: 1.4em;
  color: #444;
  margin: 0 0 24px 0;
}

.card button {
  padding: 12px 36px;
  background: #4078c0;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 1em;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(64, 120, 192, 0.08);
  transition: background 0.2s;
}

.card button:hover {
  background: #305d8a;
}
</style>
