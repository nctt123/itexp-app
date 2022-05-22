import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from '@common/scale';
import colors from '@assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import Loading from './Loading';

const Button = ({
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
  borderRadius,
  borderWidth,
  borderColor,
  justifyStart,
  justifyEnd,
  justifyBetween,
  justifyAround,
  bg,
  opacity,
  shadow,
  shadowColor,
  textColor,
  loading,
  disabled,
  children,
  gradient,
  bblr,
  btlr,
  bbrr,
  btrr,
  ...rest
}) => {
  const styledComponent = [
    {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    flex && { flex },
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
    width && { width: typeof width === 'number' ? scale(width) : width },
    height && { height: verticalScale(height) },
    justifyStart && { justifyContent: 'flex-start' },
    justifyEnd && { justifyContent: 'flex-end' },
    justifyAround && { justifyContent: 'space-around' },
    justifyBetween && { justifyContent: 'space-between' },
    bg && { backgroundColor: bg },
    borderRadius && { borderRadius },
    bblr && { borderBottomLeftRadius: bblr },
    btlr && { borderTopLeftRadius: btlr },
    bbrr && { borderBottomRightRadius: bbrr },
    btrr && { borderTopRightRadius: btrr },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    opacity && { opacity },
    disabled && {
      backgroundColor: colors.disabled,
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
        {loading && <Loading mr={10} />}
        {children}
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styledComponent} disabled={disabled} {...rest}>
      {loading && <Loading mr={10} />}
      {children}
    </TouchableOpacity>
  );
};

Button.propTypes = {
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
  alignItemsStart: PropTypes.bool,
  alignItemsEnd: PropTypes.bool,
  alignItems: PropTypes.string,
  borderRadius: PropTypes.number,
  bblr: PropTypes.number,
  btlr: PropTypes.number,
  bbrr: PropTypes.number,
  btrr: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  bg: PropTypes.string,
  opacity: PropTypes.number,
  shadow: PropTypes.bool,
  shadowColor: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  gradient: PropTypes.bool,
};

export default Button;
