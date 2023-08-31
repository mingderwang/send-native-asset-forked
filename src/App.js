import React, { useEffect, useState } from "react";
import {
  EtherspotBatch,
  EtherspotBatches,
  EtherspotTransaction,
  useEtherspotTransactions,
  useEtherspotAddresses
} from "@etherspot/transaction-kit";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  TextField,
  Paper,
  Typography
} from "@mui/material";

import Intro from "./components/Intro/Intro";
import Title from "./components/Intro/Title";
import Results from "./components/Intro/Results";

export default function App() {
  /**
   * Import our EtherspotUI hooks.
   */
  const { estimate, send } = useEtherspotTransactions();
  const etherspotAddresses = useEtherspotAddresses();

  /**
   * Set our states that we will use later
   */
  const [address, setAddress] = useState(
    "0x271Ae6E03257264F0F7cb03506b12A027Ec53B31"
  );
  const [amount, setAmount] = useState("0.00001");
  const [latestEstimationData, setLatestEstimationData] = useState(false);
  const [latestSendData, setLatestSendData] = useState(false);

  /**
   * This runs an estimation for our transaction. We must
   * ALWAYS estimate before sending. If we change anything about
   * the transaction, we need to estimate again. This performs
   * essentiial cost calculations and validations before it
   * can be sent.
   */
  const runEstimation = async () => {
    // Reset the latest send data
    setLatestSendData(false);

    // Perform the estimation
    const estimationData = await estimate();
    console.log("Estimation Data:", estimationData);

    /**
     * Sometimes the estimation fails. If the estimation fails,
     * it usually means the transaction could not be validated and
     * something, usually the transaction values, were invalid.
     */
    if (JSON.stringify(estimationData).includes("reverted")) {
      alert(
        "Sorry, an estimation error occured. This may happen if:\n\n- The address or amount entered were invalid\n- Your Etherspot Smart Wallet account has no funds\n\nPlease check these points and try again."
      );

      return;
    }

    /**
     * Otherwise, we have a successful estimation! Lets set it
     * so we can display / yse it later.
     */
    setLatestEstimationData(estimationData);
  };

  /**
   * The send method will now submit this transaction to
   * Etherspot. Etherspot will queue, submit and monitor your
   * transaction to ensure that it eventually reaches the
   * blockchain.
   */
  const runSend = async () => {
    // We must always estimate first.
    if (!latestEstimationData) {
      alert(
        "You must always estimate successfully before sending. This ensures that the transaction cost is up to date and validated.\n\nPlease try to estimate and send again."
      );

      return;
    }

    // Lets send this transaction!
    const sendResult = await send();
    console.log("Send Data:", sendResult);

    /**
     * Sometimes the sending fails. If the sending fails, it
     * is usually due to bad network conditions or the estimation
     * is now outdated. In this scenario, try to estimate and
     * send again.
     */
    if (JSON.stringify(sendResult).includes("reverted")) {
      alert(
        "There was a problem trying to send your transaction. This can happen for a variety of reasons, but the most common problems are bad blockchain conditions or an out of date estimate.\n\nPlease try to estimate, then send again."
      );

      return;
    }

    /**
     * Otherwise, we have a successful send! Lets set it
     * so we can display it later.
     */
    setLatestSendData(sendResult);
  };

  /**
   * Run this on every render.
   */
  useEffect(() => {
    console.log("Etherspot Addresses:");
  }, [etherspotAddresses]);

  return (
    <Container>
      <Title />
      <Intro etherspotAddresses={etherspotAddresses} />

      <Paper sx={{ p: 2, marginTop: 4 }}>
        {/*
        We start start by inserting the <EtherspotBatches /> tag.
        This will contain 1 or more <EtherspotBatch /> tags.
        */}
        <EtherspotBatches>
          {/*
          Inside the <EtherspotBatches /> tag, we can insert 1 or
          more <Etherspotbatch /> tags. In our instance, we have
          added the chainId property and set it to 80001 which
          indicates that this batch of transactions will be executed
          on Polygon Testnet (aka Mumbai).

          You can view other networks here:
          https://chainlist.org/?testnets=true

          And you can view the networks that Etherspot supports here:
          https://docs.etherspot.dev/master/chains-bridges-and-dexes
          */}
          <EtherspotBatch chainId={80001}>
            {/*
            Inside the <EtherspotBatch /> tag, we can specify 1 or
            more <EtherspotTransaction /> tags. All the transaction tags
            contained within this <EtherspotBatch /> tag will be executed
            together and on Polygon Testnet (chainId: 80001).
            */}
            <EtherspotTransaction to={address} value={amount}>
              {/*
              The <EtherspotTransaction /> tag takes, at a minimum, a "to"
              property, which is the destination of this transaction
              and a "value" tag which is the amount of native token to send
              to the aforementioned "to" value. In our case. the native token
              is Test MATIC as we are operating on Polygon Testnet.
              */}
              <Typography gutterBottom>
                This is the destination blockchain address. Always remember that
                the blockchain address you are sending to must ALWAYS be on the
                SAME blockchain. In our case, <b>Polygon Testnet</b>, also known
                as <b>Mumbai</b>.
              </Typography>

              <Box paddingY={2}>
                <TextField
                  value={address}
                  fullWidth
                  label="Destination Address on Polygon Testnet (aka Mumbai)"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Box>

              <Typography gutterBottom marginBottom={2}>
                Below is the amount of Test MATIC we are going to send to the
                above address. Keep the amount small so you can run this example
                several times, or you'll need to head back to the Polygon Faucet
                to get more Test MATIC.
              </Typography>
              <TextField
                value={amount}
                fullWidth
                label="Test MATIC Amount"
                variant="outlined"
                onChange={(e) => setAmount(e.target.value)}
              />
            </EtherspotTransaction>
          </EtherspotBatch>
        </EtherspotBatches>
      </Paper>

      <Results
        etherspotAddresses={etherspotAddresses}
        latestEstimationData={latestEstimationData}
        latestSendData={latestSendData}
      />

      <Paper sx={{ p: 2 }}>
        <ButtonGroup variant="outlined">
          <Button onClick={runEstimation} color="primary">
            Estimate
          </Button>
          <Button onClick={runSend} color="success">
            Send
          </Button>
        </ButtonGroup>
      </Paper>
    </Container>
  );
}
