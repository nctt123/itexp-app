import React, { useEffect } from "react";
import { Block, Text, Body, Icon, Touchable } from "@components/index";
import { useTranslation } from "react-i18next";
import { BANNER_ID, ICON_TYPE, USER_TYPE } from "@common/constant";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@modules/user/slice";
import {
  popularUsersSelector,
  winnerOfWeeksUsersSelector,
  winnerUsersSelector,
} from "@modules/user/selectors";
import Toast from "react-native-toast-message";
import * as screenTypes from "@navigation/screenTypes";
import SvgComponent from "@assets/svg";
import colors from "@assets/colors";
import { useNavigation } from "@react-navigation/core";
import UserListHorizontal from "../components/UserListHorizontal";

export default function TabUser() {
  const popularUsers = useSelector(popularUsersSelector);
  const winnerUsers = useSelector(winnerUsersSelector);
  const winnerOfWeeksUsers = useSelector(winnerOfWeeksUsersSelector);

  const navigation = useNavigation();
  const { t } = useTranslation(["common", "translation"]);
  const dispatch = useDispatch();
  useEffect(() => {
    onFetchUser();
  }, []);

  const onFetchUser = () => {
    dispatch(
      fetchUser({
        data: {},
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

  const onSeeAll = (type, iconType, title) => {
    navigation.navigate(screenTypes.HomeDetailStack, {
      screen: screenTypes.ListUsers,
      params: {
        type,
        iconType,
        title,
      },
    });
  };
  return (
    <Body scroll>
      <Block row middle>
        <Text h3 bold mv={16} flex={1}>
          {t("translation:winnerChart")}
        </Text>
        {winnerUsers.length > 5 && (
          <Touchable
            row
            middle
            mr={16}
            onPress={() => {
              onSeeAll(USER_TYPE.WINNER, ICON_TYPE.WINNER, "winnerChart");
            }}
          >
            <Text c1 mv={16} medium color={colors.orange}>
              {t("translation:seeAll")}
            </Text>
            <Icon xml={SvgComponent.seeAll} />
          </Touchable>
        )}
      </Block>
      <UserListHorizontal
        list={winnerUsers.filter((item, index) => index < 5)}
        iconType={ICON_TYPE.WINNER}
      />

      <Block row middle>
        <Text h3 bold mv={16} flex={1}>
          {t("translation:winnerOfWeek")}
        </Text>
        {winnerOfWeeksUsers.length > 5 && (
          <Touchable
            row
            middle
            mr={16}
            onPress={() => {
              onSeeAll(
                USER_TYPE.WINNER_OF_WEEK,
                ICON_TYPE.WINNER,
                "popularUser"
              );
            }}
          >
            <Text c1 mv={16} medium color={colors.orange}>
              {t("translation:seeAll")}
            </Text>
            <Icon xml={SvgComponent.seeAll} />
          </Touchable>
        )}
      </Block>
      <UserListHorizontal
        list={winnerOfWeeksUsers.filter((item, index) => index < 5)}
        iconType={ICON_TYPE.WINNER}
      />

      <Block row middle>
        <Text h3 bold mv={16} flex={1}>
          {t("translation:popularUser")}
        </Text>
        {popularUsers.length > 5 && (
          <Touchable
            row
            middle
            mr={16}
            onPress={() => {
              onSeeAll(USER_TYPE.POPULAR, ICON_TYPE.POPULAR, "popularUser");
            }}
          >
            <Text c1 mv={16} medium color={colors.orange}>
              {t("translation:seeAll")}
            </Text>
            <Icon xml={SvgComponent.seeAll} />
          </Touchable>
        )}
      </Block>
      <UserListHorizontal
        list={popularUsers.filter((item, index) => index < 5)}
        iconType={ICON_TYPE.POPULAR}
      />
      <Block height={20} />
    </Body>
  );
}
