import React from 'react';
import { Block, Text } from '@components/index';
import colors from '@assets/colors';

const MAX_HEIGHTS = [10, 20, 20, 30, 40, 50, 30, 20, 10];

const SongEffectItem = React.memo(({ maxHeight }) => {
  const [height, setHeight] = React.useState(0);
  React.useEffect(() => {
    setHeight(Math.ceil(Math.random() * maxHeight));
  }, []);

  return <Block width={3} height={height} mr={2} bg={colors.white} />;
});

const SongEffect = ({ item }) => (
  <Block row alignItemsEnd absolute left={10} bottom={10} zIndex={20}>
    <Block row alignItemsEnd>
      {item?.nowPlaying?.songTitle &&
        MAX_HEIGHTS.map((maxHeight, index) => (
          <SongEffectItem key={index.toString()} maxHeight={maxHeight} />
        ))}
    </Block>
    <Block flex={1} pr={10}>
      <Text ml={10} medium c1 color={colors.white}>
        {item?.nowPlaying?.songTitle}
      </Text>
    </Block>
  </Block>
);

export default React.memo(SongEffect);
