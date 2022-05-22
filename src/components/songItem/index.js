/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import SvgComponent from '@assets/svg';
import PropTypes from 'prop-types';
import colors from '@assets/colors';
import { Block, Touchable, Text, Image, Icon } from '@components/index';
import { useTranslation } from 'react-i18next';

const SongItem = ({ item, room, nowPlaying }) => {
  const { t } = useTranslation(['common', 'translation']);
  const addFavourite = () => {};

  const goToAddSongInRoomToPlaylistScreen = () => {};

  return (
    <Touchable row middle mt={8} borderBottom pb={8}>
      <Image
        source={{ uri: item?.song?.thumbnail?.split('?')[0] }}
        circle={60}
      />
      <Block ml={16} flex={1}>
        <Text
          c1
          extraBold
          numberOfLines={1}
          color={nowPlaying?.id === item.id && 'orange'}>
          {item?.song?.title}
        </Text>
        <Text c2 medium color={colors.textSecondary} mt={2}>
          {item?.song?.artist}
        </Text>
        <Text c2 medium color={colors.textSecondary} mt={2}>
          {room?.hostId === item?.user?.id
            ? t('translation:suggestByHost')
            : t('translation:suggestByHost').replace('host', item?.user?.name)}
        </Text>
      </Block>
      <Block row middle ml={8}>
        <Icon
          touchable
          onPress={addFavourite}
          xml={
            item.isFavourited ? SvgComponent.iconLoveRedBig : SvgComponent.love
          }
        />
        <Icon
          touchable
          onPress={goToAddSongInRoomToPlaylistScreen}
          ml={16}
          xml={SvgComponent.plusCircle}
        />
      </Block>
    </Touchable>
  );
};

SongItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SongItem;
