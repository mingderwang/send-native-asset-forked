import { Paper, Alert, Typography, Link } from "@mui/material";
import { filterAddressByChainId } from "../../utils/common";

export default function Intro(props) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography marginBottom={2}>
        The following example shows us how to use TransactionKit. We're going to
        specify a destination address and an amount of Test MATIC to send - then
        estimate and send the amount to the destination address.
      </Typography>

      <Alert severity="info">
        Now is a good time to top up your Etherspot Smart Wallet with some test
        funds! Use the link to the Faucet below to top up your Etherspot Smart
        Wallet address.
      </Alert>

      <Typography marginTop={2}>
        <ul>
          <li>
            <span role="img" aria-label="OK">
              👉
            </span>{" "}
            Your Etherspot Smart Wallet address:{" "}
            <code>
              {filterAddressByChainId(props.etherspotAddresses, 80001)}
            </code>
          </li>
          <li>
            <span role="img" aria-label="OK">
              👉
            </span>{" "}
            Official Polygon Testnet (aka Mumbai){" "}
            <Link target="_blank" href={`https://faucet.polygon.technology/`}>
              Faucet
            </Link>
          </li>
          <li>
            <span role="img" aria-label="OK">
              👉
            </span>{" "}
            View your Etherspot Smart Wallet address on the{" "}
            <Link
              target="_blank"
              href={`https://mumbai.polygonscan.com/address/${props?.etherspotAddresses[0]?.address}#internaltx`}
            >
              Polygon Testnet explorer
            </Link>
            . Use this link to view activity for the Etherspot Smart Wallet
            address
          </li>
          <li>
            <span role="img" aria-label="OK">
              👉
            </span>{" "}
            View TransactionKit on{" "}
            <Link
              target="_blank"
              href={`https://www.npmjs.com/package/@etherspot/transaction-kit`}
            >
              NPM
            </Link>{" "}
            or{" "}
            <Link
              target="_blank"
              href={`https://github.com/etherspot/transaction-kit`}
            >
              Github
            </Link>
          </li>
          <li>
            <span role="img" aria-label="OK">
              👉
            </span>{" "}
            Need help? Head on over to our{" "}
            <Link target="_blank" href={`https://discord.etherspot.io`}>
              Discord
            </Link>
          </li>
        </ul>
      </Typography>
    </Paper>
  );
}
