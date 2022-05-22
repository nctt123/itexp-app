import React from "react";
import SvgComponent from "@assets/svg";
import images from "@assets/images";
import PropTypes from "prop-types";
import colors from "@assets/colors";
import { Block, Text, Image, Icon, Touchable } from "@components/index";
import SmallButton from "@components/button/ButtonSmall";
import { MAP_SCREEN_TYPE_TO_ICON } from "@common/constant";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { profileSelector } from "@modules/user/selectors";
import { addFriendApi, followFriendApi } from "@modules/user/services";
import { useNavigation } from "@react-navigation/native";
import * as screenTypes from "@navigation/screenTypes";

const UserItem = ({ item, index, iconType, onSuccess }) => {
  const navigation = useNavigation();
  const profile = useSelector(profileSelector);
  const dispatch = useDispatch();
  const getIconByFriendStatus = (id) => {
    switch (item?.friendStatus) {
      case "FRIEND":
        return <Icon touchable={true} xml={SvgComponent.following} mr={16} />;
      case "PENDING":
        return (
          <Icon
            onPress={onAddFriend}
            touchable={true}
            xml={SvgComponent.waitingAccept}
            mr={16}
          />
        );
      default:
        return (
          <Icon
            onPress={onAddFriend}
            touchable={true}
            xml={SvgComponent.addFriend}
            mr={16}
          />
        );
    }
  };

  const onFollowFriend = async () => {
    const data = {
      userId: item?.id,
    };
    try {
      await followFriendApi(data);
      onSuccess && onSuccess();
    } catch (error) {
      Toast.show({
        type: "error",
        props: {
          message: error.errorMessage,
        },
      });
    }
  };
  const onAddFriend = async () => {
    const data = {
      userId: item?.id,
      type: "PENDING",
    };
    try {
      await addFriendApi(data);
      onSuccess && onSuccess();
    } catch (error) {
      Toast.show({
        type: "error",
        props: {
          message: error.errorMessage,
        },
      });
    }
  };

  const goProfile = () => {
    if (profile.id !== item.id) {
      return navigation.navigate(screenTypes.ProfileDetailStack, {
        screen: screenTypes.ProfileOther,
        params: {
          userId: item.id,
        },
      });
    }
  };

  return (
    <Touchable
      key={index.toString()}
      row
      middle
      borderBottom
      pb={13}
      mb={13}
      mr={16}
      onPress={goProfile}
    >
      <Image
        uri={"http://10.0.2.2:3000/" + item?.avatar}
        defaultImage={images.default_avatar}
        circle={60}
        mh={16}
      />
      <Block flex={1}>
        <Text size={16} extraBold>
          {item.name}
        </Text>
        {iconType && (
          <Block row mt={4}>
            <Icon xml={MAP_SCREEN_TYPE_TO_ICON[iconType]} />
            <Text c2 ml={4} color={colors.textSecondary}>
              {item?.total || 0}
            </Text>
          </Block>
        )}
      </Block>
      {profile.id !== item.id && (
        <>
          {getIconByFriendStatus(item.id)}
          {item?.isFollowed ? (
            <SmallButton
              onPress={onFollowFriend}
              bg={colors.yellow}
              title="following"
              icon={SvgComponent.trophySmall}
            />
          ) : (
            <SmallButton
              onPress={onFollowFriend}
              bg={colors.gray}
              title="follow"
              icon={SvgComponent.trophySmall}
            />
          )}
        </>
      )}
    </Touchable>
  );
};

UserItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  iconType: PropTypes.string,
};

export default React.memo(UserItem);
