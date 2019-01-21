import React, { Component, createRef } from "react";

import { Currency } from "../constants";
import NumberInput from "./NumberInput";
import CurrencySelect from "./CurrencySelect";
import { Total } from "./locale";
import { CurrencyWrapper, FieldWrapper, InfoWrapper, TextXL } from "./styled";

interface Props {
  className?: string;
  total: number;
  value: string;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onValueChange: (value: string) => void;
}

class BaseCurrency extends Component<Props> {
  static defaultProps = {
    className: "",
  };

  private inputRef = createRef<NumberInput>();

  componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render() {
    const {
      className,
      selectedCurrency,
      total,
      value,
      onValueChange,
      onCurrencyChange,
    } = this.props;

    return (
      <CurrencyWrapper className={className}>
        <FieldWrapper>
          <TextXL>{selectedCurrency}</TextXL>
          <NumberInput
            ref={this.inputRef}
            value={value}
            sign="-"
            onChange={onValueChange}
          />
        </FieldWrapper>
        <InfoWrapper>
          <Total currency={selectedCurrency} value={total} />
        </InfoWrapper>
        <CurrencySelect
          selectedCurrency={selectedCurrency}
          onChange={onCurrencyChange}
        />
      </CurrencyWrapper>
    );
  }
}

export default BaseCurrency;
