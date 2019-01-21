import React, { ChangeEvent, Component } from "react";
import styled from "styled-components";

import { currency, Currency } from "../constants";

interface Props {
  selectedCurrency: Currency;
  onChange: (newCurrency: Currency) => void;
}

const Wrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

class CurrencySelect extends Component<Props> {
  handleCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCurrency = e.target.value as Currency;

    this.props.onChange(newCurrency);
  };

  render() {
    const { selectedCurrency } = this.props;

    return (
      <Wrapper>
        {Object.keys(currency).map(symbol => (
          <label key={symbol}>
            <input
              type="radio"
              value={symbol}
              checked={symbol === selectedCurrency}
              onChange={this.handleCurrencyChange}
            />
            {symbol}
          </label>
        ))}
      </Wrapper>
    );
  }
}

export default CurrencySelect;
