import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Body,
  Text,
  Header,
  Button,
  CodeInput,
  Block,
} from "@components/index";
import * as screenTypes from "@navigation/screenTypes";
import { useDispatch, useSelector } from "react-redux";
import { confirmOtp, requestOtp } from "@modules/auth/slice";

import {
  confirmOTPLoadingSelector,
  requestOTPLoadingSelector,
} from "@modules/auth/selectors";
import colors from "@assets/colors";
import { useModal } from "@common/customHook";
import { useTranslation } from "react-i18next";
import { convertDurationToTime } from "@utils/TrackPlayerHelper";

const ConfirmOTP = () => {
  const { t } = useTranslation(["auth", "common"]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const [otp, setOtp] = useState("");
  const [resendTime, setResendTime] = useState(120);
  const [resendTimeLoading, setResendTimeLoading] = useState(false);
  const [modal, contextHolder] = useModal();
  const requestOTPLoading = useSelector(requestOTPLoadingSelector);
  const confirmOTPLoading = useSelector(confirmOTPLoadingSelector);
  const countDownRef = useRef(0);

  useEffect(() => {
    const { email } = route.params.data;
    onCountDown();
    if (!email) {
      navigation.navigate(screenTypes.LoginScreen);
    }
    return () => {
      clearInterval(countDownRef.current);
    };
  }, []);

  const onConfirmOTP = () => {
    const { email } = route.params.data;

    dispatch(
      confirmOtp({
        data: {
          otp,
          email,
        },
        onSuccess: () => {
          navigation.navigate(screenTypes.SetPasswordScreen, {
            data: {
              otp,
              email,
            },
          });
        },
        onError: (e) => {
          modal.error({
            title: t("common:title_error"),
            content: e.errorMessage,
          });
        },
      })
    );
  };

  const onRequestOTP = () => {
    const { email } = route.params.data;
    dispatch(
      requestOtp({
        data: {
          email,
        },
        onError: (e) => {
          modal.error({
            title: t("common:title_error"),
            content: e.errorMessage,
          });
        },
      })
    );
  };

  const onCountDown = () => {
    setResendTime(120);
    countDownRef.current = setInterval(() => {
      setResendTime((time) => {
        if (time > 0) {
          return time - 1;
        }
        clearInterval(countDownRef.current);
        return 0;
      });
    }, 1000);
  };

  const reSendOTP = async () => {
    setResendTimeLoading(true);
    onCountDown();
    clearInterval(countDownRef.current);
    try {
      onRequestOTP();
      onCountDown();
    } catch (e) {
      modal.error({
        title: t("common:title_error"),
        content: e.errorMessage,
      });
    }
    setResendTimeLoading(false);
  };

  const isDisableButton = () => otp.length !== 4;

  return (
    <Body
      p={16}
      keyboardAvoid
      loading={confirmOTPLoading || requestOTPLoading || resendTimeLoading}
    >
      <Header isBack title={t("txt_header_forgot_password_screen")} />
      <Text mt={50} mb={24}>
        {t("txt_title_in_confirm_otp_screen")}
      </Text>

      <CodeInput value={otp} setValue={setOtp} />

      <Text c1 extraBold center mt={20} color={colors.orange}>
        {`${convertDurationToTime(resendTime)}s`}
      </Text>

      <Block center middle>
        <Button
          mt={12}
          p={10}
          width={130}
          bg={colors.gray}
          borderRadius={3}
          gradient
          onPress={reSendOTP}
          disabled={resendTime > 0}
        >
          <Text c1 medium>
            {t("txt_resend_code")}
          </Text>
        </Button>
      </Block>

      <Button
        mt={38}
        p={10}
        gradient
        borderRadius={3}
        disabled={isDisableButton()}
        onPress={onConfirmOTP}
      >
        <Text c1 medium>
          {t("txt_submit")}
        </Text>
      </Button>
      {contextHolder}
    </Body>
  );
};

export default ConfirmOTP;
