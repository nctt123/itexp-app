import React from 'react';
import { Block, Text, Icon } from '@components/index';
import Toast from 'react-native-toast-message';
import colors from '@assets/colors';
import SvgComponent from '@assets/svg';

const toastConfig = {
  success: ({ props }) => (
    <Block
      width='100%'
      mt={5}
      height={40}
      bg={colors.success}
      row
      justifyBetween
      middle
      ph={10}>
      <Text medium c1 color={colors.white}>
        {props.message}
      </Text>
      <Icon
        touchable
        xml={SvgComponent.close}
        onPress={props?.onClose || Toast.hide}
      />
    </Block>
  ),
  error: ({ props, ...rest }) => (
    <Block
      width='100%'
      mt={5}
      height={40}
      bg={colors.error}
      row
      justifyBetween
      middle
      ph={10}>
      <Text medium c1 color={colors.white}>
        {props.message}
      </Text>
      <Icon
        touchable
        xml={SvgComponent.close}
        onPress={props?.onClose || Toast.hide}
      />
    </Block>
  ),
};

const ToastMessage = () => (
  <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
);

export default ToastMessage;
