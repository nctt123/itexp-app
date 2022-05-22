/* eslint-disable react/jsx-wrap-multilines */
import fonts from '@assets/fontFamily';
import SvgComponent from '@assets/svg';
import Icon from '@components/commons/Icon';
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Platform } from 'react-native';

import TextInput from '../commons/TextInput';

const Password = (props, ref) => {
  const [isSecure, setIsSecure] = useState(true);
  const { t } = useTranslation('common');
  const refPassword = useRef(ref);

  useEffect(() => {
    refPassword.current.setNativeProps({
      style: {
        fontFamily: Platform.OS === 'android' ? fonts.primaryMedium : undefined,
      },
    });
  }, []);

  const onToggleSecure = () => {
    setIsSecure(!isSecure);
  };

  return (
    <TextInput
      ref={refPassword}
      secureTextEntry={isSecure}
      placeholder={t('password')}
      iconLeft={SvgComponent.password}
      height={40}
      iconRight={
        <Icon
          touchable
          xml={isSecure ? SvgComponent.eyeOff : SvgComponent.eye}
          onPress={onToggleSecure}
        />
      }
      {...props}
    />
  );
};

export default forwardRef(Password);
