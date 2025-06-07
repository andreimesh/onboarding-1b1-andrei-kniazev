<script setup>
import LinkCard from './components/LinkCard.vue';
import TransferModalWidget from './components/TransferModalWidget.vue';
</script>

<template>
  <div class="top-menu">
    <TransferModalWidget />
  </div>
  <div class="grid">
    <LinkCard v-for="i in 2" :link-key="'linkA'" :index="i" />
    <!-- <LinkCard :link-key="'linkB'" /> -->
  </div>

</template>

<style scoped>
.top-menu {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  width: 100%;
  height: 100px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  padding: 24px;
}
</style>
