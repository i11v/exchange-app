import React, { Component } from "react";
import { connect } from "react-redux";

import { Currency } from "../constants";
import { RootState } from "../reducer";
import BaseCurrency from "../components/BaseCurrency";

interface OwnProps {
  className?: string;
  value: string;
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onValueChange: (value: string) => void;
}

interface StateProps {
  total: number;
}

class BaseCurrencyContainer extends Component<OwnProps & StateProps> {
  render() {
    return <BaseCurrency {...this.props} />;
  }
}

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => ({
  total: state.account[props.selectedCurrency],
});

export default connect(mapStateToProps)(BaseCurrencyContainer);
