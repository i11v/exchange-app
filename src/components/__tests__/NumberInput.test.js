import React, { Component } from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import NumberInput from "../NumberInput";

class TestInput extends Component {
  state = {
    value: "",
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { sign } = this.props;
    const { value } = this.state;

    return (
      <NumberInput value={value} sign={sign} onChange={this.handleChange} />
    );
  }
}

const setup = ({ sign = "-" } = {}) => {
  const utils = render(<TestInput sign={sign} />);
  const input = utils.getByLabelText("number-input");

  return { input, ...utils };
};

afterEach(cleanup);

test("It should keep a minus sign in front of the input", () => {
  const { input } = setup();

  fireEvent.change(input, { target: { value: 2 } });
  expect(input.value).toBe("-2");
  fireEvent.change(input, { target: { value: 21 } });
  expect(input.value).toBe("-21");
});

test("It should keep a plus sign in front of the input", () => {
  const { input } = setup({ sign: "+" });

  fireEvent.change(input, { target: { value: 5 } });
  expect(input.value).toBe("+5");
  fireEvent.change(input, { target: { value: 55 } });
  expect(input.value).toBe("+55");
});

test("It should allow using decimal numbers", () => {
  const { input } = setup();

  fireEvent.change(input, { target: { value: "0.09" } });
  expect(input.value).toBe("-0.09");
  fireEvent.change(input, { target: { value: "3.14" } });
  expect(input.value).toBe("-3.14");
  fireEvent.change(input, { target: { value: "66.6" } });
  expect(input.value).toBe("-66.6");
});

test("It should clear the input", () => {
  const { input } = setup();

  expect(input.value).toBe("");
  fireEvent.change(input, { target: { value: "-" } });
  expect(input.value).toBe("");
});

test("It should not allow number with leading zero", () => {
  const { input } = setup();

  fireEvent.change(input, { target: { value: 0 } });
  expect(input.value).toBe("0");
  fireEvent.change(input, { target: { value: "01" } });
  expect(input.value).toBe("0");
});

test("It should not allow to input letters", () => {
  const { input } = setup();

  expect(input.value).toBe("");
  fireEvent.change(input, { target: { value: "foo" } });
  expect(input.value).toBe("");
});

test("It should not allow to input second dot", () => {
  const { input } = setup();

  fireEvent.change(input, { target: { value: "0.7" } });
  expect(input.value).toBe("-0.7");
  fireEvent.change(input, { target: { value: "0.7." } });
  expect(input.value).toBe("-0.7");
});
