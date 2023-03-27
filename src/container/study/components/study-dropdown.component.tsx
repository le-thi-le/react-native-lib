import { themes } from '../../../core/themes';
import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import I18n from '../../../assets/i18n';
import { ArrowDownIcon } from '../../../assets/icons';
import { textStyle } from '../../../components';
import { pxToPercentage } from '../../../core/libs/utils';
import { DropdownModalComponent } from './modal/study-dropdown-modal';
import { DropdownStudyItemModel } from '../models/study.model';
import { DropdownValue } from '../models/dropdown.model';

interface ComponentProps extends TouchableOpacityProps {
  value: DropdownValue | undefined;
  onChange: (data: DropdownValue) => void;
  listItem: DropdownValue[];
}

export type DropDownListProps = ComponentProps;

export const DropDownList: React.FunctionComponent<DropDownListProps> = (
  props,
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    onDataChange({ key: '', value: 'All' });
  }, []);

  const onDataChange = (item: DropdownStudyItemModel) => {
    props.onChange(item);
  };

  const getTitle = () => {
    if (props.value?.value) {
      return ` ${props.value.value}`;
    }
    return '';
  };

  const { ...restProps } = props;

  return (
    <React.Fragment>
      <TouchableOpacity
        activeOpacity={0.75}
        {...restProps}
        style={[styles.container, props.style]}
        onPress={() => setIsVisible(true)}>
        <Text style={[styles.txtTitle]}>{getTitle()}</Text>
        {ArrowDownIcon(styles.iconArrowDown)}
      </TouchableOpacity>
      <DropdownModalComponent
        isVisible={isVisible}
        title={I18n.t('auth.yourCountry')}
        value={props.value?.value}
        options={[
          ...props.listItem.map((item) => ({
            ...item,
            key: `${item.key}`,
          })),
        ]}
        onCloseModal={() => setIsVisible(false)}
        onDataChange={onDataChange}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: pxToPercentage(10),
    height: pxToPercentage(41),
    borderColor: themes['App Theme']['input-border-color'],
    borderWidth: pxToPercentage(0.5),
    width: pxToPercentage(250),
    borderRadius: pxToPercentage(5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtTitle: {
    fontSize: pxToPercentage(16),
    color: themes['App Theme']['main-text-color-2'],
    ...textStyle.montserratRegular,
  },
  iconArrowDown: {
    marginLeft: pxToPercentage(5),
    width: pxToPercentage(15),
    height: pxToPercentage(15) * (37 / 64),
    tintColor: 'black',
    position: 'absolute',
    right: pxToPercentage(20),
  },
});
