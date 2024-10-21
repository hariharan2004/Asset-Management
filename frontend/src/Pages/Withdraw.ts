import { getNetworkInfo, Network } from '@injectivelabs/networks';
import {
  TxClient,
  PrivateKey,
  TxGrpcClient,
  ChainRestAuthApi,
  createTransaction,
} from '@injectivelabs/sdk-ts';
import { MsgSend } from '@injectivelabs/sdk-ts';
import { Buffer } from "buffer";
import { BigNumberInBase, DEFAULT_STD_FEE } from '@injectivelabs/utils';

/**
 * Function to withdraw funds from Injective blockchain.
 * @param {string} privateKeyHash - The hex-encoded private key of the sender.
 * @param {string} srcInjectiveAddress - The source Injective address (sender).
 * @param {number} amountToWithdraw - The amount to withdraw in INJ.
 * @returns {Promise<string>} - The transaction hash of the withdrawal.
 */
export const withdrawFundsHandler = async (
  privateKeyHash: string,
  srcInjectiveAddress: string,
  dstInjectiveAddress: string,
  amountToWithdraw: number
): Promise<string> => {
  try {
    const network = getNetworkInfo(Network.Testnet);
    const privateKey = PrivateKey.fromHex(privateKeyHash);
    const senderAddress = srcInjectiveAddress;
    const receiverAddress=dstInjectiveAddress;
    const publicKey = privateKey.toPublicKey().toBase64();

    /** Fetch account details **/
    const accountDetails = await new ChainRestAuthApi(network.rest).fetchAccount(
      senderAddress
    );

    /** Prepare the withdrawal message */
    const amount = {
      amount: new BigNumberInBase(amountToWithdraw).toWei().toFixed(),
      denom: 'inj',
    };

    const msg = MsgSend.fromJSON({
      amount,
      srcInjectiveAddress: senderAddress,
      dstInjectiveAddress:receiverAddress, 
    });

    /** Prepare the transaction **/
    const { signBytes, txRaw } = createTransaction({
      message: msg,
      memo: '', // Add a custom memo if necessary
      fee: DEFAULT_STD_FEE,
      pubKey: publicKey,
      sequence: parseInt(accountDetails.account.base_account.sequence, 10),
      accountNumber: parseInt(
        accountDetails.account.base_account.account_number,
        10
      ),
      chainId: network.chainId,
    });

    /** Sign transaction */
    const signature = await privateKey.sign(Buffer.from(signBytes));

    /** Append signatures */
    txRaw.signatures = [signature];

    /** Calculate hash of the transaction */
    console.log(`Transaction Hash: ${TxClient.hash(txRaw)}`);

    const txService = new TxGrpcClient(network.grpc);

    /** Simulate transaction */
    const simulationResponse = await txService.simulate(txRaw);
    console.log(
      `Transaction simulation response: ${JSON.stringify(simulationResponse.gasInfo)}`
    );

    /** Broadcast transaction */
    const txResponse = await txService.broadcast(txRaw);

    if (txResponse.code !== 0) {
      throw new Error(`Transaction failed: ${txResponse.rawLog}`);
    }

    console.log(`Broadcasted transaction hash: ${txResponse.txHash}`);

    return txResponse.txHash; // Return the transaction hash
  } catch (error) {
    const err = error as Error; // Assert the type
    throw new Error(`Transaction failed: ${err.message}`);
  }
};
