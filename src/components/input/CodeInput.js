import React from 'react';
import { Block, Text } from '@components/index';
import { StyleSheet } from 'react-native';
import colors from '@assets/colors';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  codeFieldRoot: {
    justifyContent: 'center',
  },
  cell: {
    lineHeight: 38,
    fontSize: 20,
  },
  focusCell: {
    borderRadius: 12,
  },
});

const CELL_COUNT = 4;

const CodeInput = ({ value, setValue }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <Block>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        renderCell={({ index, symbol, isFocused }) => (
          <Block
            key={index}
            mr={20}
            bg={colors.gray}
            width={44}
            height={44}
            borderRadius={12}
            center
            middle>
            <Text
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused && <Cursor />)}
            </Text>
          </Block>
        )}
      />
    </Block>
  );
};

export default CodeInput;
