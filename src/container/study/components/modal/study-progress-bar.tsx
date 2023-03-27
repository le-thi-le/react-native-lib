import {
  View,
  Text,
  ViewProps,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { pxToPercentage } from '../../../../core/libs/utils';
import { themes } from '../../../../core/themes';
import {  textStyle } from '../../../../components';
interface ComponentProps extends ViewProps {
  isVisible?: boolean | undefined;
  titleMessage: string;
  value: number;
}

export type ProgressBarStudyProps = ComponentProps;
const ProgressBarStudy: React.FunctionComponent<ProgressBarStudyProps> = (
  props,
) => {
  return (
    <React.Fragment>
      <Modal
        isVisible={props.isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={1500}
        avoidKeyboard={false}
        backdropOpacity={0.2}
        style={styles.modalContainer}>
        <View style={styles.viewBox}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: pxToPercentage(20),
            }}>
            <View>
              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{
                    width: '100%',
                    height: pxToPercentage(10),
                    marginVertical: pxToPercentage(10),
                    borderRadius: pxToPercentage(5),
                    borderColor: 'grey',
                    borderWidth: pxToPercentage(0.8),
                  }}
                />
                <View
                  style={{
                    width: props.value + '%' ? props.value + '%' : 0,
                    height: pxToPercentage(10),
                    marginVertical: pxToPercentage(10),
                    borderRadius: pxToPercentage(5),
                    backgroundColor: '#f0ad4e',
                    position: 'absolute',
                    bottom: pxToPercentage(10),
                  }}
                />
                <View
                  style={{
                    width: props.value + '%' ? props.value + '%' : 0,
                    height: pxToPercentage(10),
                    bottom: pxToPercentage(10),
                  }}></View>
              </View>
            </View>
          </View>
          <View style={styles.viewTitleModal}>
            <Text style={styles.txtTitleModal}>{props.titleMessage}</Text>
            {/* {props.value === 100 ? (
              <TouchableOpacity
                style={styles.btnItemCancel}
                onPress={onCloseModal}>
                <Text style={styles.txtTitleBtnCancel}>Close</Text>
              </TouchableOpacity>
            ) : null} */}
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
    height: pxToPercentage(100),
    backgroundColor: themes['App Theme']['background-color-2'],
    borderTopRightRadius: pxToPercentage(10),
    borderTopLeftRadius: pxToPercentage(10),
  },
  closeIcon: { width: pxToPercentage(14), height: pxToPercentage(14) },
  viewTitleModal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: pxToPercentage(33),
  },
  txtTitleModal: {
    fontSize: pxToPercentage(16),
    ...textStyle.montserratRegular,
    textAlign: 'center',
    marginBottom: pxToPercentage(7),
  },
  txtSubTitleModal: {
    fontSize: pxToPercentage(14),
    ...textStyle.montserratRegular,
    textAlign: 'center',
    width: pxToPercentage(267),
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
    backgroundColor: themes['App Theme']['background-color-2'],
    width: pxToPercentage(100),
    height: pxToPercentage(41),
    borderWidth: pxToPercentage(1),
    borderColor: themes['App Theme']['app-txt-color-7'],
    borderRadius: pxToPercentage(4),
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: pxToPercentage(20),
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
    color: themes['App Theme']['app-txt-color-7'],
  },
  inputSubject: {
    alignSelf: 'center',
    width: pxToPercentage(350),
  },
});

export default ProgressBarStudy;
