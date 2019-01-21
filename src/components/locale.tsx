import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { Currency } from "../constants";

interface MoneyProps {
  currency: Currency;
  value: number;
}

export const Money = ({ currency, value }: MoneyProps) => (
  <FormattedNumber
    style="currency"
    currency={currency}
    maximumFractionDigits={2}
    value={value}
  />
);

interface TotalProps {
  currency: Currency;
  value: number;
}

export const Total = ({ currency, value }: TotalProps) => (
  <FormattedMessage
    id="total"
    values={{ value: <Money currency={currency} value={value} /> }}
  />
);

interface RateProps {
  baseCurrency: Currency;
  targetCurrency: Currency;
  value: number;
}

export const Rate = ({ baseCurrency, targetCurrency, value }: RateProps) => (
  <FormattedMessage
    id="exchangeRate"
    values={{
      target: <Money currency={targetCurrency} value={1} />,
      base: <Money currency={baseCurrency} value={value} />,
    }}
  />
);
