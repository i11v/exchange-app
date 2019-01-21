import React, { Component } from "react";
import styled from "styled-components";

import { Currency, currency } from "../constants";
import BaseCurrency from "../containers/BaseCurrencyContainer";
import TargetCurrency from "../containers/TargetCurrencyContainer";

interface Props {
  className?: string;
  base: Currency;
  onBaseChange: (newBase: Currency) => any;
}

interface State {
  targetCurrency: Currency;
  baseCurrencyInputValue: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const BaseCurrencyWrapper = styled(BaseCurrency)`
  flex: 1 0 50%;
`;

const TargetCurrencyWrapper = styled(TargetCurrency)`
  flex: 1 0 50%;
`;

class Converter extends Component<Props, State> {
  readonly state: State = {
    targetCurrency: currency.EUR,
    baseCurrencyInputValue: "",
  };

  get baseCurrencyAmount() {
    const { baseCurrencyInputValue } = this.state;

    return parseFloat(baseCurrencyInputValue);
  }

  handleTargetChange = (targetCurrency: Currency) => {
    this.setState({ targetCurrency });
  };

  handleBaseCurrencyAmountChange = (value: string) => {
    this.setState({ baseCurrencyInputValue: value });
  };

  render() {
    const { className, base, onBaseChange } = this.props;
    const { targetCurrency, baseCurrencyInputValue } = this.state;

    return (
      <Wrapper className={className}>
        <BaseCurrencyWrapper
          selectedCurrency={base}
          value={baseCurrencyInputValue}
          onCurrencyChange={onBaseChange}
          onValueChange={this.handleBaseCurrencyAmountChange}
        />
        <TargetCurrencyWrapper
          selectedCurrency={targetCurrency}
          baseCurrency={base}
          baseCurrencyAmount={this.baseCurrencyAmount}
          onCurrencyChange={this.handleTargetChange}
        />
      </Wrapper>
    );
  }
}

export default Converter;
