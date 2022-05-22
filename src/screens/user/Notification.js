import React, { useEffect, useState } from "react";
import { Switch } from "react-native";
import { Body, Text, Block } from "@components/index";
import { useTranslation } from "react-i18next";
import Header from "@components/header";
import colors from "@assets/colors";
import { fetchNotifiSetting, updateNotifiSetting } from "@modules/user/slice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const SwitchComponent = ({ value, setValue }) => (
  <Switch
    trackColor={{ false: colors.gray, true: colors.gray }}
    thumbColor={value ? colors.orange : colors.textGrayDark}
    onValueChange={setValue}
    value={value}
  />
);

export default function Notification() {
  const [enableFriendReq, setEnableFriendReq] = useState(false);
  const [enableAcceptFriend, setEnableAcceptFriend] = useState(false);
  const [enableFriendActivity, setEnableFriendActivity] = useState(false);
  const [enableFollowActivity, setEnableFollowActivity] = useState(false);
  const [enableJoinRoom, setEnableJoinRoom] = useState(false);
  const [isLoadSucess, setIsLoadSucess] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      fetchNotifiSetting({
        data: {},
        onSuccess: (res) => {
          setEnableFriendReq(res.data.showFriendRequest);
          setEnableAcceptFriend(res.data.showAcceptedRequest);
          setEnableFollowActivity(res.data.showFollowActivities);
          setEnableFriendActivity(res.data.showFriendActivities);
          setEnableJoinRoom(res.data.showInvitation);
          setIsLoadSucess(true);
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
  }, []);

  useEffect(() => {
    isLoadSucess && onUpdateNotiSetting();
  }, [
    enableFriendReq,
    enableAcceptFriend,
    enableFriendActivity,
    enableFollowActivity,
    enableJoinRoom,
  ]);

  const onSetEnableFriendReq = () => {
    setEnableFriendReq(!enableFriendReq);
  };
  const onSetEnableAcceptFriend = () => {
    setEnableAcceptFriend(!enableAcceptFriend);
  };

  const onSetEnableFriendActivity = () => {
    setEnableFriendActivity(!enableFriendActivity);
  };
  const onSetEnableFollowActivity = () => {
    setEnableFollowActivity(!enableFollowActivity);
  };
  const onSetEnableJoinRoom = () => {
    setEnableJoinRoom(!enableJoinRoom);
  };

  const onUpdateNotiSetting = () => {
    dispatch(
      updateNotifiSetting({
        showFriendRequest: enableFriendReq,
        showAcceptedRequest: enableAcceptFriend,
        showFriendActivities: enableFriendActivity,
        showFollowActivities: enableFollowActivity,
        showInvitation: enableJoinRoom,
      })
    );
  };

  return (
    <Body scroll ph={16}>
      <Header title="notification" />
      <Block row borderBottom pb={8} mt={16}>
        <Text flex={1}>{t("friendRequests")}</Text>
        <SwitchComponent
          value={enableFriendReq}
          setValue={onSetEnableFriendReq}
        />
      </Block>
      <Block row borderBottom pb={8} mt={16}>
        <Text flex={1}>{t("acceptedFriendRequest")}</Text>
        <SwitchComponent
          value={enableAcceptFriend}
          setValue={onSetEnableAcceptFriend}
        />
      </Block>
      <Block row borderBottom pb={8} mt={16}>
        <Text flex={1}>{t("followActivities")}</Text>
        <SwitchComponent
          value={enableFollowActivity}
          setValue={onSetEnableFollowActivity}
        />
      </Block>
    </Body>
  );
}
