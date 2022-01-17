import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { NETWORKS } from './networks';

export const RPC_URLS = Object.entries(NETWORKS).reduce((obj, [key, value]) => {
  obj[+key] = value.rpc[0];
  return obj;
}, {} as { [chainId: number]: string });

export const injectedConnector = new InjectedConnector({
  supportedChainIds: Object.keys(NETWORKS).map(k => +k),
});

export const networkConnector = new NetworkConnector({
  urls: RPC_URLS,
  defaultChainId: parseInt(Object.keys(NETWORKS)[1]),
});

export enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injectedConnector,
  [ConnectorNames.Network]: networkConnector,
};
