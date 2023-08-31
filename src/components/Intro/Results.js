import { Box, Paper, Typography, Link } from "@mui/material";
import { utils } from "ethers";

export default function Results(props) {
  return (
    <Paper sx={{ p: 2, marginY: 2 }}>
      {props.latestEstimationData ? (
        <Typography>
          <span role="img" aria-label="OK">
            👌
          </span>{" "}
          Estimated transaction cost:
          <br />
          <code>
            Test MATIC{" "}
            {utils.formatEther(
              props.latestEstimationData[0].estimatedBatches[0].cost
            )}
          </code>
        </Typography>
      ) : (
        <Typography>
          Your cost of the transaction will appear here once the transaction has
          been estimated.
        </Typography>
      )}

      {props.latestSendData ? (
        <Box marginTop={2}>
          <Typography variant="h6">
            <span role="img" aria-label="OK">
              🎉
            </span>{" "}
            <b>Your transaction was sent!</b>
          </Typography>
          <Typography variant="h6">
            <span role="img" aria-label="OK">
              👉
            </span>{" "}
            Your transaction will soon appear{" "}
            <Link
              target="_blank"
              href={`https://mumbai.polygonscan.com/address/${props.etherspotAddresses[0]?.address}#internaltx`}
            >
              here
            </Link>
            !
          </Typography>
        </Box>
      ) : null}
    </Paper>
  );
}
