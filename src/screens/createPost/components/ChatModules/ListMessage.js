import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Block, Text, Image, Loading } from "@components/index";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessageListLoadingSelector,
  messageListSelector,
} from "@modules/chat/selectors";
import images from "@assets/images";
import { loadmoreMessageList } from "@modules/chat/slice";
import { profileSelector } from "@modules/user/selectors";
import colors from "@assets/colors";
import { MESSAGES_TYPE } from "@common/constant";
import keyExtractor from "@utils/keyExtractor";

const ListMessage = ({ roomId }) => {
  const fetchMessageListLoading = useSelector(fetchMessageListLoadingSelector);
  const messageList = useSelector(messageListSelector);
  const profile = useSelector(profileSelector);
  const dispatch = useDispatch();
  console.log({ profile });
  const _renderListMessageItem = ({ item }) => {
    console.log({ item });
    if (item?.sender?.id === profile.id) {
      return (
        <Block row mv={8} justifyEnd>
          <Block mr={12}>
            <Text
              extraBold
              c1
              color={
                item?.sender?.name === profile.name
                  ? colors.orange
                  : colors.textPrimary
              }
            >
              <Text medium c1>
                {item?.content}
                {"  "}
              </Text>
              {item?.sender?.name || ""}
            </Text>
          </Block>
          <Image
            uri={"http://10.0.2.2:3000/" + item?.sender?.avatar}
            defaultImage={images.default_avatar}
            circle={22}
            mt={2}
          />
        </Block>
      );
    }

    return (
      <Block row mv={8}>
        <Image
          uri={"http://10.0.2.2:3000/" + item?.sender?.avatar}
          defaultImage={images.default_avatar}
          circle={22}
          mt={2}
        />
        <Block ml={12}>
          <Text
            extraBold
            c1
            color={
              item?.sender?.id === profile.id
                ? colors.orange
                : colors.textPrimary
            }
          >
            {item?.sender?.name || ""}{" "}
            <Text medium c1>
              {" "}
              {item?.content}
            </Text>
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <Block ph={16}>
      {fetchMessageListLoading && <Loading />}
      {!fetchMessageListLoading && (
        <FlatList
          data={messageList}
          keyExtractor={keyExtractor}
          inverted
          renderItem={_renderListMessageItem}
        />
      )}
    </Block>
  );
};

export default ListMessage;
