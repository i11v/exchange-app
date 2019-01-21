import { interval, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  switchMap,
  startWith,
  takeUntil,
  catchError,
} from "rxjs/operators";
import { Epic, combineEpics, ofType } from "redux-observable";

import { currency } from "./constants";
import {
  FETCH_RATES_REQUEST,
  FETCH_RATES_CANCEL,
  FetchRatesAction,
  fetchRatesFulfilled,
  fetchRatesFailed,
} from "./reducer";

const fetchRatesEpic: Epic = action$ =>
  action$.pipe(
    ofType(FETCH_RATES_REQUEST),
    switchMap((action: FetchRatesAction) => {
      const { base } = action.payload;
      const symbols = Object.keys(currency)
        .filter(symbol => symbol !== base)
        .join(",");

      return interval(10000).pipe(
        startWith(0),
        switchMap(() =>
          ajax
            .getJSON(
              `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`
            )
            .pipe(
              map(res => fetchRatesFulfilled(res)),
              catchError(err => of(fetchRatesFailed(action.payload.base, err)))
            )
        ),
        takeUntil(action$.pipe(ofType(FETCH_RATES_CANCEL)))
      );
    })
  );

export default combineEpics(fetchRatesEpic);
