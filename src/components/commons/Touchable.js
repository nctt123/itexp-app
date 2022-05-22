import React from 'react';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from '@common/scale';
import PropTypes, { number } from 'prop-types';
import colors from '@assets/colors';
import LinearGradient from 'react-native-linear-gradient';

const Touchable = ({
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
  alignSelfCenter,
  borderRadius,
  borderWidth,
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
  children,
  style,
  disabled,
  gradient,
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
    alignSelfCenter && { alignSelf: 'center' },
    circle && {
      width: circle,
      height: circle,
      borderRadius: circle / 2,
    },

    absolute && { position: 'absolute' },
    relative && { position: 'relative' },
    (top || top === 0) && { top },
    (left || left === 0) && { left },
    (bottom || bottom === 0) && { bottom },
    (right || right === 0) && { right },
    zIndex && { zIndex },

    bg && { backgroundColor: bg },
    borderRadius && { borderRadius: moderateScale(borderRadius) },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    borderBottom && {
      borderBottomWidth: 2,
      borderBottomColor: colors.grayLight,
    },
    opacity && { opacity },
    borderBottom && {
      borderBottomWidth: 1,
      borderBottomColor: colors.grayLight,
    },
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
    <TouchableOpacity disabled={disabled} {...rest}>
      <LinearGradient
        {...rest}
        style={styledComponent}
        colors={[
          `${disabled ? colors.disabled : colors.startColorSong}`,
          `${disabled ? colors.disabled : colors.endColorSong}`,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styledComponent} {...rest} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = {
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
  alignSelfCenter: PropTypes.bool,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  bg: PropTypes.string,
  opacity: PropTypes.number,
  shadow: PropTypes.bool,
  shadowColor: PropTypes.string,
  borderBottom: PropTypes.any,
  absolute: PropTypes.bool,
  relative: PropTypes.bool,
  top: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
  zIndex: PropTypes.number,
  circle: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object,
  index: PropTypes.string,
  disable: PropTypes.bool,
  gradient: PropTypes.bool,
};

export default Touchable;
