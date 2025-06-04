<script setup>
import CoinbaseConnect from './components/CoinbaseConnect.vue';
import LinkCard from './components/LinkCard.vue';
import { useLinksState } from './state/link-state';
</script>

<template>

  <CoinbaseConnect />
  <div class="top-actions">
    <button>Transfer</button>
    <button>Create Link</button>
  </div>
  <div class="grid">
    <LinkCard />
    <LinkCard />
  </div>

</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background: #f7f7f7;
  font-family: Arial, sans-serif;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  max-width: 900px;
  margin: 50px auto;
  padding: 24px;
}

.top-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 42px;
  margin-bottom: 24px;
}

.top-actions button {
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

.top-actions button:hover {
  background: #305d8a;
  transform: translateY(-2px) scale(1.04);
}
</style>
