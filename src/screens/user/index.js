/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/order */
import React, { useState } from "react";
import {
  Body,
  Block,
  Text,
  Image,
  Button,
  Touchable,
  Icon,
} from "@components/index";
import images from "@assets/images";
import Header from "@components/header";
import colors from "@assets/colors";
import SvgComponent from "@assets/svg";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/core";
import * as screenTypes from "@navigation/screenTypes";
import { useDispatch, useSelector } from "react-redux";
import { profileSelector } from "@modules/user/selectors";
import { TabStatus } from "@screens/listFriend";
import { LIST_SETTING } from "./config/listSetting";
import keyExtractor from "@utils/keyExtractor";
import { useCallback } from "react";
import { FlatList } from "react-native";
import { disconnectSocket } from "@utils/SocketHelper";
import { signOut } from "@modules/auth/slice";
import LogoutModal from "./components/LogoutModal";

const Account = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const dataProfile = useSelector(profileSelector);
  const [isShowModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const goSetting = () => {
    navigate(screenTypes.ProfileDetailStack, {
      screen: screenTypes.Setting,
    });
  };

  const goListFriend = () => {
    // navigate(screenTypes.ProfileDetailStack, {
    //   screen: screenTypes.ListFriend,
    //   params: { dataProfile, statusTab: TabStatus.Friend },
    // });
  };

  const goListFollowers = () => {
    // navigate(screenTypes.ProfileDetailStack, {
    //   screen: screenTypes.ListFriend,
    //   params: { dataProfile, statusTab: TabStatus.Followers },
    // });
  };

  const goListFollowing = () => {
    // navigate(screenTypes.ProfileDetailStack, {
    //   screen: screenTypes.ListFriend,
    //   params: { dataProfile, statusTab: TabStatus.Following },
    // });
  };

  const goEditProfile = () => {
    navigate(screenTypes.ProfileDetailStack, {
      screen: screenTypes.EditProfile,
    });
  };

  const moveToScreen = (item) => {
    item.route === "logoutAccount"
      ? showModal()
      : navigate(screenTypes.ProfileDetailStack, {
        screen: item.route,
      });
  };

  const renderItem = useCallback(
    ({ item }) => (
      <>
        <Touchable row pv={10} onPress={() => moveToScreen(item)}>
          <Icon xml={item.icon} />
          <Text ml={16} size={16}>
            {t(item.title)}
          </Text>
        </Touchable>
        <Block height={1} bg={colors.gray} />
      </>
    ),
    []
  );

  const showModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onLogout = () => {
    disconnectSocket();
    dispatch(signOut());
    closeModal();
  };

  return (
    <Body ph={16}>
      <Header
        title={dataProfile?.name}
        isBack={false}
        iconRight={SvgComponent.menuAccount}
        onRightPress={goSetting}
      />
      <Block mt={16} row>
        {dataProfile?.avatar ? (
          <Image source={{ uri: "http://10.0.2.2:3000/" + dataProfile?.avatar }} circle={74} />
        ) : (
          <Image source={images.default_avatar} circle={74} />
        )}

        <Block flex={1} ml={32}>
          <Block flex={1} row justifyBetween>
            <Touchable onPress={goListFriend}>
              <Text bold h5 center>
                {dataProfile?.numberFriend}
              </Text>
              <Text medium>{t("friends")}</Text>
            </Touchable>
            <Touchable onPress={goListFollowers}>
              <Text bold h5 center>
                {dataProfile?.queryFollowers}
              </Text>
              <Text medium>{'Người theo dõi'}</Text>
            </Touchable>
            <Touchable onPress={goListFollowing} >
              <Text bold h5 center>
                {dataProfile?.queryFollowing}
              </Text>
              <Text medium>{'Đang theo dõi'} </Text>
            </Touchable>
          </Block>
          <Button bg={colors.gray} pv={2} onPress={goEditProfile}>
            <Text c2 medium color={colors.white}>
              {t("editProfile")}
            </Text>
          </Button>
        </Block>
      </Block>
      <Text medium c1 mt={16} >
        {dataProfile?.description}
      </Text>

      <FlatList
        data={LIST_SETTING}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ marginTop: 25 }}
        bounces={false}
      />
      <LogoutModal
        visible={isShowModal}
        onClose={closeModal}
        onLogout={onLogout}
      />
    </Body>
  );
};

export default Account;
