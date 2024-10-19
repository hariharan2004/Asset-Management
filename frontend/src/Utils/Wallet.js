export const connectKeplr = async (chainId) => {
  try {
    if (!(window.keplr && window.getOfflineSigner)) {
      alert("Please install Keplr Wallet");
      return null;
    }

    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();
    return accounts[0].address; // Return the first account's address
  } catch (error) {
    console.error("Failed to connect to Keplr:", error);
    return null;
  }
};

export const connectLeap = async (chainId) => {
  try {
    if (!window.leap) {
      alert("Please install Leap Wallet");
      return null;
    }

    const key = await window.leap.getKey(chainId); // Get wallet accounts  
    return key.bech32Address; // Return the first account's address
  } catch (error) {
    console.error("Failed to connect to Leap Wallet:", error);
    return null;
  }
};
