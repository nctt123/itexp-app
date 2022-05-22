import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Body, Block, Text } from '@components/index';
import colors from '@assets/colors';
import Header from '@components/header';
import { scale } from '@common/scale';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { TAB_FRIEND } from '@common/constant';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { profileOtherSelector } from '@modules/profile/selectors';
import TabFriendOther from './components/TabFriendOther';
import TabFollowersOther from './components/TabFollowersOther';
import TabFollowingOther from './components/TabFollowingOther';

const width = Dimensions.get('window').width;

export const TabStatus = {
  Friend: 0,
  Followers: 1,
  Following: 2,
};

export default ListFriendOther = () => {
  const [routes] = useState(TAB_FRIEND);
  const route = useRoute();
  const statusTab = route.params?.statusTab || 0;
  const [index, setIndex] = useState(0);
  const dataProfile = useSelector(profileOtherSelector);

  const _renderScene = SceneMap({
    friends: TabFriendOther,
    followers: TabFollowersOther,
    following: TabFollowingOther,
  });

  useEffect(() => {
    setIndex(statusTab);
  }, [statusTab]);

  const renderName = route => {
    switch (route.key) {
      case 'friends':
        return `${dataProfile?.numberFriend} friends`;
      case 'followers':
        return `${dataProfile?.queryFollowers} followers`;
      case 'following':
        return `${dataProfile?.queryFollowing} following`;
      default:
        break;
    }
  };

  const _renderTabBar = params => (
    <TabBar
      renderLabel={({ route, focused }) =>
        focused ? (
          <Block width={(width - 32) / 3}>
            <Text medium gradient color={colors.orange}>
              {renderName(route)}
            </Text>
          </Block>
        ) : (
          <Text color={colors.textGrayDark} medium>
            {renderName(route)}
          </Text>
        )
      }
      indicatorStyle={{ backgroundColor: colors.orange }}
      style={styles.container}
      tabStyle={styles.tabStyle}
      {...params}
    />
  );

  return (
    <Body ph={16}>
      <Header title={dataProfile?.name} />
      <TabView
        lazy
        initialLayout={{ width }}
        renderScene={_renderScene}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderTabBar={_renderTabBar}
        scrollEnabled={true}
      />
    </Body>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
  },
  tabStyle: {
    height: scale(50),
    width: (width - 32) / 3,
  },
});
