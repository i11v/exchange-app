import { combineReducers } from "redux";

import { currency, Currency } from "./constants";

export const FETCH_RATES_REQUEST = "@exchange-app/FETCH_RATES_REQUEST";
export const FETCH_RATES_SUCCESS = "@exchange-app/FETCH_RATES_SUCCESS";
export const FETCH_RATES_FAILURE = "@exchange-app/FETCH_RATES_FAILURE";
export const FETCH_RATES_CANCEL = "@exchange-app/FETCH_RATES_CANCEL";

export type Rates = { [K in Currency]: number };
export type FetchRatesAction = {
  type: string;
  payload: {
    base: Currency;
    date: string;
    rates: { [K in Currency]?: number };
  };
};
export type FetchRatesFulfilledAction = ReturnType<typeof fetchRatesFulfilled>;
export type FetchRatesFailedAction = ReturnType<typeof fetchRatesFailed>;
export type FetchRatesCancelAction = ReturnType<typeof fetchRatesCancel>;
export type Action =
  | FetchRatesAction
  | FetchRatesFulfilledAction
  | FetchRatesFailedAction
  | FetchRatesCancelAction;

export function fetchRates(base: Currency) {
  return {
    type: FETCH_RATES_REQUEST,
    payload: { base },
  };
}

export function fetchRatesFulfilled(payload: any): FetchRatesAction {
  return {
    type: FETCH_RATES_SUCCESS,
    payload,
  };
}

export function fetchRatesFailed(base: Currency, err: Error) {
  return {
    type: FETCH_RATES_FAILURE,
    error: true,
    payload: err,
  };
}

export function fetchRatesCancel() {
  return {
    type: FETCH_RATES_CANCEL,
  };
}

export type ExchangeState = {
  readonly base: Currency;
  readonly date: string;
  readonly rates: Rates;
};

const exchangeInitialState: ExchangeState = {
  base: currency.GBP,
  date: "",
  rates: {
    [currency.GBP]: 1.0,
    [currency.EUR]: 1.0,
    [currency.USD]: 1.0,
  },
};

function exchange(state = exchangeInitialState, action: Action) {
  switch (action.type) {
    case FETCH_RATES_REQUEST: {
      const { base } = (action as FetchRatesAction).payload;
      const rates = Object.keys(currency).reduce(
        (acc, currency) => ({ ...acc, [<Currency>currency]: 1.0 }),
        {}
      ) as Rates;

      return {
        ...state,
        base,
        rates,
      };
    }

    case FETCH_RATES_SUCCESS: {
      const {
        base,
        date,
        rates: rawRates,
      } = (action as FetchRatesFulfilledAction).payload;
      const rates = Object.keys(currency).reduce(
        (acc, currency) => ({
          ...acc,
          [currency]: (rawRates[<Currency>currency] as number) || 1.0,
        }),
        {}
      ) as Rates;

      return {
        base,
        date,
        rates,
      };
    }

    default:
      return state;
  }
}

export type AccountState = { readonly [C in Currency]: number };

function getRandomNumber(max: number) {
  return Math.random() * max;
}

const accountInitialState: AccountState = {
  GBP: getRandomNumber(100),
  EUR: getRandomNumber(200),
  USD: getRandomNumber(500),
};

function account(state = accountInitialState, action?: Action) {
  return state;
}

const rootReducer = combineReducers({ account, exchange });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
