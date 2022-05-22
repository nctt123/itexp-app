import React, { useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import SvgComponent from "@assets/svg";
import PropTypes from "prop-types";
import { moderateScale } from "@common/scale";
import { useNavigation } from "@react-navigation/core";
import colors from "@assets/colors";
import { Block, Text, Icon } from "@components/index";
import { useTranslation } from "react-i18next";
import fonts from "@assets/fontFamily";

const HeaderSearch = ({ title, isBack, onChangeText, onClose, value }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isSearch, setIsSearch] = useState(true);
  const refInput = useRef();
  const goBackScreen = () => {
    navigation.goBack();
  };

  const _setIsSearch = (value) => {
    !value && onClose();
    setIsSearch(value);
  };

  const renderSearch = () => (
    <Block
      width="100%"
      bg={colors.gray}
      height={40}
      middle
      borderRadius={16}
      row
    >
      <Icon ml={10} mr={8} xml={SvgComponent.searchSmall} />
      <TextInput
        ref={refInput}
        maxLength={254}
        onChangeText={(value) => onChangeText(value)}
        autoFocus
        style={styles.textInputSearch}
        placeholder={t("searchRightHere")}
        placeholderTextColor={colors.textGrayDark}
        value={value}
      />
    </Block>
  );

  return (
    <Block row middle height={40} mt={8}>
      {isBack && (
        <Icon
          touchable
          mh={16}
          onPress={goBackScreen}
          xml={SvgComponent.back}
        />
      )}
      <Block flex={1} middle center>
        {isSearch ? (
          renderSearch()
        ) : (
          <Text h5 bold>
            {t(title)}
          </Text>
        )}
      </Block>
      {isSearch ? (
        <Icon
          touchable
          mh={16}
          onPress={() => _setIsSearch(false)}
          xml={SvgComponent.close}
        />
      ) : (
        <Icon
          touchable
          xml={SvgComponent.search}
          mh={16}
          onPress={() => _setIsSearch(true)}
        />
      )}
    </Block>
  );
};
const styles = StyleSheet.create({
  textInputSearch: {
    color: colors.white,
    fontSize: moderateScale(16),
    flex: 1,
    fontFamily: fonts.primary,
  },
});
HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
  isBack: PropTypes.bool.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
HeaderSearch.defaultProps = {
  title: "",
  isBack: true,
  onChangeText: () => {},
  onClose: () => {},
};
export default React.memo(HeaderSearch);
