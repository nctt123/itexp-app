import SvgComponent from '@assets/svg';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import TextInput from '../commons/TextInput';

const Email = ({ ...rest }, ref) => {
  const { t } = useTranslation('common');

  return (
    <TextInput
      ref={ref}
      placeholder={t('email')}
      keyboardType='email-address'
      iconLeft={SvgComponent.email}
      height={40}
      {...rest}
      maxLength={225}
    />
  );
};

export default forwardRef(Email);
