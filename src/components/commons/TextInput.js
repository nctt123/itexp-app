import React, { forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Block, Text, Icon } from '@components/index';
import colors from '@assets/colors';
import { verticalScale } from '@common/scale';
import fonts from '@assets/fontFamily';

const Input = (
  {
    m,
    mt,
    mr,
    mb,
    ml,
    mh,
    mv,
    label,
    required,
    description,
    disabled,
    loading,
    iconLeft,
    iconRight,
    iconRightPress,
    error,
    errorMessage,
    height,
    multiline,
    fontSize,
    success,
    style,
    ...rest
  },
  ref,
) => {
  const _renderLabel = () =>
    label && (
      <Text extraBold c1 mb={10} ml={4}>
        {label}
        {required && <Text color={colors.orange}>*</Text>}
      </Text>
    );

  const _renderIconLeft = () => iconLeft && <Icon xml={iconLeft} mr={10} />;

  const _renderIconRight = () =>
    iconRight && (
      <Block ml={5}>
        {typeof iconRight === 'string' ? (
          <Icon
            xml={iconRight}
            touchable={iconRightPress}
            onPress={iconRightPress}
          />
        ) : (
          iconRight
        )}
      </Block>
    );

  const _renderTextInput = () => {
    const textInputProps = {
      ref,
      editable: !disabled,
      placeholderTextColor: 'white',
      multiline,
      ...rest,
    };

    const styledTextInput = [
      styles.textInput,
      fontSize ? { fontSize } : { fontSize: 16 },
      height
        ? { height: verticalScale(height) }
        : { height: verticalScale(40) },
      multiline && { paddingTop: 15, textAlignVertical: 'top' },
    ];
    return <TextInput style={styledTextInput} {...textInputProps} />;
  };

  const _renderDescription = () => {
    if (error) {
      return (
        <Text c2 color={colors.error} medium ml={3} mt={8}>
          {errorMessage}
        </Text>
      );
    }

    if (description) {
      return (
        <Text c2 mt={5}>
          {description}
        </Text>
      );
    }
    return null;
  };

  const styledWrapperContainer = {
    m,
    mt,
    mr,
    mb,
    ml,
    mh,
    mv,
  };

  const styledWrapperInput = [
    styles.container,
    height ? { height: verticalScale(height) } : { height: verticalScale(50) },
    disabled && styles.disabled,
    error && styles.error,
  ];

  return (
    <Block {...styledWrapperContainer} style={style && style}>
      {_renderLabel()}
      <Block row middle style={[styledWrapperInput, { paddingHorizontal: 16 }]}>
        {_renderIconLeft()}
        {_renderTextInput()}
        {_renderIconRight()}
      </Block>
      {_renderDescription()}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.gray,
    borderRadius: 10,
  },
  error: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: colors.grayLight,
  },

  textInput: {
    margin: 0,
    padding: 0,
    flex: 1,
    color: 'white',
    fontFamily: fonts.primaryMedium,
  },
});

// Input.propTypes = {
//   m: PropTypes.number,
//   mt: PropTypes.number,
//   mr: PropTypes.number,
//   mb: PropTypes.number,
//   ml: PropTypes.number,
//   mv: PropTypes.number,
//   mh: PropTypes.number,
//   label: PropTypes.string,
//   required: PropTypes.bool,
//   description: PropTypes.string,
//   disabled: PropTypes.bool,
//   loading: PropTypes.bool,
//   iconLeft: PropTypes.any,
//   iconRight: PropTypes.any,
//   iconRightOnPress: PropTypes.func,
//   type: PropTypes.string,
//   error: PropTypes.string,
//   success: PropTypes.bool,
//   onFocus: PropTypes.func,
//   onBlur: PropTypes.func,
//   style: PropTypes.object,
// };

export default forwardRef(Input);
