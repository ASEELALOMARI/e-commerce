import React from "react";
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { FaCcVisa, FaCcPaypal } from "react-icons/fa";

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="CreditCard"
            control={<Radio />}
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <FaCcVisa size={20} /> Credit Card
              </Box>
            }
          />
          <FormControlLabel
            value="PayPal"
            control={<Radio />}
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <FaCcPaypal size={20} /> PayPal
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default PaymentMethodSelector;
