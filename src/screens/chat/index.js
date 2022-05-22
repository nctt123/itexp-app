import React, { useState } from "react";
import {
  Block,
  Body,
  Header,
  Image,
  Search,
  Text,
  Touchable,
} from "@components/index";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingFetchMessageSelector,
  messengerSelector,
} from "@modules/chat/selectors";
import { useTranslation } from "react-i18next";
import keyExtractor from "@utils/keyExtractor";
import { useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useEffect } from "react";
import { fetchMessenger } from "@modules/chat/slice";
import Toast from "react-native-toast-message";
import * as screenTypes from "@navigation/screenTypes";
import { useNavigation } from "@react-navigation/native";
import colors from "@assets/colors";
import images from "@assets/images";
import { useDebounce } from "@common/customHook";

const ChatScreen = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const messenger = useSelector(messengerSelector);
  const loadingMessenger = useSelector(loadingFetchMessageSelector);
  const { navigate } = useNavigation();
  const [valueSearch, setValueSearch] = useState("");
  const debouncedSearch = useDebounce(valueSearch, 500);

  useEffect(() => {
    getMesenger();
  }, [debouncedSearch]);

  const getMesenger = () => {
    dispatch(
      fetchMessenger({
        data: {
          keyword: valueSearch,
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
  const renderItem = useCallback(
    ({ item }) => (
      <Touchable
        mh={16}
        mb={10}
        pv={8}
        ph={15}
        row
        middle
        bg={"rgba(196, 196, 196, 0.05)"}
        borderRadius={10}
        onPress={() => {
          navigate(screenTypes.ChatDetail, {
            userId: item.id,
            name: item.name,
          });
        }}
      >
        <Block mr={16}>
          <Image
            uri={"http://10.0.2.2:3000/" + item?.avatar}
            defaultImage={images.default_avatar}
            circle={44}
          />
        </Block>
        <Text size={16}>{item.name} </Text>
      </Touchable>
    ),
    []
  );

  return (
    <Body loading={false}>
      <Header isBack={false} title={"Trò chuyện"} />
      <Search
        mh={16}
        placeholder={'Tìm kiếm tin nhắn ...'}
        height={40}
        onChangeText={setValueSearch}
        value={valueSearch}
      />
      <FlatList
        data={messenger?.items}
        renderItem={renderItem}
        style={{ marginTop: 32 }}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Block center middle>
            <Text mt={60} size={18}>
              {t("common:noData")}
            </Text>
          </Block>
        }
        refreshControl={
          <RefreshControl
            refreshing={loadingMessenger}
            onRefresh={getMesenger}
            tintColor={colors.white}
          />
        }
      />
    </Body>
  );
};

export default ChatScreen;
