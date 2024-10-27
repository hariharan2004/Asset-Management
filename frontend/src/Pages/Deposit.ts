import {
  TxRaw,
  MsgSend,
  BaseAccount,
  TxRestClient,
  ChainRestAuthApi,
  createTransaction,
  CosmosTxV1Beta1Tx,
  BroadcastModeKeplr,
  ChainRestTendermintApi,
  getTxRawFromTxRawOrDirectSignResponse,
  MsgDeposit,
  MsgBroadcasterWithPk,
  getEthereumAddress,
} from "@injectivelabs/sdk-ts";
import { Network } from '@injectivelabs/networks'
import { getStdFee, DEFAULT_BLOCK_TIMEOUT_HEIGHT } from "@injectivelabs/utils";
import { BigNumberInBase } from "@injectivelabs/utils";
import { Buffer } from "buffer";
import { SignDoc } from '@injectivelabs/core-proto-ts/cjs/cosmos/tx/v1beta1/tx';
import { TransactionException } from "@injectivelabs/exceptions";

// Reuse the getKeplr function for account info
export const getKeplr = async (chainId: string) => {
  await window.keplr.enable(chainId);

  const offlineSigner = window.keplr.getOfflineSigner(chainId);
  const accounts = await offlineSigner.getAccounts();
  const key = await window.keplr.getKey(chainId);

  return { offlineSigner, accounts, key };
};

// Reuse the broadcastTx function for broadcasting signed transactions
export const broadcastTx = async (chainId: string, txRaw: TxRaw) => {
  const result = await window.keplr.sendTx(
    chainId,
    CosmosTxV1Beta1Tx.TxRaw.encode(txRaw).finish(),
    BroadcastModeKeplr.Sync
  );

  if (!result || result.length === 0) {
    throw new TransactionException(
      new Error("Transaction failed to be broadcasted"),
      { contextModule: "Keplr" }
    );
  }

  return Buffer.from(result).toString("hex");
};

// New function to handle MsgDeposit using hardcoded values
export const handleMsgDeposit = async (chainId: string) => {
  const privateKey = '0xe3b16765f052e92447d40f835f28052172019fbcb04bb8904e6ec42e8f979d0c';  // Hardcoded private key
  const injectiveAddress = 'inj1cyz4n2pytr8l62w9pqhsn6jmc06s5hp2xsu72k';  // Hardcoded Injective address

  // Convert the amount to a string in Wei format
  const amount = {
    denom: 'inj',  // Hardcoded denomination
    amount: new BigNumberInBase(1).toWei().toFixed(),  // Convert to string using .toFixed()
  };

  const ethereumAddress = getEthereumAddress(injectiveAddress);
  console.log("ETH add",ethereumAddress);
  const subaccountIndex = 1;
  const suffix = '0'.repeat(23) + subaccountIndex;
  const subaccountId = ethereumAddress + suffix;  // Hardcoded subaccount ID
  console.log("Subaccount ID:",subaccountId);
  const msg = MsgDeposit.fromJSON({
    amount,
    subaccountId,
    injectiveAddress,
  });

  // Use MsgBroadcasterWithPk to broadcast the transaction
  const txHash = await new MsgBroadcasterWithPk({
    privateKey,
    network: Network.Testnet,  // Hardcoded network to Testnet
  }).broadcast({
    msgs: msg,
  });

  console.log(txHash);
};

// Handle both transactions and deposits with Keplr integration
export const handleTxWithKeplr = async (
  receiverAddress: string,
  senderAddress: string,
  amountToTransact: string,
  chainId: string,
  restEndpoint: string
): Promise<any> => {
  const { key, offlineSigner } = await getKeplr(chainId);
  const pubKey = Buffer.from(key.pubKey).toString("base64");

  const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
  const accountDetailsResponse = await chainRestAuthApi.fetchAccount(senderAddress);
  const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);

  const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
  const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
  const latestHeight = latestBlock.header.height;
  const timeoutHeight = new BigNumberInBase(latestHeight).plus(DEFAULT_BLOCK_TIMEOUT_HEIGHT);

  const msg = MsgSend.fromJSON({
    amount: { amount: amountToTransact, denom: "inj" },
    srcInjectiveAddress: senderAddress,
    dstInjectiveAddress: receiverAddress,
  });

  const { signDoc } = createTransaction({
    pubKey,
    chainId,
    fee: getStdFee({}),
    message: msg,
    sequence: baseAccount.sequence,
    timeoutHeight: timeoutHeight.toNumber(),
    accountNumber: baseAccount.accountNumber,
  });

  const directSignResponse = await offlineSigner.signDirect(senderAddress, signDoc as SignDoc);
  const txRaw = getTxRawFromTxRawOrDirectSignResponse(directSignResponse);
  const txHash = await broadcastTx(chainId, txRaw);
  const response = await new TxRestClient(restEndpoint).fetchTxPoll(txHash);

  // After the transaction, call the deposit handler
  await handleMsgDeposit(chainId);

  return response;
};
