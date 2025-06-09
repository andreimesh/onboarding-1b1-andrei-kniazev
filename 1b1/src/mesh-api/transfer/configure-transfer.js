import { secret, baseUrl } from "../secret"



/**
 * @typedef {Object} TransferConfiguration
 * @property {string} brokerType - The broker type of the transfer (e.g., "coinbase").
 * @property {string} authToken - The authentication token for the account.
 */



/**
 * Configures a transfer between two accounts and will return networks that can be used for the transfer.
 * @param {TransferConfiguration} from 
 * @param {TransferConfiguration} to 
 * @returns {Array<NetworkModel>}
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
  const eligibleForTransfer = responseJson.content.holdings.filter(h => h.eligibleForTransfer === true);
  const allNetworks = eligibleForTransfer.map(h => h.networks).flat(1);
  console.log("all networks", allNetworks);
  return allNetworks;
}


// //
// {
//     "content": {
//         "status": "succeeded",
//         "holdings": [
//             {
//                 "symbol": "USDC",
//                 "availableBalance": 11.363636,
//                 "availableBalanceInFiat": 11.36,
//                 "eligibleForTransfer": true,
//                 "networks": [
//                     {
//                         "name": "AvalancheC",
//                         "id": "bad16371-c22a-4bf4-a311-274d046cd760",
//                         "eligibleForTransfer": false,
//                         "ineligibilityReason": "noTargetNetworkFound",
//                         "eligibleForTransferWithFunding": false,
//                         "caipNetworkId": "eip155:43114",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/AvalancheC.svg"
//                     },
//                     {
//                         "name": "Base",
//                         "id": "aa883b03-120d-477c-a588-37c2afd3ca71",
//                         "eligibleForTransfer": false,
//                         "ineligibilityReason": "noTargetNetworkFound",
//                         "eligibleForTransferWithFunding": false,
//                         "caipNetworkId": "eip155:8453",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/Base.svg"
//                     },
//                     {
//                         "name": "Arbitrum",
//                         "id": "a34f2431-0ddd-4de4-bc22-4a8143287aeb",
//                         "eligibleForTransfer": false,
//                         "ineligibilityReason": "noTargetNetworkFound",
//                         "eligibleForTransferWithFunding": false,
//                         "caipNetworkId": "eip155:42161",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/Arbitrum.svg"
//                     },
//                     {
//                         "name": "Polygon",
//                         "id": "7436e9d0-ba42-4d2b-b4c0-8e4e606b2c12",
//                         "eligibleForTransfer": false,
//                         "ineligibilityReason": "noTargetNetworkFound",
//                         "eligibleForTransferWithFunding": false,
//                         "caipNetworkId": "eip155:137",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/Polygon.svg"
//                     },
//                     {
//                         "name": "Optimism",
//                         "id": "18fa36b0-88a8-43ca-83db-9a874e0a2288",
//                         "eligibleForTransfer": false,
//                         "ineligibilityReason": "noTargetNetworkFound",
//                         "eligibleForTransferWithFunding": false,
//                         "caipNetworkId": "eip155:10",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/Optimism.svg"
//                     },
//                     {
//                         "name": "Ethereum",
//                         "id": "e3c7fdd8-b1fc-4e51-85ae-bb276e075611",
//                         "minimumAmount": 1,
//                         "maximumAmount": 10.410588,
//                         "minimumAmountInFiat": 1.00,
//                         "maximumAmountInFiat": 10.4,
//                         "estimatedNetworkGasFee": {
//                             "fee": 0.953048,
//                             "feeCurrency": "USDC",
//                             "feeInFiat": 0.95
//                         },
//                         "eligibleForTransfer": true,
//                         "eligibleForTransferWithFunding": false,
//                         "minimumRequiredForTransferAmount": 1.953048,
//                         "caipNetworkId": "eip155:1",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/Ethereum.svg"
//                     },
//                     {
//                         "name": "Aptos",
//                         "id": "c6427cfd-8ddf-44f1-b400-bc4a5ee190a3",
//                         "eligibleForTransfer": false,
//                         "ineligibilityReason": "noTargetNetworkFound",
//                         "eligibleForTransferWithFunding": false,
//                         "caipNetworkId": "aptos:1",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/Aptos.svg"
//                     },
//                     {
//                         "name": "Solana",
//                         "id": "0291810a-5947-424d-9a59-e88bb33e999d",
//                         "eligibleForTransfer": false,
//                         "ineligibilityReason": "noTargetNetworkFound",
//                         "eligibleForTransferWithFunding": false,
//                         "caipNetworkId": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
//                         "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/networks/Solana.svg"
//                     }
//                 ],
//                 "eligibleForTransferWithFunding": false,
//                 "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/tokens/USDC.svg"
//             },
//             {
//                 "symbol": "BTC",
//                 "availableBalance": 0.00004197,
//                 "availableBalanceInFiat": 0,
//                 "eligibleForTransfer": false,
//                 "networks": [],
//                 "ineligibilityReason": "notSupportedForTransferByTarget",
//                 "eligibleForTransferWithFunding": false,
//                 "logoUrl": "https://frontuserfilecdn.azureedge.net/public/logos/tokens/BTC.svg"
//             }
//         ],
//         "fiatCurrency": "USD",
//         "supportedFiatCurrencies": [
//             "USD"
//         ],
//         "transferBalanceFundingAvailability": {
//             "status": "disabled"
//         }
//     },
//     "status": "ok",
//     "message": "",
//     "errorType": ""
// }
