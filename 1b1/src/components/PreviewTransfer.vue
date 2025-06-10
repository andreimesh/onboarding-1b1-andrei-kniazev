<script setup>
import { defineProps } from 'vue'
import { PreviewTransferResult } from '../models/PreviewTransferResult';

// This expects a prop or state with the previewResult object
// For demo, you can replace this with a prop or inject from parent
const props = defineProps({
  preview: {
    type: PreviewTransferResult,
    required: false,
    default: null
  }
})
</script>

<template>
  <div v-if="preview" class="preview-transfer">
    <h3>Transfer Preview</h3>
    <div class="preview-row">
      <span>Network:</span>
      <span>{{ preview.networkName }}</span>
    </div>
    <div class="preview-row">
      <span>Asset:</span>
      <span>{{ preview.symbol }}</span>
    </div>
    <div class="preview-row">
      <span>Amount:</span>
      <span>{{ preview.amount }} {{ preview.symbol }}</span>
    </div>
    <div class="preview-row">
      <span>Estimated Network Fee:</span>
      <span>{{ preview.estimatedNetworkGasFee.fee }} {{ preview.estimatedNetworkGasFee.feeCurrency }}</span>
    </div>
    <div class="preview-row">
      <span>Total Estimated Amount:</span>
      <span>{{ preview.totalEstimatedAmount }} {{ preview.symbol }}</span>
    </div>
    <div class="preview-row">
      <span>To Address:</span>
      <span>{{ preview.toAddress }}</span>
    </div>
    <div class="preview-row" v-if="preview.refundAddress">
      <span>Refund Address:</span>
      <span>{{ preview.refundAddress }}</span>
    </div>
    <div class="preview-row">
      <span>Amount To Receive:</span>
      <span>{{ preview.amountToReceive }} {{ preview.symbol }}</span>
    </div>
    <div class="preview-row">
      <span>Fiat Value:</span>
      <span>{{ preview.amountInFiat }} {{ preview.fiatCurrency }}</span>
    </div>
  </div>
  <div v-else>
    <p>No preview available.</p>
  </div>
</template>



<style scoped>
.preview-transfer {
  background: #f8f8fa;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.preview-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.preview-row span:first-child {
  color: #888;
}
</style>
