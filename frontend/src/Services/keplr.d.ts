// keplr.d.ts
interface Window {
    keplr: {
      enable: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => OfflineSigner;
      getKey: (chainId: string) => Promise<{
        bech32Address: string;
        pubKey: Uint8Array;
        algo: string;
      }>;
      sendTx: (
        chainId: string,
        tx: Uint8Array,
        mode: BroadcastModeKeplr
      ) => Promise<Uint8Array>;
    };
  }
  