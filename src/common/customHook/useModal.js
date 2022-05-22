import React, { useState, useEffect } from 'react';
import { Block, Text, Button, Icon } from '@components/index';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import colors from '@assets/colors';
import SvgComponent from '@assets/svg';
import { useTranslation } from 'react-i18next';

const initConfigModal = {
  type: '',
  title: '',
  content: '',
  okText: '',
  okButton: null,
  cancelText: '',
  cancelButton: null,
  cancelable: true,
  hideCancelBtn: false,
};

const useModal = () => {
  const { t } = useTranslation(['common']);
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState(initConfigModal);

  useEffect(() => setConfig(initConfigModal), []);

  const onCloseModal = () => {
    setVisible(false);
  };

  const onHanderOkButton = () => {
    config?.okButton();
    onCloseModal();
  };

  const onHanderCancelButton = () => {
    config?.cancelButton();
    onCloseModal();
  };

  // TODO
  const withConfigModal = params => {
    setConfig({
      ...params,
      title: params?.title || '',
      content: params?.content || '',
      okText: params?.okText || t('txt_btn_confirm'),
      okButton: params?.okButton || onCloseModal,
      cancelButton: params?.cancelButton || onCloseModal,
    });

    setTimeout(() => {
      setVisible(true);
    }, 100);
  };

  const modal = {
    normal: (params = {}) =>
      withConfigModal({
        ...params,
        okText: params?.okText || t('txt_btn_confirm'),
        cancelText: params?.cancelText || t('txt_btn_close'),
        type: 'normal',
      }),
    error: (params = {}) =>
      params?.content &&
      withConfigModal({
        ...params,
        cancelText: params?.cancelText || t('txt_btn_close'),
        type: 'error',
      }),
    success: (params = {}) =>
      withConfigModal({
        ...params,
        cancelText: params?.cancelText || t('txt_btn_close'),
        type: 'success',
      }),
  };

  const _renderTitle = () => (
    <Block width='100%'>
      {config?.type === 'normal' && (
        <Block center middle>
          <Text bold h4 mt={18} center>
            {config.title || ''}
          </Text>
        </Block>
      )}
      {config?.type === 'success' && (
        <Block center middle>
          <Icon xml={SvgComponent.success} />
          <Text bold h2 mt={18} center>
            {config.title || t('title_success')}
          </Text>
        </Block>
      )}
      {config?.type === 'error' && (
        <Block center middle>
          <Icon xml={SvgComponent.errorBig} />
          <Text bold h2 mt={18} center>
            {config.title || t('title_error')}
          </Text>
        </Block>
      )}
    </Block>
  );

  const _renderContent = () => (
    <>
      {typeof config?.content === 'string' ? (
        <Block row center>
          <Block width={250}>
            <Text medium mt={8} c1 center>
              {config.content}
            </Text>
          </Block>
        </Block>
      ) : (
        config?.content
      )}
    </>
  );

  const _renderBtn = () => (
    <Block mt={24}>
      <Block row center middle>
        {!config.hideCancelBtn && (
          <Button
            mh={8}
            pv={7}
            ph={48}
            bg={colors.gray}
            borderRadius={3}
            onPress={
              config.type === 'normal' ? onHanderCancelButton : onHanderOkButton
            }>
            <Text medium c1>
              {config.cancelText}
            </Text>
          </Button>
        )}
        {config.type === 'normal' && (
          <Button
            mh={8}
            pv={7}
            ph={48}
            gradient
            borderRadius={3}
            onPress={onHanderOkButton}>
            <Text medium c1>
              {config.okText}
            </Text>
          </Button>
        )}
      </Block>
    </Block>
  );

  const contextHolder = (
    <Modal
      isVisible={visible}
      onBackdropPress={config.cancelable && onCloseModal}
      onBackButtonPress={config.cancelable && onCloseModal}
      backdropOpacity={0.6}
      animationIn='fadeIn'
      animationOut='fadeOut'
      style={styles.modal}>
      <Block
        pv={22}
        ph={21}
        width='100%'
        bg={colors.blackPrimary}
        borderRadius={20}>
        {_renderTitle()}
        {_renderContent()}
        {_renderBtn()}
      </Block>
    </Modal>
  );

  return [modal, contextHolder, onCloseModal];
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default useModal;
