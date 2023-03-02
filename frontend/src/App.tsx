// import '@coreui/coreui/dist/css/coreui.min.css';
import './App.css';

import { Main } from './pages/main';

import { configureChains, createClient, goerli, mainnet, WagmiConfig } from 'wagmi';
import { fantom, fantomTestnet, localhost } from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
const { chains, provider, webSocketProvider } = configureChains(
  [fantom, fantomTestnet, mainnet, goerli, localhost],
  [publicProvider()]
);
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    /* new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }), */
  ],
  provider,
  webSocketProvider,
});

function App() {
  return (
    <>
      <WagmiConfig client={client}>
        <Main />
      </WagmiConfig>
    </>
  );
}

export default App;
