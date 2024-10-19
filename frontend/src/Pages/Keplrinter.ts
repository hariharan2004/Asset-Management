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
  } from "@injectivelabs/sdk-ts";
  import { getStdFee, DEFAULT_BLOCK_TIMEOUT_HEIGHT } from "@injectivelabs/utils";
  import { BigNumberInBase } from "@injectivelabs/utils";
  import { Buffer } from "buffer";
  import { SignDoc } from '@injectivelabs/core-proto-ts/cjs/cosmos/tx/v1beta1/tx';
  import { TransactionException } from "@injectivelabs/exceptions";
  
  
export const getKeplr = async (chainId: string) => {
    await window.keplr.enable(chainId);
  
    const offlineSigner = window.keplr.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    const key = await window.keplr.getKey(chainId);
  
    return { offlineSigner, accounts, key };
  };
  
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
  
  export const handleTxWithKeplr = async (
    receiverAddress: string,  // Assuming this is a string representing the address
    senderAddress: string,    // Assuming this is a string representing the address
    amountToTransact: string, // Assuming the amount is a string (as you convert to string)
    chainId: string,          // Chain ID should also be a string
    restEndpoint: string      // The REST endpoint is also a string
  ): Promise<any> => {        // Returning a promise, adjust 'any' to the expected return type
    const { key, offlineSigner } = await getKeplr(chainId);
    const pubKey = Buffer.from(key.pubKey).toString("base64");
  
    const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
    const accountDetailsResponse = await chainRestAuthApi.fetchAccount(senderAddress);
    const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);
    console.log(senderAddress);  // This should output the actual address as a string.

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
  
    return response;
  };
  