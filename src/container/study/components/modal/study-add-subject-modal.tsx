import {
  View,
  Text,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useEffect } from 'react';
import Modal from 'react-native-modal';
import { isEmpty, pxToPercentage } from '../../../../core/libs/utils';
import { themes } from '../../../../core/themes';
import { CloseIcon } from '../../../../assets/icons';
import { StudyMiniAppTypeAddSubEnum } from '../../constants/study-constants';
import { textStyle } from '../../../../components/text-style';
import { Input } from '../../../../components/input.component';
interface ComponentProps extends ViewProps {
  isVisible?: boolean | undefined;
  title: string;
  value: string;
  onCloseModal?: () => void;
  onSavePress: (value: string, type: string) => void;
  message?: string;
}

export type SubjectMoDalProps = ComponentProps;
const SubjectMoDal: React.FunctionComponent<SubjectMoDalProps> = (props) => {
  const onCloseModal = (): void => {
    if (props.onCloseModal) {
      props.onCloseModal();
    }
  };
  const [valueSubject, setValueSubject] = React.useState<string>('');
  useEffect(() => {
    if (props.isVisible === false) {
      setValueSubject('');
    }
  }, [props.isVisible]);
  const onSavePress = () => {
    Keyboard.dismiss();
    // setValueSubject('');
    props.onSavePress(valueSubject, StudyMiniAppTypeAddSubEnum.Save);
  };
  const onSaveAnContinuePress = () => {
    // setValueSubject('');
    // Keyboard.dismiss();
    props.onSavePress(valueSubject, StudyMiniAppTypeAddSubEnum.SaveAndContinue);
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
          <View style={styles.viewTitleModal}>
            <Text style={styles.txtTitleModal}>{props.title}</Text>
            <TouchableOpacity onPress={onCloseModal} style={styles.btnClose}>
              {CloseIcon(styles.closeIcon)}
            </TouchableOpacity>
          </View>
          <View>
            <Input
              onInputTextChange={() => {}}
              onChangeText={setValueSubject}
              value={valueSubject}
              inputContainerStyle={styles.inputSubject}
            />
          </View>
          <Text style={styles.txtMessage}>{props.message}</Text>
          <View style={styles.viewBtnSave}>
            <TouchableOpacity
              disabled={isEmpty(valueSubject)}
              style={isEmpty(valueSubject) ? styles.btnDisable : styles.btnItem}
              onPress={onSavePress}>
              <Text style={styles.txtTitleBtnSave}>SAVE & DONE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isEmpty(valueSubject)}
              style={isEmpty(valueSubject) ? styles.btnDisable : styles.btnItem}
              onPress={onSaveAnContinuePress}>
              <Text style={styles.txtTitleBtnSave}>SAVE & CONTINUE</Text>
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
    height: pxToPercentage(342),
    backgroundColor: themes['App Theme']['background-color-2'],
    borderTopRightRadius: pxToPercentage(10),
    borderTopLeftRadius: pxToPercentage(10),
  },
  closeIcon: { width: pxToPercentage(14), height: pxToPercentage(14) },
  viewTitleModal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pxToPercentage(22),
    flexDirection: 'row',
    marginBottom: pxToPercentage(28),
  },
  txtTitleModal: {
    fontSize: pxToPercentage(18),
    ...textStyle.montserratMedium,
  },
  btnClose: {
    position: 'absolute',
    right: pxToPercentage(20),
    width: pxToPercentage(40),
    height: pxToPercentage(40),
    justifyContent: 'center',
    alignItems: 'center',
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
  viewBtnSave: {
    alignItems: 'center',
    position: 'absolute',
    bottom: pxToPercentage(20),
    alignSelf: 'center',
  },
  btnItem: {
    backgroundColor: themes['App Theme']['app-txt-color-7'],
    width: pxToPercentage(350),
    height: pxToPercentage(41),
    borderRadius: pxToPercentage(4),
    justifyContent: 'center',
    marginTop: pxToPercentage(8),
  },
  btnDisable: {
    backgroundColor: themes['App Theme']['button-disabled-color'],
    width: pxToPercentage(350),
    height: pxToPercentage(41),
    borderRadius: pxToPercentage(4),
    justifyContent: 'center',
    marginTop: pxToPercentage(8),
  },
  txtTitleBtnSave: {
    textAlign: 'center',
    ...textStyle.montserratMedium,
    fontSize: pxToPercentage(14),
    color: 'white',
  },
  inputSubject: {
    alignSelf: 'center',
    width: pxToPercentage(350),
  },
  viewTxt: {},
  txtMessage: {
    color: 'red',
    fontSize: pxToPercentage(14),
    ...textStyle.montserratMedium,
    marginHorizontal: pxToPercentage(32),
    marginTop: pxToPercentage(10),
  },
});

export default SubjectMoDal;
