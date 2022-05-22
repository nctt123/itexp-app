import React, { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";

import {
  Body,
  Text,
  Button,
  Touchable,
  Email,
  Password,
  Icon,
  Block,
  Image
} from "@components/index";
import * as screenTypes from "@navigation/screenTypes";
import colors from "@assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmail } from "@modules/auth/slice";
import { signInWithEmailLoadingSelector } from "@modules/auth/selectors";
import { isEmail, isPassword } from "@utils/index";
import SvgComponent from "@assets/svg";
import { useModal } from "@common/customHook/index";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Toast from "react-native-toast-message";
import images from "@assets/images";

const validate = (values) => {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = i18next.t("message:MSG_2", {
      field: i18next.t("common:email"),
    });
  } else if (!isEmail(values.email.trim())) {
    errors.email = i18next.t("message:MSG_3");
  }

  if (!values.password) {
    errors.password = i18next.t("message:MSG_2", {
      field: i18next.t("common:password"),
    });
  } else if (!isPassword(values.password)) {
    errors.password = i18next.t("message:MSG_4");
  }

  return errors;
};

const Login = () => {
  const { t } = useTranslation(["auth", "common"]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modal, contextHolder] = useModal();
  const signInWithEmailLoading = useSelector(signInWithEmailLoadingSelector);
  const passwordRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate,
  });

  const goToRequestPassword = () => {
    navigation.navigate(screenTypes.RequestOTPScreen);
  };

  const goToRegister = () => {
    navigation.navigate(screenTypes.RegisterScreen);
  };

  const onFocusPassword = () => passwordRef.current.focus();

  const handleTrimWhenBlurInput = (inputName, e) => {
    formik.setFieldValue(inputName, formik.values[inputName].trim());
    formik.handleBlur(inputName)(e);
  };

  const onLogin = () => {
    // dispatch(saveEmail({ email: formik.values.email }));

    dispatch(
      signInWithEmail({
        data: {
          email: formik.values.email,
          password: formik.values.password,
        },
        // onSuccess: () => navigation.goBack(),
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

  const isDisableButton = () =>
    Object.keys(formik.errors).length !== 0 ||
    !formik.values.email ||
    !formik.values.password;
  console.log(isDisableButton());
  return (
    <Body bg={'black'} ph={16} keyboardAvoid loading={signInWithEmailLoading}>
      <Block row center mt={70}>
        <Image source={images.logo} width={200} height={200} />
      </Block>

      <Email
        mt={48}
        returnKeyType="next"
        onSubmitEditing={onFocusPassword}
        onBlur={(e) => handleTrimWhenBlurInput("email", e)}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        error={formik.errors.email && formik.touched.email}
        errorMessage={formik.errors.email}
      />
      <Password
        mt={18}
        autoFocus={!formik.values.password && !!formik.values.email}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        error={formik.errors.password && formik.touched.password}
        errorMessage={formik.errors.password}
      />

      <Block row justifyEnd mt={10}>
        <Touchable width={100} onPress={goToRequestPassword}>
          <Text right medium c2 color={colors.orange}>
            {t("txt_forgot_password")}
          </Text>
        </Touchable>
      </Block>
      <Button
        mt={38}
        p={10}
        gradient
        disabled={isDisableButton()}
        onPress={onLogin}
      >
        <Text c1 medium>
          {t("txt_login")}
        </Text>
      </Button>
      <Block row middle center mt={100}>
        <Text center>{t("txt_no_account")}</Text>

        <Touchable middle center onPress={goToRegister}>
          <Text medium color={colors.orange}>
            {" "}
            {t("txt_sign_up")}
          </Text>
        </Touchable>
      </Block>
      {contextHolder}
    </Body>
  );
};

export default Login;
