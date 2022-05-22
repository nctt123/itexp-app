import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { moderateScale, scale, verticalScale } from '@common/scale';
import colors from '@assets/colors';

const Loading = ({ m, mt, mr, mb, ml, mv, mh, color }) => {
  const styledComponent = [
    m && { margin: moderateScale(m) },
    mt && { marginTop: verticalScale(mt) },
    mr && { marginRight: scale(mr) },
    mb && { marginBottom: verticalScale(mb) },
    ml && { marginLeft: scale(ml) },
    mh && { marginHorizontal: scale(mh) },
    mv && { marginVertical: verticalScale(mv) },
  ];

  const loadingProps = {
    color: '#fff',
  };

  if (color === 'primary') {
    loadingProps.color = colors.orange;
  }
  return <ActivityIndicator style={styledComponent} {...loadingProps} />;
};

Loading.propTypes = {
  m: PropTypes.number,
  mt: PropTypes.number,
  mr: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  mv: PropTypes.number,
  mh: PropTypes.number,
};

export default Loading;
