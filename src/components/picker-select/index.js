import React from 'react'
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import {
    Body,
    Block,
    Text,
    Touchable,
    TextInput,
    Button,
} from "@components/index";
import colors from '@assets/colors';

const PickerSelect = ({ items, heightInput, placeholder, ...rest }) => {
    return (
        <Block  >
            <RNPickerSelect
                {...rest}
                items={items}
                placeholder={{ label: placeholder ? placeholder : 'Chọn ...' }}
                style={{
                    viewContainer: {
                        borderRadius: 10,
                        color : 'white',
                        backgroundColor: colors.gray,
                        justifyContent: 'center',
                    },
                    placeholder: {
                        color: 'white',
                        opacity: 0.8,
                        fontSize: 12,
                    },
                    inputAndroid : {
                        color :'white',
                        fontSize : 10
                    }

                }}

            />
        </Block>
    )
}

export default PickerSelect 