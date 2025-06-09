import { configureTransfer } from "../mesh-api/transfer/configure-transfer";
import { previewTransfer } from "../mesh-api/preview-transfer";
import { LinkedEntity } from "./LinkedEntity";
import { NetworkModel } from '../models/NetworkModel';

export class TransferEntity {

  /**
   * @type {NetworkModel|null}
   */
  networkToTransfer = null;

  /**
   * @param {LinkedEntity} fromEntity
   * @param {LinkedEntity} toEntity
   */
  constructor(fromEntity, toEntity) {
    this.fromEntity = fromEntity;
    this.toEntity = toEntity;
  }

  /**
   * Configure the transfer via "Ethereum" network.
   * @returns {Promise<Object>} API response content
   */
  async configure() {
    await this.fromEntity.getRefreshedToken();
    await this.toEntity.getRefreshedToken();

    console.log("Configuring transfer from", this.fromEntity, "to", this.toEntity);
    const to = {
      brokerType: this.toEntity.brokerType,
      authToken: this.toEntity.authToken.accessToken,
    }
    const from = {
      brokerType: this.fromEntity.brokerType,
      authToken: this.fromEntity.authToken.accessToken,
    }

    const networks = await configureTransfer(from, to);
    const baseNetwork = networks.find(n => n.name === "Ethereum");
    console.log("Base network found:", baseNetwork);
    this.networkToTransfer = baseNetwork;
  }

  /**
   * Preview a transfer with the selected network, symbol, address, and amount.
   * @param {Object} params
   * @param {string} params.networkId
   * @param {string} params.symbol
   * @param {string} params.toAddress
   * @param {number} params.amount
   * @returns {Promise<Object>} API response content
   */
  async preview({ networkId, symbol, toAddress, amount }) {
    this.previewResult = await previewTransfer(
      {
        brokerType: this.fromType,
        authToken: this.fromAuthToken,
        clientId: this.clientId,
        keySecret: this.keySecret,
      },
      {
        brokerType: this.toType,
        authToken: this.toAuthToken,
        networkId,
        symbol,
        toAddress,
        amount,
      }
    );


    return this.previewResult;
  }
}
