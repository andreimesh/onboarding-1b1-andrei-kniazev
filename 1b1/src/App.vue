<script setup>
import { ref } from 'vue';
import LinkCard from './components/LinkCard.vue';
import TransferModalWidget from './components/TransferModalWidget.vue';
import { LinkedEntity, linkedEntities } from './entities/LinkedEntity';

reset();



function reset() {
  linkedEntities.values = [];
  for (let i = 0; i < 2; i++) {
    LinkedEntity.createLink(i);
  }
}

</script>

<template>
  <div>
    <button class="reset-btn" @click="reset">Reset</button>
  </div>
  <div class="top-menu">
    <TransferModalWidget :entities="linkedEntities" />
  </div>
  <div class="grid">
    <LinkCard v-for="entity in linkedEntities" :entity="entity" />
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

.reset-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  padding: 24px;
}
</style>
