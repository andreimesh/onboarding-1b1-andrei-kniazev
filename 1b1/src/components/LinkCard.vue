<script setup>
import { defineProps, ref, computed } from 'vue'
import { LinkedEntity } from '../entities/LinkedEntity';


const props = defineProps({
  entity: {
    type: LinkedEntity,
    required: true,
  }
})

async function connect() {
  await props.entity.connect();
}

async function updateBalance() {
  await props.entity.updateBalance();
}

async function updateHoldings() {
  await props.entity.updateHoldings();
}

const displayName = computed(() => { return props.entity.brokerName });
const isConnected = computed(() => { return props.entity.isConnected });
const cash = computed(() => { return props.entity.balance.cash });
const currency = computed(() => { return props.entity.balance.currency });
const positions = computed(() => { return props.entity.cryptocurrencyPositions });


</script>

<template>
  <div class="card" v-if="props.entity">
    <div v-if="isConnected" class="connected">
      <div class="broker-balance-box">
        <div class="broker-name">{{ displayName }}</div>
        <div class="balance-label">
          <span class="balance-value">${{ cash.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) }}</span>
          <span class="currency">{{ currency }}</span>
        </div>
        <div class="cryptocurrency-holdings">
          <div class="holdings-list">
            <div v-for="position in positions" :key="position.symbol" class="holding-card">
              <div class="holding-info">
                <span class="token-name">{{ position.name }}</span>
                <span class="token-symbol">({{ position.symbol }})</span>
              </div>
              <div class="token-amount">{{ position.amount }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="connected-content">
        <div class="status success">Connected!</div>
      </div>
      <div class="connected-content">
        <button @click="updateBalance">Update Balance</button>
      </div>
      <div class="connected-content">
        <button @click="updateHoldings">Update Holdings</button>
      </div>
    </div>
    <div v-else class="not-connected">
      <div class="broker-name">{{ displayName }}</div>
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

.holdings-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 8px;
}

.holding-card {
  background: #f7fafd;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(64, 120, 192, 0.07);
  padding: 12px 18px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.holding-info {
  font-size: 1em;
  font-weight: 500;
  color: #305d8a;
  margin-bottom: 4px;
}

.token-name {
  margin-right: 4px;
}

.token-symbol {
  color: #888;
  font-size: 0.95em;
}

.token-amount {
  font-size: 1.1em;
  font-weight: 700;
  color: #222;
}

.token-icon {
  width: 28px;
  height: 28px;
  margin-bottom: 6px;
}
</style>
