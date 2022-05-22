import React, { forwardRef } from 'react';
import SvgComponent from '@assets/svg';

import { TextInput } from '@components/index';
import { Keyboard } from 'react-native';

// TODO move in input folder
function Search(props, ref) {
  const { value, onChangeText, hideClearIcon } = props;
  const onClearValue = () => {
    onChangeText('');
    Keyboard.dismiss();
  };

  return (
    <TextInput
      ref={ref}
      iconLeft={
        value?.length ? SvgComponent.searchActive : SvgComponent.searchInput
      }
      iconRight={
        value?.length && !hideClearIcon ? SvgComponent.clearSearchIcon : null
      }
      iconRightPress={onClearValue}
      maxLength={254}
      {...props}
    />
  );
}

export default forwardRef(Search);
