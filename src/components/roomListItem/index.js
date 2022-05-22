import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Block, Text, Icon, Image, Touchable } from "@components/index";
import Toast from "react-native-toast-message";
import * as screenTypes from "@navigation/screenTypes";
import colors from "@assets/colors";
import SvgComponent from "@assets/svg";
import LinearGradient from "react-native-linear-gradient";

import { MESSAGES_TYPE, ROOM_MODE, TARGET_MEMBER } from "@common/constant";
import { useDispatch, useSelector } from "react-redux";
import { userJoinRoom } from "@modules/chat/slice";
import { useTranslation } from "react-i18next";
import { JoinRoomSocket, sendMessageSocket } from "@modules/chat/socket";
import { SocketIoSelector } from "@modules/home/selectors";
import images from "@assets/images";
import { profileSelector } from "@modules/user/selectors";
import SongEffect from "./SongEffect";

const RoomListItem = ({ item, onCancel }) => {
  const { t } = useTranslation(["room", "common"]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const socketIo = useSelector(SocketIoSelector);
  const profile = useSelector(profileSelector);

  const goToRoomDetail = () => {
    onCancel && onCancel();
  };

  const onPress = () => {
    if (item?.type === TARGET_MEMBER[1].value) {
      const membersId = item.members.map((item) => item.id);
      if (membersId.includes(profile.id)) {
        onJoinRoom();
      } else {
        return Toast.show({
          type: "error",
          props: {
            message: t("txt_not_permission_join_room"),
            onClose: () => Toast.hide(),
          },
        });
      }
    } else {
      onJoinRoom();
    }
  };

  const onJoinRoom = () => {
    const roomId = item.id;
    dispatch(
      userJoinRoom({
        data: {
          roomId,
        },
        onSuccess: () => {
          JoinRoomSocket(socketIo, roomId);
          sendMessageSocket(socketIo, {
            roomId,
            content: MESSAGES_TYPE.joined_room,
          });
          goToRoomDetail();
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

  return (
    <Touchable mb={30} onPress={onPress}>
      <Block row>
        <Image
          ur={item?.hostAvatar}
          defaultImage={images.default_avatar}
          circle={52}
        />
        <Block ml={9} pr={50}>
          <Text extraBold c1>
            {item?.name || ""}
          </Text>
          <Text medium c2 color={colors.textGrayDark} mt={2}>
            {item?.hostName || ""}
          </Text>
          <Text medium c1 color={colors.textGrayLight} mt={2}>
            {item?.description}
          </Text>
        </Block>
      </Block>

      <Block mt={12} mb={10}>
        <Image
          uri={item?.cover}
          defaultImage={images.room_default}
          width="100%"
          height={180}
          borderRadius={10}
        />
        <SongEffect item={item} />
        <LinearGradient
          locations={[0, 1]}
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      </Block>

      <Block row justifyBetween middle borderBottom pb={24}>
        <Block row middle center>
          <Icon xml={SvgComponent.menbers} />
          <Text ml={5} medium c1 color={colors.textGrayLight}>
            {`${
              item?.total === item?.number
                ? item?.number - Math.cell(item?.number * 0.2)
                : item?.total
            } ${item?.members?.length >= 1 ? "+" : ""}`}
          </Text>
        </Block>
        <Block row>
          {item?.mode === ROOM_MODE.TOUR && (
            <Icon xml={SvgComponent.game} mr={8} />
          )}

          {item?.type === TARGET_MEMBER[1].value && (
            <Icon xml={SvgComponent.privateIcon} mr={8} />
          )}
        </Block>
      </Block>
    </Touchable>
  );
};

export default React.memo(RoomListItem);
