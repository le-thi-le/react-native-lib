import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ViewProps,
  FlatList,
  StyleSheet,
} from 'react-native';
import { CheckedIcon } from '../../../../assets/icons';
import Modal from 'react-native-modal';
import { pxToPercentage } from '../../../../core/libs/utils';
import { themes } from '../../../../core/themes';
import { textStyle } from '../../../../components';
import { DropdownStudyItemModel } from '../../models/study.model';

interface ComponentProps extends ViewProps {
  isVisible?: boolean | undefined;
  title: string;
  value: string | undefined;
  options: DropdownStudyItemModel[];
  onDataChange?: (value: DropdownStudyItemModel) => void;
  onCloseModal?: () => void;
}

export type DropdownModalProps = ComponentProps;

export const DropdownModalComponent: React.FunctionComponent<
  DropdownModalProps
> = (props) => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const onItemPress = (value: DropdownStudyItemModel): void => {
    if (props.onDataChange) {
      props.onDataChange(value);
      onCloseModal();
    }
    onCloseModal();
  };

  const onCloseModal = (): void => {
    if (props.onCloseModal) {
      setKeyword(undefined);
      props.onCloseModal();
    }
  };

  const getDataByKeyword = () => {
    if (keyword) {
      return props.options.filter((item) =>
        `${item.key}${item.value}`
          .toLowerCase()
          .includes(keyword.toLocaleLowerCase()),
      );
    }

    return props.options;
  };

  return (
    <React.Fragment>
      <Modal
        isVisible={props.isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={200}
        animationOutTiming={300}
        avoidKeyboard={false}
        backdropOpacity={0.4}
        onBackdropPress={onCloseModal}
        style={styles.modalContainer}>
        <View style={styles.viewBox}>
          <FlatList
            data={getDataByKeyword()}
            extraData={props.options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <React.Fragment>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.btnItem}
                    onPress={() => {
                      onItemPress(item);
                    }}>
                    <Text numberOfLines={1} style={styles.txtTitle}>
                      {item?.value ?? ''}
                    </Text>
                    {props.value === item.value &&
                      CheckedIcon(styles.iconCheck)}
                  </TouchableOpacity>
                  {index !== props.options.length && (
                    <View style={styles.viewHr} />
                  )}
                </React.Fragment>
              );
            }}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </Modal>
    </React.Fragment>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: pxToPercentage(0),
  },
  viewBox: {
    paddingVertical: pxToPercentage(20),
    width: pxToPercentage(350),
    height: pxToPercentage(470),
    backgroundColor: themes['App Theme']['background-color-2'],
    borderRadius: pxToPercentage(10),
  },
  viewGrabber: {
    alignSelf: 'center',
    width: pxToPercentage(36),
    height: pxToPercentage(5),
    borderRadius: pxToPercentage(2.5),
    marginTop: pxToPercentage(8.5),
    backgroundColor: themes['App Theme']['hr-color'],
  },
  viewTitleModal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pxToPercentage(4),
  },
  txtTitleModal: {
    fontSize: pxToPercentage(16),
    ...textStyle.montserratBold,
  },
  btnClose: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: pxToPercentage(16),
  },
  iconClose: {
    width: pxToPercentage(20),
    height: pxToPercentage(20),
    tintColor: themes['App Theme']['modal-close-icon-color'],
  },
  txtTitle: {
    flex: 1,
    fontSize: pxToPercentage(17),
    ...textStyle.montserratRegular,
  },
  viewSearchInput: {
    paddingHorizontal: pxToPercentage(16),
    paddingBottom: pxToPercentage(10),
    paddingTop: pxToPercentage(10),
  },
  viewLine: {
    height: pxToPercentage(1),
    backgroundColor: themes['App Theme']['hr-color'],
    marginTop: pxToPercentage(20),
  },
  viewHr: {
    height: pxToPercentage(1),
    backgroundColor: themes['App Theme']['hr-color'],
  },
  flatListContainer: {
    paddingLeft: pxToPercentage(16),
    paddingBottom: pxToPercentage(64),
  },
  btnItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: pxToPercentage(44),
    paddingRight: pxToPercentage(16),
  },
  iconCheck: {
    width: pxToPercentage(18.45),
    height: pxToPercentage(18.45),
  },
});
