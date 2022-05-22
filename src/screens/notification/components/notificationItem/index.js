/* eslint-disable react/jsx-one-expression-per-line */
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Block, Text, Icon, Touchable, Image, Button } from "@components/index";
import * as screenTypes from "@navigation/screenTypes";
import colors from "@assets/colors";
import images from "@assets/images";
import SvgComponent from "@assets/svg";
import { useDispatch, useSelector } from "react-redux";
import { readNotification } from "@modules/notification/slice";
import { JoinRoomSocket, sendMessageSocket } from "@modules/chat/socket";
import { SocketIoSelector } from "@modules/home/selectors";
import { acceptInviteRoom } from "@modules/chat/slice";
import { useTranslation } from "react-i18next";
import { useModal } from "@common/customHook";
import { MESSAGES_TYPE, TYPE_NOTIFICATION } from "@common/constant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { normalizerUrlFromW3 } from "@utils/";
import ReceiveRequestFriend from "./ReceiveRequestFriend";
import InvitedToRoom from "./InvitedRoom";
import Follwing from "./Follwing";

dayjs.extend(relativeTime);

const NotificationItem = ({ item }) => {
  const navigation = useNavigation();
  const socketIo = useSelector(SocketIoSelector);
  const [modal, contextHolder] = useModal();
  const { t } = useTranslation(["common"]);

  const dispatch = useDispatch();

  const goToScreen = () => {
    dispatch(
      readNotification({
        data: {
          notificationId: item.id,
        },
      })
    );

    if (item.type === TYPE_NOTIFICATION.FRIEND) {
      navigation.navigate(screenTypes.ProfileDetailStack, {
        screen: screenTypes.ProfileOther,
        params: {
          userId: item.senderId,
        },
      });
    }
    if (item.type === TYPE_NOTIFICATION.INVITED) {
      onInvitedRoom();
    }

    if (item.type === TYPE_NOTIFICATION.FOLLOWING_INFO) {
      navigation.navigate(screenTypes.ProfileDetailStack, {
        screen: screenTypes.ProfileOther,
        params: {
          userId: item.senderId,
        },
      });
    }
  };

  const onInvitedRoom = () => {
    const { roomId } = JSON.parse(item.metadata);
    dispatch(
      acceptInviteRoom({
        data: {
          invitationId: JSON.parse(item.metadata).invitationId,
        },
        onSuccess: () => {
          onJoinRoom(roomId);
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

  const onJoinRoom = (roomId) => {
    JoinRoomSocket(socketIo, roomId);
    sendMessageSocket(socketIo, {
      roomId,
      content: MESSAGES_TYPE.joined_room,
    });
  };

  const _renderAvatar = () => (
    <Block row center middle mr={16}>
      {item.isRead ? (
        <Block mr={18} />
      ) : (
        <Block mr={10} circle={8} bg={colors.orange} />
      )}
      <Image
        uri={"http://10.0.2.2:3000/" + item?.sender?.avatar}
        defaultImage={images.default_avatar}
        circle={44}
      />
    </Block>
  );

  const _renderContent = () => (

    <>
      {item.type === "LIKE_POST" && (
        <Text onPress={() => {
          navigation.navigate(screenTypes.HomeDetailStack, {
            screen: screenTypes.PostDetail,
            params: { item: item?.post },
          });
        }} flex={1} medium c1>
          <Text>{item.body}</Text>
        </Text>
      )}
      {/* {item.type === "LIKE_SONG" && (
        <Text flex={1} medium c1>
          <Text extraBold>You</Text>
          <Text> liked {item.data.songName} </Text>
          <Icon xml={SvgComponent.loveRed} />
        </Text>
      )}
      {item.type === "ADD_SONG_TO_PLAYLIST" && (
        <Text flex={1} medium c1>
          <Text extraBold>You</Text>
          <Text>
            {" "}
            add {item.data.songName} to {item.data.playlistName}
          </Text>
        </Text>
      )} */}
      {/* 
      {(item.type === "YOU_CREATE_ROMM" ||
        item.type === "FRIEND_CREATE_ROMM") && (
          <Text flex={1} medium c1>
            <Text extraBold>
              {" "}
              {item.type === "YOU_CREATE_ROMM" ? " You" : item.data.userName}{" "}
            </Text>
            <Text>
              created
              <Text extraBold> {item.data.roomName} Room </Text>
            </Text>
          </Text>
        )} */}

      {item.type === TYPE_NOTIFICATION.FOLLOWING_INFO && (
        <Follwing item={item} />
      )}

      {/* {item.type === TYPE_NOTIFICATION.INVITED && <InvitedToRoom item={item} />} */}
      {item.type === TYPE_NOTIFICATION.FRIEND && (
        <ReceiveRequestFriend item={item} />
      )}
    </>
  );

  const _renderTimeAgo = () => (
    <Block absolute bottom={-15} right={-5}>
      <Text c2 medium color={colors.textGrayDark}>
        {dayjs(item.createdAt).toNow(true)}
      </Text>
    </Block>
  );

  return (
    <Touchable
      mh={16}
      mb={10}
      pv={15}
      ph={15}
      bg={!item.isRead ? colors.gray : "rgba(196, 196, 196, 0.05)"}
      borderRadius={10}
      onPress={goToScreen}
    >
      <Block row middle>
        {_renderAvatar()}
        {_renderContent()}
        {_renderTimeAgo()}
      </Block>
      {contextHolder}
    </Touchable>
  );
};

export default memo(NotificationItem);
