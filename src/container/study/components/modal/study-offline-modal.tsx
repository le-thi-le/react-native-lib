import {
  View,
  Text,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { pxToPercentage } from '../../../../core/libs/utils';
import { themes } from '../../../../core/themes';
import { textStyle } from '../../../../components';
interface ComponentProps extends ViewProps {
  isVisible?: boolean | undefined;
  title: string;
  value: string | undefined;
  onCloseModal?: () => void;
  onPressYes: () => void;
  subTitle: string;
}

export type OfflineModeModalProps = ComponentProps;
const OfflineModeModal: React.FunctionComponent<OfflineModeModalProps> = (
  props,
) => {
  const onCloseModal = (): void => {
    if (props.onCloseModal) {
      props.onCloseModal();
    }
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
        style={styles.modalContainer}>
        <View style={styles.viewBox}>
          <View style={styles.viewTitleModal}>
            <Text style={styles.txtTitleModal}>{props.title}</Text>
            <Text style={styles.txtSubTitleModal}>{props.subTitle}</Text>
          </View>
          <View style={styles.viewBtnSave}>
            <TouchableOpacity
              style={styles.btnItem}
              onPress={() => {
                onCloseModal();
                props.onPressYes();
              }}>
              <Text style={styles.txtTitleBtnSave}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnItemCancel}
              onPress={onCloseModal}>
              <Text style={styles.txtTitleBtnCancel}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginVertical: pxToPercentage(0),
  },
  viewBox: {
    width: pxToPercentage(414),
    height: pxToPercentage(275),
    backgroundColor: themes['App Theme']['background-color-2'],
    borderRadius: pxToPercentage(10),
  },
  closeIcon: { width: pxToPercentage(14), height: pxToPercentage(14) },
  viewTitleModal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pxToPercentage(24),
    marginBottom: pxToPercentage(13),
  },
  txtTitleModal: {
    fontSize: pxToPercentage(18),
    ...textStyle.montserratRegular,
    textAlign: 'center',
    marginBottom: pxToPercentage(7),
  },
  txtSubTitleModal: {
    fontSize: pxToPercentage(16),
    ...textStyle.montserratRegular,
    textAlign: 'center',
    width: pxToPercentage(280),
  },
  btnClose: { position: 'absolute', right: pxToPercentage(40) },
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
  viewBtnSave: { alignItems: 'center' },
  btnItem: {
    backgroundColor: themes['App Theme']['app-txt-color-7'],
    width: pxToPercentage(350),
    height: pxToPercentage(41),
    borderRadius: pxToPercentage(4),
    justifyContent: 'center',
    marginVertical: pxToPercentage(12),
  },
  btnItemCancel: {
    backgroundColor: themes['App Theme']['app-txt-color-7'],
    width: pxToPercentage(350),
    height: pxToPercentage(41),
    borderWidth: pxToPercentage(1),
    borderColor: themes['App Theme']['app-txt-color-7'],
    borderRadius: pxToPercentage(4),
    justifyContent: 'center',
  },
  txtTitleBtnSave: {
    textAlign: 'center',
    ...textStyle.montserratMedium,
    fontSize: pxToPercentage(14),
    color: themes['App Theme']['background-color-2'],
  },
  txtTitleBtnCancel: {
    textAlign: 'center',
    ...textStyle.montserratMedium,
    fontSize: pxToPercentage(14),
    color: themes['App Theme']['background-color-2'],
  },
  inputSubject: {
    alignSelf: 'center',
    width: pxToPercentage(350),
  },
});

export default OfflineModeModal;
