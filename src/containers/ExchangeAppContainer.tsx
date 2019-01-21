import React, { Component } from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Currency } from "../constants";
import { RootState, fetchRates, fetchRatesCancel } from "../reducer";
import Converter from "../components/Converter";

type OwnProps = {
  className?: string;
};

type StateProps = {
  base: Currency;
};

type DispatchProps = {
  fetchRates: typeof fetchRates;
  fetchRatesCancel: typeof fetchRatesCancel;
};

class ExchangeApp extends Component<OwnProps & StateProps & DispatchProps> {
  static defaultProps = {
    className: "",
  };

  componentDidMount() {
    this.props.fetchRates(this.props.base);
  }

  componentWillUnmount() {
    this.props.fetchRatesCancel();
  }

  render() {
    const { base, fetchRates } = this.props;

    return (
      <Converter
        className={this.props.className}
        base={base}
        onBaseChange={fetchRates}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  base: state.exchange.base,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ fetchRates, fetchRatesCancel }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeApp);
