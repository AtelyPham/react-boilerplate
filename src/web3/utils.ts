import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector';
import { NETWORKS } from './networks';

const getNetworkParam = (chainId: number) => {
  let blockExplorerUrls = [] as string[];
  if (NETWORKS[chainId].explorers) {
    blockExplorerUrls = NETWORKS[chainId].explorers?.map(
      e => e.url,
    ) as string[];
  }

  return {
    chainId: `0x${Number(chainId).toString(16)}`,
    chainName: NETWORKS[chainId].name,
    nativeCurrency: NETWORKS[chainId].nativeCurrency,
    rpcUrls: NETWORKS[chainId].rpc,
    blockExplorerUrls,
    iconUrls: NETWORKS[chainId].icon,
  };
};

type paramsType = {
  chainId: number;
  setError: (error: Error) => void;
};
export const changeNetwork = async ({ chainId, setError }: paramsType) => {
  try {
    if (!window.ethereum) throw new Error('No crypto wallet found');
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
    });
  } catch (switchError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((switchError as any).code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [getNetworkParam(chainId)],
        });
      } catch (addError) {
        setError(addError as Error);
      }
    }
  }
};

export function getErrorMessage(error: Error): string {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestError) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}
