import React, { useContext } from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components';

import { PickerTitle } from './styles';

interface PickerProps extends PickerSelectProps {
  titleInfo?: string;
  placeholderLabel: string;
  placeholderValue?: string;
  pickerError?: boolean;
  iconName?: string;
}

const Picker: React.FC<PickerProps> = ({
  titleInfo,
  placeholderLabel,
  placeholderValue = null,
  pickerError = false,
  iconName = 'edit',
  ...rest
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <>
      {titleInfo ? (
        <PickerTitle isErrored={pickerError}>{titleInfo}</PickerTitle>
      ) : undefined}
      <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        placeholder={{
          label: `${placeholderLabel}`,
          value: `${placeholderValue}`,
        }}
        Icon={() => (
          <Feather name={iconName} size={20} color={colors.lineWhite} />
        )}
        style={{
          placeholder: {
            fontFamily: 'Archivo_400Regular',
            fontSize: 14,
            color: `${pickerError ? colors.warnColor : colors.textBase}`,
          },
          inputAndroidContainer: {
            height: 40,
            backgroundColor: colors.boxFooter,
            borderWidth: 1,
            borderColor: `${pickerError ? colors.warnColor : colors.lineWhite}`,
            borderRadius: 8,
            paddingHorizontal: 18,
            marginVertical: 4,
            marginHorizontal: 18,
            justifyContent: 'center',
          },
          inputIOSContainer: {
            height: 40,
            backgroundColor: colors.boxFooter,
            borderWidth: 1,
            borderColor: `${pickerError ? colors.warnColor : colors.lineWhite}`,
            borderRadius: 8,
            paddingHorizontal: 18,
            marginVertical: 4,
            marginHorizontal: 18,
            justifyContent: 'center',
          },
          inputAndroid: {
            color: `${pickerError ? colors.warnColor : colors.textBase}`,
          },
          inputIOS: {
            color: `${pickerError ? colors.warnColor : colors.textBase}`,
          },
          iconContainer: {
            marginRight: 18,
          },
        }}
        {...rest}
      />
    </>
  );
};

export default Picker;
