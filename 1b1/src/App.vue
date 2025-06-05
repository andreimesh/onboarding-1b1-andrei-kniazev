<script setup>
import CoinbaseConnect from './components/CoinbaseConnect.vue';
import LinkCard from './components/LinkCard.vue';
import TransferModalWidget from './components/TransferModalWidget.vue';
</script>

<template>

  <CoinbaseConnect />

  <div class="top-actions">
    <TransferModalWidget />
  </div>
  <div class="grid">
    <LinkCard :link-key="'linkA'" />
    <LinkCard :link-key="'linkB'" />
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
</style>
