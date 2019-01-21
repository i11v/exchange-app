import React, { FunctionComponent } from "react";

import { Currency } from "../constants";
import NumberInput from "./NumberInput";
import CurrencySelect from "./CurrencySelect";
import { Total, Rate } from "./locale";
import {
  CurrencyWrapper,
  FieldWrapper,
  InfoWrapper,
  TextXL,
  TextSM,
} from "./styled";

interface Props {
  className?: string;
  rate: number;
  total: number;
  baseCurrency: Currency;
  baseCurrencyAmount: number;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const TargetCurrency: FunctionComponent<Props> = ({
  className = "",
  rate,
  total,
  baseCurrency,
  baseCurrencyAmount,
  selectedCurrency,
  onCurrencyChange,
}) => {
  const renderValue = baseCurrencyAmount
    ? (rate * baseCurrencyAmount).toFixed(2)
    : "";

  return (
    <CurrencyWrapper className={className}>
      <FieldWrapper>
        <TextXL>{selectedCurrency}</TextXL>
        <NumberInput readOnly value={renderValue} sign="+" />
      </FieldWrapper>
      <InfoWrapper>
        <TextSM>
          <Total currency={selectedCurrency} value={total} />
        </TextSM>
        <TextSM>
          <Rate
            baseCurrency={baseCurrency}
            targetCurrency={selectedCurrency}
            value={1 / rate}
          />
        </TextSM>
      </InfoWrapper>
      <CurrencySelect
        selectedCurrency={selectedCurrency}
        onChange={onCurrencyChange}
      />
    </CurrencyWrapper>
  );
};

export default TargetCurrency;
