import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as ethers from "ethers";
import { EtherspotTransactionKit } from "@etherspot/transaction-kit";

import App from "./App";

const randomWallet = ethers.Wallet.createRandom();
const providerWallet = new ethers.Wallet(randomWallet.privateKey);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <EtherspotTransactionKit provider={providerWallet} chainId={80001}>
      <App />
    </EtherspotTransactionKit>
  </StrictMode>
);
