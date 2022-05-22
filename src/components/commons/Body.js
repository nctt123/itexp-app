import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import colors from '@assets/colors';
import { moderateScale, scale, verticalScale } from '@common/scale';
import { useSelector } from 'react-redux';
import { showMiniPlayerSelector } from '@modules/song/selectors';
import LoadingOverlay from './LoadingOverlay';

const Body = ({
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
  flex,
  center,
  bg,
  loading,
  loadingLabel,
  keyboardAvoid,
  scroll,
  children,
  ...rest
}) => {
  const headerHeight = useHeaderHeight();

  const containner = [
    {
      flex: 1,
      backgroundColor: bg || colors.bg,
      paddingBottom: 0,
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
    center && {
      alignItems: 'center',
      justifyContent: 'center',
    },
  ];

  let body = (
    <View style={containner} {...rest}>
      {children}
    </View>
  );

  if (scroll) {
    body = (
      <ScrollView
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={containner}
        {...rest}>
        {children}
      </ScrollView>
    );
  }
  if (keyboardAvoid) {
    body = (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={containner} {...rest}>
          {children}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }

  if (scroll && keyboardAvoid) {
    body = (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={headerHeight}
          style={containner}
          {...rest}>
          <ScrollView
            keyboardDismissMode='interactive'
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            {...rest}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }

  if (loading) {
    return (
      <>
        {body}
        <LoadingOverlay loading={!!loading} title={loadingLabel || ''} />
      </>
    );
  }

  return body;
};

export default Body;
