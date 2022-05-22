import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Body, Text } from '@components/index';
import colors from '@assets/colors';
import { scale } from '@common/scale';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { TAB_MUSIC_AND_ROOM } from '@common/constant';
import RecentlyPlayedOtherTab from '../RecentlyPlayedOtherTab';
import JoinedRoomOtherTab from '../JoinedRoomOtherTab';

const { width } = Dimensions.get('window');

export default TabRoomAndMusicOther = React.memo(() => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(TAB_MUSIC_AND_ROOM);

  const _renderScene = SceneMap({
    played: RecentlyPlayedOtherTab,
    joined: JoinedRoomOtherTab,
  });

  const _renderTabBar = params => (
    <TabBar
      renderLabel={({ route, focused }) =>
        focused ? (
          <Block width={(width - 32) / 2}>
            <Text medium gradient color={colors.orange}>
              {route.name}
            </Text>
          </Block>
        ) : (
          <Text color={colors.textGrayDark} medium>
            {route.name}
          </Text>
        )
      }
      indicatorStyle={styles.styleIndicator}
      style={styles.container}
      tabStyle={styles.tabStyle}
      {...params}
    />
  );

  return (
    <Block flex={1} mt={16}>
      <TabView
        lazy
        initialLayout={{ width }}
        renderScene={_renderScene}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderTabBar={_renderTabBar}
      />
    </Block>
  );
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
  tabStyle: {
    height: scale(50),
    width: (width - 32) / 2,
  },
  styleIndicator: {
    backgroundColor: colors.orange,
    marginHorizontal: 16,
  },
});
