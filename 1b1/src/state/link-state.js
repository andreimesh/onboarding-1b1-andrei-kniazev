import { ref, computed } from 'vue';

/**
 * The state contains two links, identified by keys (e.g., 'linkA' and 'linkB').
 * Each link is either:
 * - null (not connected)
 * - { brokerType: string, balance: number } (connected)
 */
const links = ref({
  linkA: null,
  linkB: null,
});

/**
 * Connect a link by key.
 * @param {'linkA'|'linkB'} key - The key of the link to connect.
 * @param {string} brokerType - The type of broker.
 * @param {number} balance - The account balance.
 */
function connectLink(key, brokerType, balance) {
  console.warn(`Connecting link ${key} with brokerType: ${brokerType}, balance: ${balance}`);
  if (key in links.value) {
    links.value[key] = {
      brokerType,
      balance,
    };
  }
}

/**
 * Disconnect a link by key (set to null).
 * @param {'linkA'|'linkB'} key - The key of the link to disconnect.
 */
function disconnectLink(key) {
  if (key in links.value) {
    links.value[key] = null;
  }
}

/**
 * Whether a link is connected.
 * @param {'linkA'|'linkB'} key
 */
function isConnected(key) {
  return computed(() => links.value[key] !== null);
}

/**
 * Get all connected links as an object.
 */
const connectedLinks = computed(() => {
  return Object.fromEntries(
    Object.entries(links.value).filter(([_, link]) => link !== null)
  );
});

export function useLinksState() {
  return {
    links,
    connectLink,
    disconnectLink,
    isConnected,
    connectedLinks,
  };
}
