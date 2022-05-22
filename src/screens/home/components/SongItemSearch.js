import React from 'react';
import images from '@assets/images';
import { Block, Touchable, Text, Image } from '@components/index';

// TODO no have songId to add song and favourites
const SongItemSearch = ({ item, onPress }) => (
  <Block>
    <Block>
      <Touchable
        row
        middle
        onPress={onPress && onPress}
        borderBottom={2}
        pv={8}>
        <Image
          defaultImage={images.music_default}
          uri={item?.thumbnails}
          circle={60}
          mr={16}
        />
        <Block flex={1}>
          <Text c1 extraBold numberOfLines={1}>
            {item?.name}
          </Text>
          {item?.artist && (
            <Text c2 numberOfLines={1}>
              {item?.artist}
            </Text>
          )}
        </Block>
      </Touchable>
    </Block>
  </Block>
);

export default SongItemSearch;
