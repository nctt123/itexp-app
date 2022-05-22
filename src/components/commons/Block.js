import React from 'react';
import { View } from 'react-native';
import { scale, verticalScale, moderateScale } from '@common/scale';
import PropTypes from 'prop-types';
import colors from '@assets/colors';
import LinearGradient from 'react-native-linear-gradient';

const Block = ({
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
  justifyEvenly,
  justify,
  middle,
  alignItemsStart,
  alignItemsEnd,
  alignItems,
  alignSelfCenter,
  borderRadius,
  borderWidth,
  borderTopRightRadius,
  borderTopLeftRadius,
  borderColor,
  bg,
  opacity,
  shadow,
  shadowColor,
  borderBottom,
  absolute,
  relative,
  top,
  left,
  bottom,
  right,
  zIndex,
  circle,
  gradient,
  children,
  style,
  ...rest
}) => {
  const styledComponent = [
    flex && { flex },
    width && { width: typeof width === 'number' ? scale(width) : width },
    height && {
      height: typeof height === 'number' ? verticalScale(height) : height,
    },

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
    justifyEvenly && { justifyContent: 'space-evenly' },
    justify && { justifyContent: justify },
    middle && { alignItems: 'center' },
    alignItemsStart && { alignItems: 'flex-start' },
    alignItemsEnd && { alignItems: 'flex-end' },
    alignItems && { alignItems },
    alignSelfCenter && { alignSelf: 'center' },

    borderTopRightRadius && { borderTopRightRadius },
    borderTopLeftRadius && { borderTopLeftRadius },
    bg && { backgroundColor: bg },
    borderRadius && { borderRadius },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    opacity && { opacity },
    borderBottom && {
      borderBottomWidth: 2,
      borderBottomColor: colors.grayLight,
    },
    absolute && { position: 'absolute' },
    relative && { position: 'relative' },
    (top || top === 0) && { top },
    (left || left === 0) && { left },
    (bottom || bottom === 0) && { bottom },
    (right || right === 0) && { right },
    zIndex && { zIndex },
    shadow && {
      shadowColor: colors?.shadowColor || shadowColor,
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 5,
      shadowRadius: 5,
      elevation: 1,
    },
    style && style,
  ];
  return gradient ? (
    <View {...rest}>
      <LinearGradient
        {...rest}
        style={styledComponent}
        colors={[colors.startColorSong, colors.endColorSong]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        {children}
      </LinearGradient>
    </View>
  ) : (
    <View style={styledComponent} {...rest}>
      {children}
    </View>
  );
};

Block.propTypes = {
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
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrap: PropTypes.bool,
  row: PropTypes.bool,
  column: PropTypes.bool,
  direction: PropTypes.string,
  center: PropTypes.bool,
  justifyStart: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  justifyAround: PropTypes.bool,
  justifyEvenly: PropTypes.bool,
  justify: PropTypes.string,
  middle: PropTypes.bool,
  alignItemsStart: PropTypes.bool,
  alignItemsEnd: PropTypes.bool,
  alignItems: PropTypes.string,
  alignSelfCenter: PropTypes.bool,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderColor: PropTypes.string,
  bg: PropTypes.string,
  opacity: PropTypes.number,
  shadow: PropTypes.bool,
  shadowColor: PropTypes.string,
  borderBottom: PropTypes.bool,
  absolute: PropTypes.bool,
  relative: PropTypes.bool,
  top: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
  zIndex: PropTypes.number,
  circle: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.any,
  loading: PropTypes.bool,
  gradient: PropTypes.bool,
};

export default Block;