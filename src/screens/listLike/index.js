import React, { useCallback, useEffect, useState } from "react";
import { Body, Block, Image, Text, Header, Icon } from "@components/";
import { FlatList } from "react-native";
import UserItem from "@screens/home/components/UserItem";
import keyExtractor from "@utils/keyExtractor";
import { useTranslation } from "react-i18next";
import { getListLikeApi } from "@modules/home/services";
import { useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { verticalScale } from "@common/scale";

export default ListLike = () => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const route = useRoute();
  const postId = route.params?.postId;
  const [loading, setLoading] = useState(false);

  const renderItem = useCallback(
    ({ item, index }) => (
      <UserItem item={item} index={index} onSuccess={getData} />
    ),
    []
  );

  const getData = async () => {
    setLoading(true);
    try {
      const res = await getListLikeApi({ postId });
      setData(res?.data?.items);
    } catch (error) {
      Toast.show({
        type: "error",
        props: {
          message: e.errorMessage,
        },
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Body loading={loading}>
      <Header title={"Danh sách yêu thích"} mh={16} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: verticalScale(16) }}
        ListEmptyComponent={
          <Text size={16} center middle mt={64}>
            {t("common:noData")}
          </Text>
        }
      />
    </Body>
  );
};
