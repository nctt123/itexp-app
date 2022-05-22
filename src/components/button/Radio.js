import React from 'react';
import { Button, Icon } from '@components/index';
import PropTypes from 'prop-types';
import SvgComponent from '@assets/svg';

const Radio = ({ checked, ...rest }) => (
  <Button middle center {...rest}>
    {!checked ? (
      <Icon xml={SvgComponent.radio} />
    ) : (
      <Icon xml={SvgComponent.radioChecked} />
    )}
  </Button>
);

Radio.propTypes = {
  checked: PropTypes.bool,
};

export default Radio;
