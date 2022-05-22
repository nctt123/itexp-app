import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import PropTypes from 'prop-types';
import { makeHitSlop } from '@utils/index';
import Block from './Block';
import Touchable from './Touchable';

const Icon = ({ imgType, xml, touchable, ...rest }) => {
  const Wrapper = touchable ? Touchable : Block;
  if (imgType === 'svg') {
    return (
      <Wrapper {...rest} hitSlop={makeHitSlop(10)}>
        <SvgXml xml={xml} />
      </Wrapper>
    );
  }
  return <Block />;
};

export default Icon;

Icon.propTypes = {
  imgType: PropTypes.string.isRequired,
  touchable: PropTypes.bool,
};

Icon.defaultProps = {
  imgType: 'svg',
};
