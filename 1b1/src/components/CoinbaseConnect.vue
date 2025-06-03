<script setup>
import { getLink } from "../mesh-api/get-link"

async function connect() {
  try {
    await getLink();
  }
  catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <button @click="connect()">Connect</button>
</template>

<style scoped></style>
