import React, { useState } from 'react';
import {
  Body,
  Block,
  Text,
  Icon,
  Button,
  Touchable,
  TextInput,
} from '@components/index';
import colors from '@assets/colors';
import HeaderProfile from '../../components/header/HeaderProfile';
import { useTranslation } from 'react-i18next';
import * as screenTypes from '@navigation/screenTypes';
import ResultModal from '@components/modal/ResultModal';
import { useNavigation } from '@react-navigation/core';
import SvgComponent from '@assets/svg';
export default function ForgotPassword() {
  const [isShowModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const showModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToForgotPassword = () => {
    navigation.navigate(screenTypes.ProfileDetailStack, {
      screen: screenTypes.ForgotPassword,
    });
  };

  return (
    <Body ph={16}>
      <HeaderProfile title='forgotPassword' rightButton={false} />
      <Text medium mv={32}>
        {t('plsEnterEmailToReceive')}
      </Text>
      <TextInput
        iconLeft={SvgComponent.email}
        placeholder='plsEnterYourEmail'
        color={colors.white}
      />
      <Button gradient pv={8} borderRadius={3} mt={32}>
        <Text medium>Submit</Text>
      </Button>
      <ResultModal
        visible={isShowModal}
        onClose={closeModal}
        type='success'
        message='waiting'
      />
    </Body>
  );
}
