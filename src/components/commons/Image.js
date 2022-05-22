import React from 'react';
import { scale, verticalScale, moderateScale } from '@common/scale';
import PropTypes from 'prop-types';

import FastImage from 'react-native-fast-image';

const ImageView = ({
  flex,
  m,
  mt,
  mr,
  mb,
  ml,
  mv,
  mh,
  p,
  pt,
  pr,
  pb,
  pl,
  pv,
  ph,
  width,
  height,
  wrap,
  row,
  column,
  direction,
  center,
  justifyStart,
  justifyEnd,
  justifyBetween,
  justifyAround,
  justify,
  middle,
  alignItemsStart,
  alignItemsEnd,
  alignItems,
  borderRadius,
  borderWidth,
  borderColor,
  bg,
  opacity,
  children,
  style,
  source,
  uri,
  defaultImage,
  circle,
  absolute,
  top,
  right,
  left,
  bottom,
  ...rest
}) => {
  const styledComponent = [
    flex && { flex },
    width && { width: typeof width === 'number' ? scale(width) : width },
    height && { height: verticalScale(height) },
    m && { margin: moderateScale(m) },
    mt && { marginTop: verticalScale(mt) },
    mr && { marginRight: scale(mr) },
    mb && { marginBottom: verticalScale(mb) },
    ml && { marginLeft: scale(ml) },
    mh && { marginHorizontal: scale(mh) },
    mv && { marginVertical: verticalScale(mv) },
    p && { padding: moderateScale(p) },
    pt && { paddingTop: verticalScale(pt) },
    pr && { paddingRight: scale(pr) },
    pb && { paddingBottom: verticalScale(pb) },
    pl && { paddingLeft: scale(pl) },
    ph && { paddingHorizontal: scale(ph) },
    pv && { paddingVertical: verticalScale(pv) },
    absolute && { position: 'absolute' },
    top && { top },
    bottom && { bottom },
    left && { left },
    right && { right },
    circle && {
      width: circle,
      height: circle,
      borderRadius: circle / 2,
    },

    row && { flexDirection: 'row' },
    column && { flexDirection: 'column' },
    direction && { flexDirection: direction },
    wrap && { flexWrap: 'wrap' },
    center && { justifyContent: 'center' },
    justifyStart && { justifyContent: 'flex-start' },
    justifyEnd && { justifyContent: 'flex-end' },
    justifyAround && { justifyContent: 'space-around' },
    justifyBetween && { justifyContent: 'space-between' },
    justify && { justifyContent: justify },
    middle && { alignItems: 'center' },
    alignItemsStart && { alignItems: 'flex-start' },
    alignItemsEnd && { alignItems: 'flex-end' },
    alignItems && { alignItems },

    bg && { backgroundColor: bg },
    borderRadius && { borderRadius: moderateScale(borderRadius) },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    opacity && { opacity },
    source && source,
    style && style,
  ];

  if (uri) {
    return (
      <FastImage
        style={styledComponent}
        source={{
          uri,
        }}
        {...rest}
      />
    );
  }

  return (
    <FastImage
      style={styledComponent}
      source={source || defaultImage}
      {...rest}
    />
  );
};

ImageView.propTypes = {
  flex: PropTypes.number,
  m: PropTypes.number,
  mt: PropTypes.number,
  mr: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  mv: PropTypes.number,
  mh: PropTypes.number,
  p: PropTypes.number,
  pt: PropTypes.number,
  pr: PropTypes.number,
  pb: PropTypes.number,
  pl: PropTypes.number,
  pv: PropTypes.number,
  ph: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.number,
  wrap: PropTypes.bool,
  row: PropTypes.bool,
  column: PropTypes.bool,
  direction: PropTypes.string,
  center: PropTypes.bool,
  justifyStart: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  justifyAround: PropTypes.bool,
  justify: PropTypes.string,
  middle: PropTypes.bool,
  alignItemsStart: PropTypes.bool,
  alignItemsEnd: PropTypes.bool,
  alignItems: PropTypes.string,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  bg: PropTypes.string,
  opacity: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object,
  defaultImage: PropTypes.any,
  source: PropTypes.any,
  uri: PropTypes.any,
  circle: PropTypes.number,
  absolute: PropTypes.bool,
  top: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
};

export default ImageView;
