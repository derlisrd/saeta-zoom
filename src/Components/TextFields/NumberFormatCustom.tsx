import React from 'react';
import { NumericFormat } from 'react-number-format';

interface NumberFormatCustomProps {
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  [key: string]: any;
}

const NumberFormatCustom = React.forwardRef<unknown, NumberFormatCustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix=""
      />
    );
  }
);

export default NumberFormatCustom;
