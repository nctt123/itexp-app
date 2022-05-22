import React, { useRef, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";

import { Body, Text, Button, Password, Header } from "@components/index";
import * as screenTypes from "@navigation/screenTypes";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "@modules/auth/slice";

import { setPasswordLoadingSelector } from "@modules/auth/selectors";

import { isPassword } from "@utils/index";
import { useModal } from "@common/customHook";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import SvgComponent from "@assets/svg";
import Toast from "react-native-toast-message";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = i18next.t("message:MSG_2", {
      field: i18next.t("common:password"),
    });
  } else if (!isPassword(values.password)) {
    errors.password = i18next.t("message:MSG_4");
  }

  if (!values.rePassword) {
    errors.rePassword = i18next.t("message:MSG_2", {
      field: i18next.t("common:password"),
    });
  } else if (values.rePassword !== values.password) {
    errors.rePassword = i18next.t("message:MSG_9");
  }

  return errors;
};

const Login = () => {
  const { t } = useTranslation(["auth", "common"]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const loading = useSelector(setPasswordLoadingSelector);
  const [modal, contextHolder] = useModal();

  useEffect(() => {
    const { email, otp } = route.params.data;

    if (!email && !otp) {
      navigation.navigate(screenTypes.LoginScreen);
    }
  }, []);

  const rePasswordRef = useRef(null);

  const formik = useFormik({
    initialValues: { password: "", rePassword: "" },
    validate,
  });

  const onFocusRePassword = () => rePasswordRef.current.focus();

  const onSetPassword = () => {
    const { email, otp } = route.params.data;

    dispatch(
      setPassword({
        data: {
          email,
          otp,
          password: formik.values.password,
        },
        onSuccess: () => {
          Toast.show({
            type: "success",
            props: {
              message: t("txt_set_password_success"),
              onClose: () => navigation.navigate(screenTypes.LoginScreen),
            },
          });
        },
        onError: (e) => {
          Toast.show({
            type: "error",
            props: {
              message: e.errorMessage,
            },
          });
        },
      })
    );
  };

  const goToRequestOtp = () => {
    navigation.navigate(screenTypes.RequestOTPScreen);
  };

  const isDisableButton = () =>
    Object.keys(formik.errors).length !== 0 ||
    !formik.values.password ||
    !formik.values.rePassword ||
    formik.values.password !== formik.values.rePassword;

  return (
    <Body p={16} keyboardAvoid loading={loading}>
      <Header
        isBack={false}
        iconLeft={SvgComponent.back}
        onLeftPress={goToRequestOtp}
        title={t("txt_header_set_password_screen")}
      />
      <Text mt={50} mb={24}>
        {t("txt_title_in_set_password_screen")}
      </Text>

      <Password
        mt={18}
        selectTextOnFocus
        onSubmitEditing={onFocusRePassword}
        placeholder={t("placeholder_new_password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        error={formik.errors.password && formik.touched.password}
        errorMessage={formik.errors.password}
      />

      <Password
        mt={18}
        placeholder={t("placeholder_re_password")}
        ref={rePasswordRef}
        selectTextOnFocus
        onBlur={formik.handleBlur("rePassword")}
        value={formik.values.rePassword}
        onChangeText={formik.handleChange("rePassword")}
        error={formik.errors.rePassword && formik.touched.rePassword}
        errorMessage={formik.errors.rePassword}
      />

      <Button
        mt={38}
        p={10}
        gradient
        borderRadius={3}
        disabled={isDisableButton()}
        onPress={onSetPassword}
      >
        <Text c1 medium>
          {t("txt_btn_reset_pass")}
        </Text>
      </Button>
      {contextHolder}
    </Body>
  );
};

export default Login;
