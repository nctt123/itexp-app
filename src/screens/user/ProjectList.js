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
import Header from "@components/header";
import { useSelector } from "react-redux";
import { profileSelector } from "@modules/user/selectors";

export default function ProjectList() {
    const [valueSearch, setValueSearch] = useState("");
    const navigation = useNavigation()
    const { t } = useTranslation(["common", "translation"]);
    const debouncedSearchTerm = useDebounce(valueSearch, 300);
    const [listUserSearch, setListUserSearch] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const userProfile = useSelector(profileSelector)
    console.log({ userProfile });
    useEffect(() => {
        fetchPostList();
    }, [debouncedSearchTerm]);

    const onChangeText = (value) => {
        setValueSearch(value);
    };
    const fetchPostList = async () => {
        setLoading(true);
        try {
            const res = await baseApi.get("/project", {
                limit: 10,
                offset: 0,
                userId: userProfile?.id
                // keyword: valueSearch || "",
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
                onPress={() => {
                    // navigation.navigate(screenTypes.HomeDetailStack, {
                    //     screen: screenTypes.CreateProject,
                    //     params: { item },
                    // });
                }}
            >
                <Block row justifyBetween >
                    <Block width={'62%'}>
                        <Text numberOfLines={3} fontWeight='bold' size={14} mv={3}>
                            Tên: {item.title}
                        </Text>
                        <Text numberOfLines={3} color={'#ECECEC'} size={14} mv={3}>
                            Mô tả: {item.description}
                        </Text>
                        <Text numberOfLines={1} color={'#ECECEC'} size={14} mv={3}>
                            Danh sách người tham gia: {item.member_join ?? 1} người
                        </Text>
                        <Text numberOfLines={1} color={'#ECECEC'} size={14} mv={3}>
                            Phần trăm tham gia: {item.percent_join ?? 0} %
                        </Text>
                    </Block>

                </Block>
                <Block height={1} mt={10} bg={colors.gray} />
            </Touchable>
        )
    }

    return (
        <Body>
            <Header title="Dự án của bạn" />
            <FlatList
                style={{ marginHorizontal: 10 }}
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
