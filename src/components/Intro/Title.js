import { Box, Typography } from "@mui/material";

export default function Title() {
  return (
    <Box marginBottom={2}>
      <Typography variant="h4">
        {" "}
        <span role="img" aria-label="OK">
          ✨
        </span>{" "}
        TransactionKit: Quick Start
      </Typography>
      <Typography variant="h6">
        Send a transaction on Polygon Testnet (aka Mumbai)
      </Typography>
    </Box>
  );
}
