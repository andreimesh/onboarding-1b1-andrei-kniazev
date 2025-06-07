import { secret, baseUrl } from "./secret"



/**
 * @typedef {Object} TransferConfiguration
 * @property {string} brokerType - The broker type of the transfer (e.g., "coinbase").
 * @property {string} authToken - The authentication token for the account.
 */



/**
 * Configures a transfer between two accounts and will return networks that can be used for the transfer.
 * @param {TransferConfiguration} from 
 * @param {TransferConfiguration} to 
 */
export async function configureTransfer(from, to) {
  const options = {
    method: 'POST',
    headers: {
      'X-Client-Secret': secret().keySecret,
      'X-Client-Id': secret().clientId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isInclusiveFeeEnabled: false,
      fromAuthToken: from.authToken,
      fromType: from.brokerType,
      toAuthToken: to.authToken,
      toType: to.brokerType
    })
  };

  console.warn("Configuring transfer with options:", options);

  const response = await fetch(`${baseUrl()}/api/v1/transfers/managed/configure`, options);
  const responseJson = await response.json();
  console.warn(responseJson);
  const eligibleForTransfer = responseJson.content.holdings.filter(h => h.eligibleForTransfer === true);
  const allNetworks = eligibleForTransfer.map(h => h.networks).flat(1);
  // const usdNetworks = eligibleForTransfer.filter(h => h.networkId === "USD");
  console.warn("All networks:", allNetworks);
  // console.warn("Eligible for transfer:", eligibleForTransfer);

}
