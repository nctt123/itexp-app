import React, { useState } from 'react';
import { Body, Text, TextInput, Block, Button, Email } from '@components/index';
import { useTranslation } from 'react-i18next';
import Header from '@components/header';
import colors from '@assets/colors';
import ResultModal from '@components/modal/ResultModal';
import { useFormik } from 'formik';
import { isEmail } from '@utils/index';
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
export default function ContactUs() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [lengthOfContent, setLengthOfContent] = useState(0);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { email: '' },
    validate,
  });
  const handleTrimWhenBlurInput = (inputName, e) => {
    formik.setFieldValue(inputName, formik.values[inputName].trim());
    formik.handleBlur(inputName)(e);
  };
  const onClose = () => {
    setIsShowModal(false);
  };
  const openModal = () => {
    setIsShowModal(true);
  };

  const onSend = () => {};

  const _onChangeText = (value, type) => {
    if (type === 'title') {
      setTitle(value);
    } else if (type === 'content') {
      setContent(value);
      setLengthOfContent(value.length);
    } else {
      setEmail(value);
    }
  };

  return (
    <Body scroll ph={16}>
      <Header title='contactUs' />
      <Text c1 extraBold>
        {t('title')}
      </Text>
      <TextInput
        mt={16}
        placeholder={t('enterYourTitle')}
        height={40}
        fontSize={12}
        value={title}
        onChangeText={value => _onChangeText(value, 'title')}
      />
      <Text mt={16} c1 extraBold>
        {t('email')}
      </Text>
      <Email
        mt={16}
        returnKeyType='next'
        selectTextOnFocus
        onBlur={e => handleTrimWhenBlurInput('email', e)}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        error={formik.errors.email && formik.touched.email}
        errorMessage={formik.errors.email}
        placeholder={t('enterYourEmail')}
        fontSize={12}
        iconLeft={null}
      />

      <Text mt={16} c1 extraBold>
        {t('content')}
      </Text>
      <TextInput
        height={140}
        mt={18}
        multiline
        numberOfLines={10}
        fontSize={12}
        placeholder={t('enterYourContent')}
        maxLength={300}
        iconRight={
          <Block flex={1} justifyEnd ml={5}>
            <Text mb={15} medium c2 color={colors.textGrayDark}>
              {lengthOfContent}
              /300
            </Text>
          </Block>
        }
        value={content}
        onChangeText={value => _onChangeText(value, 'content')}
      />
      <Button
        disabled={
          Object.keys(formik.errors).length !== 0 ||
          !formik.values.email ||
          !title ||
          !content
        }
        mt={16}
        gradient
        pt={8}
        pb={8}
        borderRadius={3}
        onPress={openModal}>
        <Text c1 medium>
          {t('send')}
        </Text>
      </Button>
      <ResultModal
        visible={isShowModal}
        onClose={onClose}
        type='success'
        message=''
      />
    </Body>
  );
}
