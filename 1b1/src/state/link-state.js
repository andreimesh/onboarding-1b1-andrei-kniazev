import { ref, computed } from 'vue';

/**
 * Each link can be either:
 * - null (not connected)
 * - { brokerType: string, balance: number } (connected)
 */
const links = ref([]);

/**
 * Add a new link (connected).
 * @param {string} brokerType - The type of broker.
 * @param {number} balance - The account balance.
 */
function addLink(brokerType, balance) {
  links.value.push({
    brokerType,
    balance,
  });
}

/**
 * Remove a link by index.
 * @param {number} index - Index of the link to remove.
 */
function removeLink(index) {
  if (index >= 0 && index < links.value.length) {
    links.value.splice(index, 1);
  }
}

/**
 * Disconnect a link (set to null) by index.
 * @param {number} index - Index of the link to disconnect.
 */
function disconnectLink(index) {
  if (index >= 0 && index < links.value.length) {
    links.value[index] = null;
  }
}

const connectedLinks = computed(() => links.value.filter(link => link !== null));

export function useLinksState() {
  return {
    links,
    addLink,
    removeLink,
    disconnectLink,
  };
}
