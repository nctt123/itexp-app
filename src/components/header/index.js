/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import SvgComponent from '@assets/svg';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { Block, Text, Icon } from '@components/index';
import { useTranslation } from 'react-i18next';

const HeaderSearch = ({
  isBack,
  title,
  iconRight,
  onRightPress,
  iconLeft,
  onLeftPress,
  nodeRight,
  roomName,
  roomCode,
  ...rest
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goBackScreen = () => {
    navigation.goBack();
  };

  return (
    <Block row height={30} mv={8} middle {...rest}>
      {isBack && (
        <Icon
          touchable
          onPress={onLeftPress || goBackScreen}
          xml={SvgComponent.back}
        />
      )}
      {iconLeft && <Icon touchable onPress={onLeftPress} xml={iconLeft} />}

      {roomName && roomCode ? (
        <Block row flex={1} center ml={16} mr={32}>
          <Block middle center ml={32}>
            <Text h5 bold numberOfLines={1}>
              {roomName}
            </Text>
          </Block>
          <Text h5 bold>
            {roomCode}
          </Text>
        </Block>
      ) : (
        <Block flex={1} middle center>
          <Text h5 bold>
            {t(title)}
          </Text>
        </Block>
      )}
      {iconRight && <Icon touchable xml={iconRight} onPress={onRightPress} />}
      {nodeRight && nodeRight}
    </Block>
  );
};

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
  isBack: PropTypes.bool.isRequired,
  onRightPress: PropTypes.func.isRequired,
  nodeRight: PropTypes.node,
};
HeaderSearch.defaultProps = {
  title: '',
  isBack: true,
  iconRight: false,
  onRightPress: () => { },
  iconLeft: false,
  nodeRight: null,
};
export default React.memo(HeaderSearch);
