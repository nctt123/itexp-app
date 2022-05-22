/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import HeaderSearch from "@components/headerSearch";
import SvgComponent from "@assets/svg";
import { verticalScale } from "@common/scale";
import { Body, Text } from "@components/index";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useDebounce } from "@common/customHook";
import UserItem from "../../components/UserItem";
import { baseApi } from "@common/baseApi";
import keyExtractor from "@utils/keyExtractor";
import colors from "@assets/colors";

export default function ListUser() {
  const [valueSearch, setValueSearch] = useState("");
  const { t } = useTranslation(["common", "translation"]);
  const debouncedSearchTerm = useDebounce(valueSearch, 300);
  const [listUserSearch, setListUserSearch] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onFetchUser();
  }, [debouncedSearchTerm]);

  const onChangeText = (value) => {
    setValueSearch(value);
  };

  const onFetchUser = async () => {
    setLoading(true);
    try {
      const res = await baseApi.get("/user", {
        limit: 10,
        offset: 0,
        keyword: valueSearch || "",
      });
      setData(res?.data);
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

  const renderItem = ({ item, index }) => (
    <UserItem item={item} index={index} onSuccess={onFetchUser} />
  );

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
        style={{ marginTop: verticalScale(16) }}
        data={data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onFetchUser}
            tintColor={colors.white}
          />
        }
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text size={16} center middle>
            {t("common:noData")}
          </Text>
        }
      />
    </Body>
  );
}
