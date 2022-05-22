import React, { useEffect, useState } from 'react';
import {
  Body,
  Block,
  Text,
  TextInput,
} from '@components/index';
import colors from '@assets/colors';
import HeaderProfile from '../../components/header/HeaderProfile';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadingUpdateProfileSelector,
} from '@modules/user/selectors';
import { useFormik } from 'formik';
import Toast from 'react-native-toast-message';
import { createProject } from '@modules/home/slice';


export default function CreateProject() {
  const { params } = useRoute();
  const { navigate, goBack } = useNavigation();
  const loadingUpdate = useSelector(loadingUpdateProfileSelector);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description: params?.item?.description ?? '',
      title: params?.item?.title ?? '',
      member_join: params?.item?.member_join ?? 0,
      percent_join: params?.item?.percent_join ?? 0
    },
  });








  const onUpdateProfile = () => {

    if (
      formik.values.title &&
      formik.values.description &&
      formik.values.member_join &&
      formik.values.percent_join
    ) {

      dispatch(
        createProject({
          data: {
            title: formik.values.title,
            percent_join: formik.values.percent_join,
            description: formik.values.description,
            member_join: formik.values.member_join,
          },
          onSuccess: () => {
            goBack()
          },
          onError: e => {
            Toast.show({
              type: 'error',
              props: {
                message: e.errorMessage,
              },
            });
          },
        }),
      );

    } else {
      alert("Vui lòng điền đầy đủ thông tin dự án!")
    }
  };

  return (
    <Body ph={16} loading={loadingUpdate} keyboardAvoid>
      <HeaderProfile title='createProject' onPressRight={onUpdateProfile} />


      <Block mt={16} center>
        <Text c1 extraBold>
          Tiêu đề
        </Text>
        <TextInput
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          error={formik.errors.title}
          errorMessage={formik.errors.title}
          height={60}
          mt={18}
          multiline
          numberOfLines={5}
          fontSize={12}
          maxLength={300}
        />
      </Block>
      <Block mt={16} center>
        <Text c1 extraBold>
          Mô tả
        </Text>
        <TextInput
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          error={formik.errors.description}
          errorMessage={formik.errors.description}
          height={140}
          mt={18}
          multiline
          numberOfLines={10}
          fontSize={12}
          maxLength={300}
        />
      </Block>
      <Block mt={16} center pb={16}>
        <Text c1 extraBold>
          Số người tham gia
        </Text>
        <TextInput
          mt={8}
          color={colors.white}
          value={formik.values.member_join}
          onChangeText={formik.handleChange('member_join')}
          error={formik.errors.member_join}
          errorMessage={formik.errors.member_join}
        />
      </Block>
      <Block mt={16} center borderBottom pb={16}>
        <Text c1 extraBold>
          Phần trăm tham gia
        </Text>
        <TextInput
          mt={8}
          color={colors.white}
          value={formik.values.percent_join}
          onChangeText={formik.handleChange('percent_join')}
          error={formik.errors.percent_join}
          errorMessage={formik.errors.percent_join}
        />
      </Block>
    </Body>
  );
}
