import {
  MsgCreateSpotLimitOrder,
  MsgBroadcasterWithPk,
  getEthereumAddress,
  ChainRestSpotApi,
} from '@injectivelabs/sdk-ts';
import { spotPriceToChainPriceToFixed, spotQuantityToChainQuantityToFixed } from '@injectivelabs/utils';
import { Network } from '@injectivelabs/networks';

/**
 * Function to create and broadcast a spot limit order on the Injective blockchain.
 * Fetches market data dynamically.
 * @returns {Promise<string>} - The transaction hash of the broadcasted order.
 */
export const broadcastSpotLimitOrder = async (): Promise<string> => {
  const privateKey = '0xe3b16765f052e92447d40f835f28052172019fbcb04bb8904e6ec42e8f979d0c';
  const injectiveAddress = 'inj1cyz4n2pytr8l62w9pqhsn6jmc06s5hp2xsu72k';
  const feeRecipient = 'inj1cyz4n2pytr8l62w9pqhsn6jmc06s5hp2xsu72k';
  const marketId = '0x0611780ba69656949525013d947713300f56c37b6175e02f26bffa495c3208fe';

  // Initialize ChainRestSpotApi to fetch market data
  const spotApi = new ChainRestSpotApi(Network.Testnet);

  // Fetch market details dynamically
  const market = await spotApi.fetchMarket(marketId);

  // Extract necessary fields from the fetched market data
  const baseDecimals = market.baseToken.decimals;
  const quoteDecimals = market.quoteToken.decimals;
  const minPriceTickSize = market.minPriceTickSize;
  const minQuantityTickSize = market.minQuantityTickSize;
  const priceTensMultiplier = market.priceTensMultiplier;
  const quantityTensMultiplier = market.quantityTensMultiplier;

  const order = {
    price: 100, // Price in terms of quote asset (e.g., USDT)
    quantity: 1, // Quantity in terms of base asset (e.g., INJ)
  };

  const ethereumAddress = getEthereumAddress(injectiveAddress);
  const subaccountIndex = 1;
  const suffix = '0'.repeat(23) + subaccountIndex;
  const subaccountId = ethereumAddress + suffix;

  // Convert order price and quantity to chain format using fetched market data
  const chainPrice = spotPriceToChainPriceToFixed({
    value: order.price,
    tensMultiplier: Number(priceTensMultiplier),
    baseDecimals: baseDecimals,
    quoteDecimals: quoteDecimals,
  });

  const chainQuantity = spotQuantityToChainQuantityToFixed({
    value: order.quantity,
    tensMultiplier: Number(quantityTensMultiplier),
    baseDecimals: baseDecimals,
  });

  console.log(`Converted Price: ${chainPrice}, Converted Quantity: ${chainQuantity}`);

  const msg = MsgCreateSpotLimitOrder.fromJSON({
    subaccountId,
    injectiveAddress,
    orderType: 2, // Buy order type
    price: chainPrice,
    quantity: chainQuantity,
    marketId: marketId,
    feeRecipient: feeRecipient,
  });

  // Broadcast the transaction
  const txResponse = await new MsgBroadcasterWithPk({
    privateKey,
    network: Network.Testnet,
  }).broadcast({
    msgs: msg,
  });

  console.log(`Broadcasted transaction hash: ${txResponse.txHash}`);
  return txResponse.txHash;
};
