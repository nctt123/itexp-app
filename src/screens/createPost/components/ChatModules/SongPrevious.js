import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Body, Block, Text, Icon, Image } from '@components/index';
import * as screenTypes from '@navigation/screenTypes';
import colors from '@assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import images from '@assets/images';

const SongPrevious = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={[`${colors.startColorOption}`, `${colors.endColorOption}`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <Block height={60} ph={16} mb={16}>
        <Text color={colors.orange} mt={8}>
          Song has ended
        </Text>
        <Block row center middle mt={8}>
          <Image source={images.default} circle={40} />
          <Block flex={1} ml={10}>
            <Text c1 extraBold>
              SHORTWAVE
            </Text>
            <Text medium c2 color='#D2D2D3'>
              RYAN GRIGDRY
            </Text>
          </Block>
        </Block>
      </Block>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    marginBottom: 16,
  },
});

export default SongPrevious;
