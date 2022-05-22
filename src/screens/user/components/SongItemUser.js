/* eslint-disable import/no-extraneous-dependencies */
import React, { memo } from 'react';
import SvgComponent from '@assets/svg';
import colors from '@assets/colors';
import { Block, Touchable, Text, Image, Icon } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { fetchRecentlySelector } from '@modules/profile/selectors';
import Toast from 'react-native-toast-message';
import { normalizerUrlFromW3 } from '@utils/';

const SongItemUser = memo(({ item }) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const recentlyPlayed = useSelector(fetchRecentlySelector);

  const navigation = useNavigation();

  const addFavorite = () => {};

  const onHandlePlayingSong = () => {};

  const goToAddSongInRoomToPlaylistScreen = () => {
    const song = {
      name: item?.title,
      youtubeId: item?.youtubeId,
    };
  };

  return (
    <Touchable
      row
      middle
      mt={8}
      borderBottom
      pb={8}
      onPress={onHandlePlayingSong}>
      <Image
        source={{ uri: normalizerUrlFromW3(item?.thumbnail) }}
        circle={60}
      />
      <Block ml={16} flex={1}>
        <Text c1 extraBold numberOfLines={1}>
          {item?.title}
        </Text>
        <Text c2 medium color={colors.textSecondary} mt={2}>
          {item?.artist}
        </Text>
      </Block>
      <Block row middle ml={8}>
        {item.isFavorite ? (
          <Icon
            touchable
            onPress={addFavorite}
            xml={SvgComponent.iconLoveRedBig}
          />
        ) : (
          <Icon touchable onPress={addFavorite} xml={SvgComponent.love} />
        )}

        <Icon
          touchable
          onPress={goToAddSongInRoomToPlaylistScreen}
          ml={16}
          xml={SvgComponent.plusCircle}
        />
      </Block>
    </Touchable>
  );
});

export default SongItemUser;
