import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Body, Text, Header, Email, Button } from '@components/index';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import * as screenTypes from '@navigation/screenTypes';
import { DEFAULT_MODE, HOST_DEV } from '@common/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from '@utils/';
import { useFormik } from 'formik';
import { requestOtp } from '@modules/auth/slice';

import { requestOTPLoadingSelector } from '@modules/auth/selectors';
import { useModal } from '@common/customHook';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const validate = values => {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = i18next.t('message:MSG_2', {
      field: i18next.t('common:email'),
    });
  } else if (!isEmail(values.email.trim())) {
    errors.email = i18next.t('message:MSG_3');
  }

  return errors;
};

const RequestPassword = ({ showActionSheetWithOptions }) => {
  const { t } = useTranslation(['auth', 'common']);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector(requestOTPLoadingSelector);
  const [devModeCount, setDevModeCount] = useState(7);
  const [modal, contextHolder] = useModal();

  const formik = useFormik({
    initialValues: { email: '' },
    validate,
  });

  const handleTrimWhenBlurInput = (inputName, e) => {
    formik.setFieldValue(inputName, formik.values[inputName].trim());
    formik.handleBlur(inputName)(e);
  };

  const onRequestOTP = () => {
    const { email } = formik.values;

    dispatch(
      requestOtp({
        data: {
          email,
        },
        onSuccess: () => {
          navigation.navigate(screenTypes.ConfirmOTPScreen, {
            data: {
              email,
            },
          });
        },
        onError: e => {
          modal.error({
            title: t('common:title_error'),
            content: e.errorMessage,
          });
        },
      }),
    );
  };

  const onPressMode = () => {
    if (devModeCount === 0) {
      onOpenSelectMode();
    } else {
      setDevModeCount(devModeCount - 1);
    }
  };

  const onOpenSelectMode = async () => {
    const options = Object.keys(HOST_DEV);

    const modeMap = {};
    for (let i = 0; i < options.length; i += 1) {
      modeMap[options[i]] = i;
    }
    let mode = DEFAULT_MODE;
    try {
      const r = await AsyncStorage.getItem('mode');
      if (r) {
        mode = r;
      }
    } catch (e) {
      console.log(e);
    }

    const destructiveButtonIndex = modeMap[mode];
    options.push('CANCEL');
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 3,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex !== 3) {
          AsyncStorage.setItem('mode', options[buttonIndex]);
          RNRestart.Restart();
        }
      },
    );
  };

  const isDisableButton = () =>
    Object.keys(formik.errors).length !== 0 || !formik.values.email;

  return (
    <Body p={16} keyboardAvoid loading={loading}>
      <Header isBack title={t('txt_header_forgot_password_screen')} />
      <Text onPress={onPressMode} mt={50}>
        {t('txt_title_in_request_otp_screen')}
      </Text>

      <Email
        mt={24}
        onBlur={e => handleTrimWhenBlurInput('email', e)}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        error={formik.errors.email && formik.touched.email}
        errorMessage={formik.errors.email}
      />

      <Button
        mt={38}
        p={10}
        gradient
        borderRadius={3}
        disabled={isDisableButton()}
        onPress={onRequestOTP}>
        <Text c1 medium>
          {t('txt_submit')}
        </Text>
      </Button>
      {contextHolder}
    </Body>
  );
};

export default connectActionSheet(RequestPassword);
