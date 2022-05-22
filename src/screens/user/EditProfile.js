import React, { useState } from 'react';
import {
  Body,
  Block,
  Text,
  Image,
  Touchable,
  TextInput,
  Loading,
} from '@components/index';
import images from '@assets/images';
import colors from '@assets/colors';
import HeaderProfile from '../../components/header/HeaderProfile';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import * as screenTypes from '@navigation/screenTypes';
import ChoosePhotoModal from './components/ChoosePhotoModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  profileSelector,
  loadingUpdateProfileSelector,
} from '@modules/user/selectors';
import { useFormik } from 'formik';
import { isUserName } from '@utils/';
import i18next from 'i18next';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { preUploadFile } from '@modules/uploadFile/slice';
import { useModal } from '@common/customHook';
import { updateProfile } from '@modules/user/slice';
import Toast from 'react-native-toast-message';
import { getDays, getMonths, getYears } from '@utils/DateTime';
import PickerSelect from '@components/picker-select';
import moment from 'moment';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const validate = values => {
  const errors = {};
  if (!isUserName(values.name.trim())) {
    errors.name = i18next.t('message:MSG_5');
  }
  return errors;
};

export default function EditProfile() {
  const [isShowModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const { navigate, goBack } = useNavigation();
  const dataProfile = useSelector(profileSelector);
  const [image, setImage] = useState(dataProfile.avatar);
  const [imagePreview, setImagePreview] = useState("http://10.0.2.2:3000/" + dataProfile.avatar);
  const [loading, setLoading] = useState(false);
  const [modal] = useModal();
  const loadingUpdate = useSelector(loadingUpdateProfileSelector);

  const [year, setYear] = useState(dataProfile?.birthday ? Number(moment(dataProfile?.birthday).format('YYYY')) : new Date().getFullYear())
  const [month, setMonth] = useState(dataProfile?.birthday ? Number(moment(dataProfile?.birthday).format('MM')) : new Date().getMonth())
  const [day, setDay] = useState(dataProfile?.birthday ? Number(moment(dataProfile?.birthday).format('DD')) : new Date().getDay())
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: dataProfile?.name,
      email: dataProfile?.email,
      description: dataProfile?.description,
    },
    validate,
  });

  const showModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToChangePassword = () => {
    navigate(screenTypes.ProfileDetailStack, {
      screen: screenTypes.ChangePassword,
    });
  };

  const handleTrimWhenBlurInput = (inputName, e) => {
    formik.setFieldValue(inputName, formik.values[inputName].trim());
    formik.handleBlur(inputName)(e);
  };

  const onRemoveCurrentPhoto = () => {
    setImage(null);
  };

  const showErrorMessageImage = message => {
    modal.error({
      title: t('common:title_error'),
      content: message,
    });
  };

  const onChosenPhotoFromLibrary = () => {
    launchImageLibrary(options, resImage => {
      // cb && cb();
      const { fileSize } = resImage;
      const mg = fileSize / 1000000;
      if (mg > 10) {
        return showErrorMessageImage(t('message:MSG_37'));
      }
      setImage(resImage);
      setImagePreview(resImage.uri);
      closeModal()
    })
  };
  const onUpdateProfile = () => {
    let parts;
    let imageConvert;
    if (image !== dataProfile.avatar) {
      parts = image.uri.split("/");
      imageConvert = {
        uri: image.uri,
        type: image.type,
        name: parts[parts.length - 1],
        size: image.fileSize,
      };
    }
    if (
      dataProfile?.birthday === `${year}-${month}-${day}` &&
      image === dataProfile.avatar &&
      formik.values.name === dataProfile.name &&
      formik.values.description === dataProfile.description
    ) {
      return goBack();

    }

    console.log({ imageConvert });
    dispatch(
      updateProfile({
        data: {
          birthday: `${year}-${month}-${day}`,
          name: formik.values.name,
          avatar: imageConvert,
          description: formik.values.description,
        },
        onSuccess: () => {
          goBack()
        },
        onError: e => {
          console.log({ e });
          Toast.show({
            type: 'error',
            props: {
              message: e.errorMessage,
            },
          });
        },
      }),
    );
  };
  console.log({ image });
  const renderImage = () => {
    if (loading) {
      return <Loading />;
    } else {
      return image ? (
        <Image source={{ uri: imagePreview }} circle={100} />
      ) : (
        <Image source={images.default_avatar} circle={100} />
      );
    }
  };

  return (
    <Body ph={16} loading={loadingUpdate} keyboardAvoid>
      <HeaderProfile title='editProfile' onPressRight={onUpdateProfile} />
      <Touchable middle mt={16} borderBottom pb={16} onPress={showModal}>
        {renderImage()}
        <Block>
          <Text medium c1 mt={16}>
            {t('changeProfilePhoto')}
          </Text>
        </Block>
      </Touchable>
      <Block mt={16} center>
        <Text c1 extraBold>
          {t('username')}
        </Text>
        <TextInput
          mt={8}
          color={colors.white}
          value={formik.values.name}
          onBlur={e => handleTrimWhenBlurInput('name', e)}
          onChangeText={formik.handleChange('name')}
          error={formik.errors.name}
          errorMessage={formik.errors.name}
        />
      </Block>
      <Block mv={10} >
        <Text mb={10} >Ngày sinh</Text>
        <Block row mt={10} alignItems='center' width={'100%'}>
          <Block width={'35%'}>
            <PickerSelect
              placeholder="Năm"
              heightInput={40}
              value={year}
              onValueChange={(value) => setYear(value)}
              items={getYears()}
            />
          </Block>
          <Block width={'30%'} mh={10}>
            <PickerSelect
              placeholder="Tháng"
              heightInput={40}
              value={month}
              onValueChange={(value) => setMonth(value)}
              items={getMonths()}
            />
          </Block>
          <Block width={'28%'}>
            <PickerSelect
              placeholder="Ngày"
              heightInput={40}
              value={day}
              onValueChange={(value) => setDay(value)}
              items={getDays(year, month)}
            />
          </Block>
        </Block>
      </Block>
      <Block mt={16} center>
        <Text c1 extraBold>
          {t('bio')}
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
      <Block mt={16} center borderBottom pb={16}>
        <Text c1 extraBold>
          {t('email')}
        </Text>
        <TextInput
          mt={8}
          color={colors.white}
          value={formik.values.email}
          editable={false}
        />
      </Block>
      <Touchable mt={16} borderBottom pb={16} onPress={goToChangePassword}>
        <Text color={colors.orange} extraBold c1>
          {t('changeYourPassword')}
        </Text>
      </Touchable>
      <ChoosePhotoModal
        visible={isShowModal}
        onClose={closeModal}
        onRemoveCurrentPhoto={onRemoveCurrentPhoto}
        onChosenPhotoFromLibrary={onChosenPhotoFromLibrary}
      />
    </Body>
  );
}
