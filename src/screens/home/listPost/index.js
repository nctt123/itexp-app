/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import HeaderSearch from "@components/headerSearch";
import SvgComponent from "@assets/svg";
import { verticalScale } from "@common/scale";
import { Block, Body, Icon, Image, Text, Touchable } from "@components/index";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useDebounce } from "@common/customHook";
import { baseApi } from "@common/baseApi";
import keyExtractor from "@utils/keyExtractor";
import colors from "@assets/colors";
import * as screenTypes from "@navigation/screenTypes";
import { useNavigation } from "@react-navigation/native";

export default function ListPosts() {
  const [valueSearch, setValueSearch] = useState("");
  const navigation = useNavigation()
  const { t } = useTranslation(["common", "translation"]);
  const debouncedSearchTerm = useDebounce(valueSearch, 300);
  const [listUserSearch, setListUserSearch] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPostList();
  }, [debouncedSearchTerm]);

  const onChangeText = (value) => {
    setValueSearch(value);
  };
  const fetchPostList = async () => {
    setLoading(true);
    try {
      const res = await baseApi.get("/post", {
        limit: 10,
        offset: 0,
        keyword: valueSearch || "",
      });
      setData(res?.items);
    } catch (error) {
      Toast.show({
        type: "error",
        props: {
          message: error?.message,
          onClose: () => Toast.hide(),
        },
      });
    }
    setLoading(false);
  };

  

  const renderItem = ({ item, index }) => {
    return (
      <Touchable mt={10}
        borderBottom
        borderColor={colors.blackModal}
        onPress={() => {
          navigation.navigate(screenTypes.HomeDetailStack, {
            screen: screenTypes.PostDetail,
            params: { item },
          });
        }}
      >
        <Block row justifyBetween >
          {item?.image ? (
            <Image
              uri={
                Platform.OS !== "ios"
                  ? "http://10.0.2.2:3000/" + item?.image
                  : "http://10.0.2.2:3000/" + item?.image
              }
              borderRadius={5}
              mr={10}
              height={80}
              width={'35%'}
            />
          ) : null}
          <Block width={'62%'}>
            <Text numberOfLines={3} fontWeight='bold' size={14} mv={3}>
              {item.title}
            </Text>
            <Text numberOfLines={3} color={'#ECECEC'} size={14} mv={3}>
              {item.description}
            </Text>
          </Block>

        </Block>
      </Touchable>
    )
  }

  return (
    <Body>
      <HeaderSearch
        title={""}
        isBack
        iconRightName={SvgComponent.search}
        onChangeText={onChangeText}
        value={valueSearch}
        onClose={() => setValueSearch("")}
      />
      <FlatList
        style={{ marginTop: verticalScale(16), marginHorizontal: 10 }}
        data={data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchPostList}
            tintColor={colors.white}
          />
        }
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Block center middle>
            <Text size={16} >
              {t("common:noData")}
            </Text>
          </Block>
        }
      />
    </Body>
  );
}
