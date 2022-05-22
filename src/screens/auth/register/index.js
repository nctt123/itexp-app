import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Body,
  Text,
  Button,
  Email,
  Password,
  TextInput,
  Block,
  Icon,
  Header,
  Image
} from "@components/index";
import * as screenTypes from "@navigation/screenTypes";
import colors from "@assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { signUpWithEmail } from "@modules/auth/slice";
import { signUpWithEmailLoadingSelector } from "@modules/auth/selectors";
import { profileSelector } from "@modules/user/selectors";
import { useFormik } from "formik";
import { isEmail, isPassword, isUserName } from "@utils/index";
import SvgComponent from "@assets/svg";
import { useModal } from "@common/customHook";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Toast from "react-native-toast-message";
import images from "@assets/images";

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = i18next.t("message:MSG_2", {
      field: i18next.t("common:username"),
    });
  } else if (!isUserName(values.name.trim())) {
    errors.name = i18next.t("message:MSG_5");
  }

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

const Register = () => {
  const { t } = useTranslation(["auth", "common"]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [modal, contextHolder] = useModal();
  const profile = useSelector(profileSelector);

  const signUpWithEmailLoading = useSelector(signUpWithEmailLoadingSelector);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validate,
  });

  const goToLogin = () => {
    navigation.navigate(screenTypes.LoginScreen);
  };

  const onFocusEmail = () => {
    emailRef.current.focus();
  };

  const onFucusPassword = () => {
    passwordRef.current.focus();
  };

  const handleTrimWhenBlurInput = (inputName, e) => {
    formik.setFieldValue(inputName, formik.values[inputName].trim());
    formik.handleBlur(inputName)(e);
  };

  const onRegister = () => {
    // dispatch(saveEmail({ email: formik.values.email }));
    dispatch(
      signUpWithEmail({
        data: {
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
        },
        onSuccess: () => {
          Toast.show({
            type: "success",
            props: {
              message: t("txt_register_success"),
            },
          });
          goToLogin()
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

  const isDisableButton = () =>
    Object.keys(formik.errors).length !== 0 ||
    !formik.values.name ||
    !formik.values.email ||
    !formik.values.password;

  return (
    <Body p={16} bg='black' keyboardAvoid loading={signUpWithEmailLoading}>
      <Header isBack />
      <Block row center mt={40}>
        <Image source={images.logo} width={200} height={200} />
      </Block>

      <TextInput
        mt={40}
        height={40}
        placeholder={t("placeholder_username")}
        returnKeyType="next"
        iconLeft={SvgComponent.userName}
        onSubmitEditing={onFocusEmail}
        value={formik.values.name}
        onBlur={(e) => handleTrimWhenBlurInput("name", e)}
        onChangeText={formik.handleChange("name")}
        error={formik.errors.name && formik.touched.name}
        errorMessage={formik.errors.name}
      />

      <Email
        mt={20}
        onSubmitEditing={onFucusPassword}
        ref={emailRef}
        selectTextOnFocus
        returnKeyType="next"
        onBlur={(e) => handleTrimWhenBlurInput("email", e)}
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        error={formik.errors.email && formik.touched.email}
        errorMessage={formik.errors.email}
      />

      <Password
        mt={20}
        ref={passwordRef}
        value={formik.values.password}
        onBlur={formik.handleBlur("password")}
        onChangeText={formik.handleChange("password")}
        error={formik.errors.password && formik.touched.password}
        errorMessage={formik.errors.password}
      />

      <Button
        mt={38}
        bg={colors.orange}
        p={10}
        gradient
        borderRadius={3}
        disabled={isDisableButton()}
        onPress={onRegister}
      >
        <Text c1 medium>
          {t("txt_register")}
        </Text>
      </Button>
      {contextHolder}
    </Body>
  );
};

export default Register;
