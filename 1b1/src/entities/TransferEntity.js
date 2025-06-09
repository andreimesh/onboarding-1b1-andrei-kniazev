import { configureTransfer } from "../mesh-api/transfer/configure-transfer";
import { postPreview } from "../mesh-api/transfer/post-preview";
import { LinkedEntity } from "./LinkedEntity";
import { NetworkModel } from '../models/NetworkModel';

export class TransferEntity {

  /**
   * @type {NetworkModel|null}
   */
  networkToTransfer = null;

  symbol = "USDC"

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

  async preview() {
    this.previewResult = await postPreview(
      {
        fromAuthToken: this.fromEntity.authToken.accessToken,
        fromType: this.fromEntity.brokerType,
        toAuthToken: this.toEntity.authToken.accessToken,
        toType: this.toEntity.brokerType,
        networkId: this.networkToTransfer.id,
        symbol: this.symbol,
        toAddress: "",
        amount: "5"
      }
    )

    return this.previewResult;
  }
}
