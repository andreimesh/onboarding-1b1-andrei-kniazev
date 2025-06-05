<script setup>
import {
  createLink
} from "@meshconnect/web-link-sdk";
import { getIntegrations } from "../mesh-api/get-integrations";
import { secret } from '../mesh-api/secret';
import { storeOnIntegrationsPayload } from '../state/secret-store';
import { getLinkToken } from "../mesh-api/get-link-token"
import { getBalance } from "../mesh-api/get-balance";

function connectSdk() {
  const meshLink =
    createLink({
      clientId: secret().clientId,
      onIntegrationConnected: (payload) => { },
      onExit: (error) => { },
      onTransferFinished: (transferData) => { },
      onEvent: (ev) => { },
      accessTokens: [],
      transferDestinationTokens: []
    })
  console.log(meshLink)

  meshLink.openLink()
}

async function connect() {
  try {
    const token = await getLinkToken();
    const meshLink =
      createLink({
        clientId: secret().clientId,
        onIntegrationConnected: (payload) => { storeOnIntegrationsPayload(payload,) },
        onExit: (error) => { },
        onTransferFinished: (transferData) => { },
        onEvent: (ev) => { },
        accessTokens: [],
        transferDestinationTokens: []
      })
    meshLink.openLink(token.content.linkToken)
  }
  catch (e) {
    console.error(e)
  }
}

async function integrations() {
  try {
    var integrations = await getIntegrations();
    console.log(integrations);
    var coinbase = integrations.find(i => i.name === "Coinbase");
    console.log(coinbase);
    var rainbowWallet = integrations.find(i => i.name === "Rainbow")
    console.log(rainbowWallet);

  }
  catch (e) {
    console.error(e)
  }
}
async function getBalanceForLink() {
  try {
    const balance = await getBalance();
    console.log(balance);
  }
  catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <button @click="integrations()">Get Integrations</button>
  <button @click="connect()">Connect To Coinbase</button>
  <button @click="connectSdk()">Connect SDK</button>
  <button @click="getBalanceForLink()">Get Balance for Link</button>
</template>

<style scoped></style>
