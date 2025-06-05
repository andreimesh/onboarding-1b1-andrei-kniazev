<script setup>
import { defineProps, ref, computed } from 'vue'
import { useLinksState } from '../state/link-state';
import { createLink } from '@meshconnect/web-link-sdk';
import { getLinkToken } from '../mesh-api/get-link-token';
import { getBalance } from '../mesh-api/get-balance';
import { secret } from '../mesh-api/secret';
import { storeOnIntegrationsPayload, getStoredPayload, tryGetStoredPayload } from '../state/secret-store';

const props = defineProps({
  linkKey: {
    type: String,
    required: true,
    validator: value => ['linkA', 'linkB'].includes(value)
  }
})


const balance = ref(0);
const brokerName = ref(props.linkKey);

const { isConnected, connectLink } = useLinksState();

checkConnectionStatusOnLoad();

const connectedStatusForThisLink = isConnected(props.linkKey);

async function connect() {
  try {
    const token = await getLinkToken();
    const meshLink =
      createLink({
        clientId: secret().clientId,
        onIntegrationConnected: (payload) => { connectThisLinkCard(payload) },
      })
    meshLink.openLink(token.content.linkToken)
  }
  catch (e) {
    console.error(e)
  }
}

async function connectThisLinkCard(payload) {
  storeOnIntegrationsPayload(payload, props.linkKey);
  connectLink(props.linkKey);
  await getBalanceForThisLinkCard();
}

async function getBalanceForThisLinkCard() {
  try {
    const balanceObject = await getBalance(props.linkKey);
    balance.value = balanceObject.balances[0].cash;

    const storedPayload = getStoredPayload(props.linkKey);
    // set broker name
    // const payload = tryGetStoredPayload(props.linkKey, payload.brokerNam);
    brokerName.value = storedPayload.brokerName;
  }
  catch (e) {
    console.error(e)
  }
}

async function checkConnectionStatusOnLoad() {
  const payload = tryGetStoredPayload(props.linkKey);
  if (payload) {
    connectLink(props.linkKey, payload.brokerName);
    await getBalanceForThisLinkCard();
  } else {
    console.log(`Link Card is not connected for ${props.linkKey}`);
  }
}


</script>

<template>
  <div class="card">
    <div v-if="connectedStatusForThisLink" class="connected">
      <div class="broker-balance-box">
        <div class="broker-name">{{ brokerName }}</div>
        <div class="balance-label">
          <span class="balance-value">${{ balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) }}</span>
          <span class="currency">USD</span>
        </div>
      </div>
      <div class="connected-content">
        <div class="status success">Connected!</div>
      </div>
    </div>
    <div v-else class="not-connected">
      <div class="broker-name">{{ brokerName }}</div>
      <div class="status failure">Not connected</div>
      <div>
        <button @click="connect">Connect</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  padding: 42px 24px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 380px;
  margin: 0 auto;
  transition: box-shadow 0.2s;
  color: #222;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.13);
}

.broker-balance-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
}

.broker-name {
  font-size: 1.2em;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #4078c0;
  margin-bottom: 10px;
  text-align: center;
}

.balance-label {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  font-size: 2.1em;
  font-weight: 700;
  color: #222;
  margin-bottom: 4px;
}

.balance-value {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}

.currency {
  font-size: 0.45em;
  font-weight: 600;
  color: #888;
  margin-left: 4px;
  padding-bottom: 4px;
}

.connected-content {
  text-align: center;
}

.status {
  font-size: 1em;
  margin-top: 8px;
  font-weight: 500;
  border-radius: 6px;
  padding: 2px 12px;
  display: inline-block;
  text-align: center;
}

.status.success {
  color: #217a50;
  background: #e6faed;
}

.status.failure {
  color: #a12a27;
  background: #fceaea;
}

.card button {
  margin-top: 18px;
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
