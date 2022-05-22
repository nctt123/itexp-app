/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, Touchable } from '@components/index';
import LinearGradient from 'react-native-linear-gradient';
import colors from '@assets/colors';
import { scale } from '@common/scale';
import PropTypes from 'prop-types';

const TabBarItem = ({ index, params, data }) => (
  <Touchable
    width='33.3%'
    middle
    key={params.key}
    onPress={params.onPress}
    onLongPress={params.onLongPress}>
    {data[index].key === params.key ? (
      <Text medium gradient color={colors.orange}>
        {params.route.name}
      </Text>
    ) : (
      <Text color={colors.textGrayDark} medium>
        {params.route.name}
      </Text>
    )}

    {data[index].key === params.key ? (
      <LinearGradient
        style={styles.indicatorItem}
        colors={[`${colors.startColorSong}`, `${colors.endColorSong}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    ) : (
      <Block style={[styles.indicatorItem, { backgroundColor: colors.gray }]} />
    )}
  </Touchable>
);
TabBarItem.propTypes = {
  index: PropTypes.number.isRequired,
  params: PropTypes.object.isRequired,
  data: PropTypes.any.isRequired,
};
TabBarItem.defaultProps = {
  index: 0,
  params: {},
  data: {},
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
  tabStyle: {
    height: scale(50),
  },
  indicatorItem: {
    marginTop: 8,
    height: 2,
    borderRadius: 3,
    width: '100%',
  },
});

export default React.memo(TabBarItem);
