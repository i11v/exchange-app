import React, { ChangeEvent, Component, createRef } from "react";
import styled from "styled-components";

interface Props {
  readOnly: boolean;
  value: string;
  sign: string;
  onChange: (value: string) => void;
}

const StyledInput = styled.input.attrs({ type: "text", size: 10 })`
  font-size: 2rem;
  text-align: right;
  outline: none;
`;

class NumberInput extends Component<Props> {
  static defaultProps = {
    readOnly: false,
    onChange: () => {},
  };

  inputRef = createRef<HTMLInputElement>();

  get renderValue() {
    const { value, sign } = this.props;

    if (value === "0" || value === "") {
      return value;
    }

    return `${sign}${value}`;
  }

  focus = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { sign, onChange } = this.props;
    const { value } = e.target;
    const unsignedValue = value[0] === sign ? value.slice(1) : value;
    const formatIsCorrect = /^([1-9]\d*|0)(\.\d*)?$/.test(unsignedValue);
    const empty = value === "" || value === sign;

    e.preventDefault();

    if (formatIsCorrect || empty) {
      onChange(unsignedValue);
    }
  };

  render() {
    const { readOnly } = this.props;

    return (
      <StyledInput
        ref={this.inputRef}
        readOnly={readOnly}
        aria-label="number-input"
        value={this.renderValue}
        onChange={this.handleChange}
      />
    );
  }
}

export default NumberInput;
