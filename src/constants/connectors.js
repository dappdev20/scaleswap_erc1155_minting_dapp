
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { BscConnector } from '@binance-chain/bsc-connector'

import Web3 from "web3";

const POLLING_INTERVAL = 12000
const MAIN_CHAIN_ID = 137

const rpcConfig = {
  RPC_URL_1: 'https://mainnet.infura.io/v3/4aaf5b5c3d5540f3a3b13459cf748ec8',
  RPC_URL_4: 'https://rinkeby.infura.io/v3/4aaf5b5c3d5540f3a3b13459cf748ec8',
  RPC_URL_137: 'https://speedy-nodes-nyc.moralis.io/dbf123fcbbd30b5c2d7c01bc/polygon/mainnet',
}

const RPC_URLS = {
  1: rpcConfig.RPC_URL_1,
  4: rpcConfig.RPC_URL_4,
  137: rpcConfig.RPC_URL_137
}

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: { 1: RPC_URLS[1], 4: RPC_URLS[4], 137: RPC_URLS[137] },
    bridge: 'https://bridge.walletconnect.org',
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

export const bscConnector = new BscConnector({ supportedChainIds: [97
  // ,97
  ] })

export const injected = new InjectedConnector({ supportedChainIds: [MAIN_CHAIN_ID
  // , 1, 4
] })

export const changeNetwork = async () => {
    const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(RPC_URLS[MAIN_CHAIN_ID]));
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(MAIN_CHAIN_ID) }],
        });
      } catch (error) {
        console.error(error);
      }
    }
}

// export const fortmatic = new FortmaticConnector({ apiKey: 'WGC23HCCZYJCIYTQ2VKRR7E84VMF9XQYW5', chainId: 137, pollingInterval: 15000 })

//Test Rinkeby, Kovan, Ropsten : pk_test_D58C7F46E173BEDB
//Production localhost : pk_live_724ABCF7B9489C5C