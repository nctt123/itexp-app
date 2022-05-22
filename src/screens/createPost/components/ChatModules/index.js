/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from "react";
import { Block, Icon, Text, TextInput } from "@components/index";
import SvgComponent from "@assets/svg";
import { useDispatch, useSelector } from "react-redux";
import { pushMessageToList } from "@modules/chat/slice";
import { useModal } from "@common/customHook";
import { useTranslation } from "react-i18next";
import {
  sendMessageSocket,
  subscribeGetMessageSocket,
  unSubscribeGetMessageSocket,
} from "@modules/chat/socket";
import { SocketIoSelector } from "@modules/home/selectors";
import { sendMessageLoadingSelector } from "@modules/chat/selectors";
import ListMessage from "./ListMessage";

const ChatModule = ({ userId }) => {
  const { t } = useTranslation(["auth", "common"]);
  const [messages, setMessage] = useState("");
  const sendMessageLoading = useSelector(sendMessageLoadingSelector);
  const socketIo = useSelector(SocketIoSelector);
  const dispatch = useDispatch("");

  useEffect(() => {
    subscribeGetMessageSocket(socketIo, (res) => {
      if (res?.data) {
        dispatch(
          pushMessageToList({
            message: res.data,
          })
        );
      }
    });
    return () => unSubscribeGetMessageSocket(socketIo);
  }, []);

  const onSendMessage = () => {
    if (messages) {
      sendMessageSocket(socketIo, {
        userId,
        content: messages,
      });
      setMessage("");
    }
  };

  return (
    <Block flex={1}>
      <Block flex={1}>
        <ListMessage />
      </Block>
      <TextInput
        mt={16}
        mh={16}
        mb={16}
        placeholder="Aa"
        maxLength={300}
        height={40}
        autoCorrect={false}
        value={messages}
        onChangeText={(value) => setMessage(value)}
        iconRight={
          <Icon
            touchable
            xml={SvgComponent.sendIcon}
            onPress={onSendMessage}
            disabled={sendMessageLoading}
          />
        }
      />
    </Block>
  );
};

export default ChatModule;
