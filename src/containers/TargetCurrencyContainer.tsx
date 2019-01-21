import React, { Component } from "react";
import { connect } from "react-redux";

import { Currency } from "../constants";
import { RootState } from "../reducer";
import TargetCurrency from "../components/TargetCurrency";

interface OwnProps {
  className?: string;
  baseCurrency: Currency;
  baseCurrencyAmount: number;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

interface StateProps {
  rate: number;
  total: number;
}

class TargetCurrencyContainer extends Component<OwnProps & StateProps> {
  render() {
    return <TargetCurrency {...this.props} />;
  }
}

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => ({
  rate: state.exchange.rates[props.selectedCurrency],
  total: state.account[props.selectedCurrency],
});

export default connect(mapStateToProps)(TargetCurrencyContainer);
