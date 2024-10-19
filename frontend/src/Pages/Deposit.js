import {
    BaseAccount,
    TxRestClient,
    ChainRestAuthApi,
    createTransaction,
    ChainRestTendermintApi,
    getTxRawFromTxRawOrDirectSignResponse,
    MsgSend,
} from "@injectivelabs/sdk-ts";
import { getStdFee, DEFAULT_BLOCK_TIMEOUT_HEIGHT } from "@injectivelabs/utils";
import { BigNumberInBase } from "@injectivelabs/utils";
import { Buffer } from 'buffer';

export async function handleTxWithKeplr(
    receiverAddress,
    senderAddress,
    amountToTransact,
    chainId,
    restEndpoint
) {
    console.log("Handling transaction with Keplr wallet...");
    let offlineSigner; // Declare offlineSigner here

    try {
        // Function to get Keplr wallet details
        const getKeplr = async () => {
            await window.keplr.enable(chainId);
            offlineSigner = window.keplr.getOfflineSigner(chainId); // Initialize offlineSigner
            const accounts = await offlineSigner.getAccounts();
            const key = await window.keplr.getKey(chainId);
            return { accounts, key };
        };

        // Function to broadcast the transaction
        const broadcastTx = async (txRaw) => {
            const txRestClient = new TxRestClient(restEndpoint);
            try {
                const txHash = await txRestClient.broadcast(txRaw);
                if (!txHash) {
                    throw new Error("Transaction failed to be broadcasted");
                }
                return txHash;
            } catch (error) {
                console.error("Error broadcasting transaction:", error);
                throw error; // Rethrow to be handled in the main function
            }
        };

        // Main function to handle the transaction
        const handleTransactionKeplrwithINJ = async () => {
            const { accounts, key } = await getKeplr();
            const userAddress = accounts[0].address;

            if (!key.pubKey) {
                throw new Error("Public key not found for the connected account.");
            }

            // Fetch account details
            const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
            const accountDetailsResponse = await chainRestAuthApi.fetchAccount(userAddress);
            const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);
            const accountDetails = baseAccount.toAccountDetails();

            // Fetch latest block height
            const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
            const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
            const latestHeight = latestBlock.header.height;
            const timeoutHeight = new BigNumberInBase(latestHeight).plus(DEFAULT_BLOCK_TIMEOUT_HEIGHT);

            const amountToSend = {
                amount: new BigNumberInBase(amountToTransact).toString(),
                denom: "inj",
            };

            // Prepare the message
            const msg = MsgSend.fromJSON({
                amount: [{ amount: amountToSend.amount, denom: amountToSend.denom }],
                srcInjectiveAddress: senderAddress,
                dstInjectiveAddress: receiverAddress,
            });

            // Create transaction
            const pubKey = Buffer.from(key.pubKey).toString("base64");
            const { txRaw, signDoc } = createTransaction({
                pubKey,
                chainId,
                fee: getStdFee({
                    amount: [{ denom: "inj", amount: "500000" }], // Example fee
                    gas: "2000000", // Example gas limit
                }),
                message: [msg],
                sequence: accountDetails.sequence,
                timeoutHeight: timeoutHeight.toNumber(),
                accountNumber: accountDetails.accountNumber,
            });

            console.log("txRaw:", txRaw);
            console.log("signDoc:", signDoc);
            console.log("Amount to send:", amountToSend);
            console.log("Source Address:", senderAddress);
            console.log("Destination Address:", receiverAddress);

            // Sign the transaction
            // Log more details about the signDirect response
            const directSignResponse = await offlineSigner.signDirect(userAddress, signDoc);
            console.log("Direct Sign Response:", directSignResponse);
            console.log("Direct Sign Response:", directSignResponse);
if (!directSignResponse || !directSignResponse.signature) {
    throw new Error("Failed to sign the transaction, check Keplr wallet setup.");
}

            const signedTxRaw = getTxRawFromTxRawOrDirectSignResponse(directSignResponse);
            if (!signedTxRaw || !signedTxRaw.bodyBytes || !signedTxRaw.authInfoBytes) {
                throw new Error("Signed transaction is empty or improperly formed");
            }

            // Check for the structure of signedTxRaw
            console.log("Signed Transaction Raw Structure:", signedTxRaw);


            // Broadcast the signed transaction
            const txHash = await broadcastTx(signedTxRaw);
            console.log(`Transaction Hash: ${txHash}`);
            return txHash;
        };

        // Execute the transaction handler
        await handleTransactionKeplrwithINJ();
    } catch (error) {
        console.error("Error handling transaction with Keplr:", error);
        throw error;
    }
}
