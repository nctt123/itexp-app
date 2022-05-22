/* eslint-disable import/order */
import React, { useState } from "react";
import {
  Body,
  Block,
  Text,
  Button,
  Touchable,
  Password,
} from "@components/index";
import colors from "@assets/colors";
import HeaderProfile from "../../components/header/HeaderProfile";
import { useTranslation } from "react-i18next";
import * as screenTypes from "@navigation/screenTypes";
import { useNavigation } from "@react-navigation/core";
import { useFormik } from "formik";
import { updatePasswordApi } from "@modules/profile/services";
import i18next from "i18next";
import { isPassword } from "@utils/";
import { useModal } from "@common/customHook";

const validate = (values) => {
  const errors = {};
  if (!values.currentPassword.trim()) {
    errors.currentPassword = i18next.t("message:MSG_2", {
      field: i18next.t("common:password"),
    });
  } else if (!isPassword(values.currentPassword)) {
    errors.currentPassword = i18next.t("message:MSG_4");
  }

  if (!values.newPassword.trim()) {
    errors.newPassword = i18next.t("message:MSG_2", {
      field: i18next.t("common:password"),
    });
  } else if (!isPassword(values.newPassword)) {
    errors.newPassword = i18next.t("message:MSG_4");
  } else if (values.newPassword === values.currentPassword) {
    errors.newPassword = i18next.t("message:MSG_41");
  }

  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = i18next.t("message:MSG_2", {
      field: i18next.t("common:password"),
    });
  }
  return errors;
};

export default function ChangePassword() {
  const { t } = useTranslation(["translation", "auth", "message"]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = useModal();
  const { goBack } = useNavigation();

  const goToForgotPassword = () => {
    navigation.navigate(screenTypes.ProfileDetailStack, {
      screen: screenTypes.ForgotPassword,
    });
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate,
  });

  const onChangePassword = async () => {
    setLoading(true);
    try {
      setLoading(true);
      await updatePasswordApi(
        formik.values.currentPassword,
        formik.values.confirmNewPassword
      );
      setTimeout(() => {
        modal.success({
          content: t("auth:txt_set_password_success"),
          okButton: () => {
            goBack();
          },
        });
      }, 300);
    } catch (error) {
      setTimeout(() => {
        modal.error({
          title: t("common:title_error"),
          content: error.errorMessage,
        });
      }, 300);
    }
    setLoading(false);
  };

  const disableButton = () =>
    !formik.values.currentPassword ||
    !formik.values.newPassword ||
    !formik.values.confirmNewPassword ||
    Object.keys(formik.errors).length !== 0;

  const handleTrimWhenBlurInput = (inputName, e) => {
    formik.setFieldValue(inputName, formik.values[inputName].trim());
    formik.handleBlur(inputName)(e);
  };

  return (
    <>
      <Body ph={16} loading={loading} keyboardAvoid>
        <HeaderProfile
          title={t("translation:changePassword")}
          onPressRight={onChangePassword}
        />
        <Block mt={16} center>
          <Text c1 extraBold>
            {t("currentPassword")}
          </Text>
          <Password
            mt={8}
            color={colors.white}
            placeholder={t("plsTypeCurrentPassword")}
            value={formik.values.currentPassword}
            onChangeText={formik.handleChange("currentPassword")}
            onBlur={(e) => handleTrimWhenBlurInput("currentPassword", e)}
            error={
              formik.errors.currentPassword && formik.touched.currentPassword
            }
            errorMessage={formik.errors.currentPassword}
          />
        </Block>
        <Block mt={16} center>
          <Text c1 extraBold>
            {t("newPassword")}
          </Text>
          <Password
            mt={8}
            color={colors.white}
            placeholder={t("plsTypeNewPassword")}
            value={formik.values.newPassword}
            onChangeText={formik.handleChange("newPassword")}
            onBlur={(e) => handleTrimWhenBlurInput("newPassword", e)}
            error={formik.errors.newPassword && formik.touched.newPassword}
            errorMessage={formik.errors.newPassword}
          />
        </Block>
        <Block mt={16} center>
          <Text c1 extraBold>
            {t("confirmNewPassword")}
          </Text>
          <Password
            mt={8}
            color={colors.white}
            placeholder={t("PlsRetypeNewPassword")}
            value={formik.values.confirmNewPassword}
            onBlur={(e) => handleTrimWhenBlurInput("confirmNewPassword", e)}
            onChangeText={formik.handleChange("confirmNewPassword")}
            error={
              formik.errors.confirmNewPassword &&
              formik.touched.confirmNewPassword
            }
            errorMessage={formik.errors.confirmNewPassword}
          />
        </Block>
        <Button
          gradient
          disabled={disableButton()}
          mt={16}
          pv={8}
          borderRadius={3}
          onPress={onChangePassword}
        >
          <Text c1 medium>
            {t("changePassword")}
          </Text>
        </Button>
      </Body>
      {contextHolder}
    </>
  );
}
