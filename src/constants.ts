export interface ICurrency {
  GBP: "GBP";
  EUR: "EUR";
  USD: "USD";
}

export type Currency = keyof ICurrency;

export const currency: ICurrency = {
  GBP: "GBP",
  EUR: "EUR",
  USD: "USD",
};
