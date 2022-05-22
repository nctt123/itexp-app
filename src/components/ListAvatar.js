import colors from '@assets/colors';
import images from '@assets/images';
import { Block, Text, Image } from '@components/index';
import React from 'react';

const ListAvatar = ({ list, ...rest }) => (
  <Block {...rest}>
    <Block row middle justifyEnd flex={1} pl={list?.length > 5 ? 0 : 10}>
      {list?.length > 5 && (
        <Block
          circle={30}
          center
          middle
          left={10}
          bg={colors.bgGrayOpacity}
          zIndex={100}>
          <Text medium c1 bg={colors.white}>
            <Text>+</Text>
            {list?.length - 5}
          </Text>
        </Block>
      )}
      {list?.length > 0 &&
        [...list].splice(0, 5).map((item, index) => (
          <Block key={item.id} left={-10 * index} zIndex={list?.length - index}>
            <Image
              key={item.id}
              uri={item?.avatar || item?.friend?.avatar}
              defaultImage={images.default_avatar}
              circle={30}
            />
          </Block>
        ))}
    </Block>
  </Block>
);

export default ListAvatar;
