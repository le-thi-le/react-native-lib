import { textStyle } from '../../../../components';
import { pxToPercentage } from '../../../../core/libs/utils';
import { themes } from '../../../../core/themes';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {
  CheckedBoxIcon,
  CloseIcon3,
  iconStepFour,
  iconStepOne,
  iconStepThree,
  iconStepTwo,
  UnCheckedBoxIcon,
} from '../../../../assets/icons';
import LinearGradient from 'react-native-linear-gradient';

interface SuggestionProps {
  isShow: boolean;
  onClose: (isAccept: boolean) => void;
  onChangeCheckBox: (value: boolean) => void;
}
type Props = SuggestionProps;
export const SuggestionModal: React.FunctionComponent<Props> = (props) => {
  const [isSelected, setSelection] = React.useState<boolean>(false);
  const onCloseModalNoneAccept = () => {
    props.onClose(isSelected);
  };
  return (
    <Modal
      isVisible={props.isShow}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={1}
      animationOutTiming={1}
      backdropOpacity={0}
      statusBarTranslucent
      backdropTransitionInTiming={1}
      backdropTransitionOutTiming={1}
      style={styles.container}
      onBackdropPress={onCloseModalNoneAccept}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.3, 0.4, 0.7]}
        colors={['#8ADCE7', '#5F82A9', '#5975A0', '#3C3775']}
        style={styles.imgBackground}>
        <View>
          <TouchableOpacity
            onPress={onCloseModalNoneAccept}
            style={styles.btnIconClose}>
            {CloseIcon3(styles.iconClose)}
          </TouchableOpacity>
          <Text style={styles.txtTitle}>
            For best results, follow these guidelines for each photo:
          </Text>
          <View style={styles.viewStep}>
            {iconStepOne(styles.imgStep)}
            <Text style={styles.txtContentStep}>
              Ensure subject is standing within the body outline.
            </Text>
          </View>
          <View style={styles.viewStep}>
            {iconStepTwo(styles.imgStep)}
            <Text style={styles.txtContentStep}>
              Take photos in a well-lit area; however, avoid direct overhead
              light (including sunlight) that could distort the subject’s skin
              tone.
            </Text>
          </View>
          <View style={styles.viewStep}>
            {iconStepThree(styles.imgStep)}
            <Text style={styles.txtContentStep}>
              Have subject remove any makeup, skincare products, and/or jewelry.
            </Text>
          </View>
          <View style={styles.viewStep}>
            {iconStepFour(styles.imgStep)}
            <Text style={styles.txtContentStep}>
              Ensure device is not held at an angle. Hold device level with the
              subject.
            </Text>
          </View>
        </View>
        <View style={styles.viewChecked}>
          <TouchableOpacity
            style={styles.btnChecked}
            activeOpacity={0.75}
            onPress={() => {
              setSelection(!isSelected);
            }}>
            {isSelected
              ? CheckedBoxIcon(styles.iconCheckbox)
              : UnCheckedBoxIcon(styles.iconCheckbox)}
          </TouchableOpacity>
          <Text style={styles.txtCheckBox}>
            Please do not show this message again
          </Text>
        </View>
      </LinearGradient>
    </Modal>
  );
};
const styles = StyleSheet.create({
  imgBackground: {
    width: pxToPercentage(350),
    height: pxToPercentage(600),
    borderRadius: pxToPercentage(10),
    opacity: 0.98,
  },
  btnIconClose: {
    position: 'absolute',
    top: pxToPercentage(20),
    right: pxToPercentage(13),
    width: pxToPercentage(24),
    height: pxToPercentage(24),
  },
  iconClose: {
    width: pxToPercentage(14),
    height: pxToPercentage(14),
    color: 'white',
  },
  btnChecked: { marginRight: pxToPercentage(11) },
  txtTitle: {
    ...textStyle.montserratSemiBold,
    fontSize: pxToPercentage(18),
    marginTop: pxToPercentage(53),
    marginHorizontal: pxToPercentage(40),
    marginBottom: pxToPercentage(40),
    color: 'white',
  },
  txtCheckBox: {
    ...textStyle.montserratLight,
    fontSize: pxToPercentage(14),
    color: 'white',
    flex: 1,
  },
  txtContentStep: {
    ...textStyle.montserratLight,
    fontSize: pxToPercentage(16),
    color: 'white',
    flex: 1,
  },
  viewStep: {
    flexDirection: 'row',
    marginHorizontal: pxToPercentage(25),
    marginBottom: pxToPercentage(16),
  },
  container: {
    alignItems: 'center',
  },
  viewContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: pxToPercentage(8),
    paddingHorizontal: pxToPercentage(26),
    paddingVertical: pxToPercentage(16),
    borderWidth: pxToPercentage(1.4),
    borderColor: themes['App Theme']['app-txt-color-1'],
  },
  iconCheckbox: {
    width: pxToPercentage(32),
    height: pxToPercentage(32),
  },
  viewChecked: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToPercentage(50),
    marginHorizontal: pxToPercentage(24),
  },
  txtMessage: {
    textAlign: 'center',
    ...textStyle.montserratLight,
    fontSize: 12,
    marginVertical: pxToPercentage(6),
  },
  txtLabelPopup: {
    textAlign: 'center',
    ...textStyle.montserratMedium,
    fontSize: pxToPercentage(18),
    marginBottom: pxToPercentage(10),
    marginTop: pxToPercentage(8),
  },
  imgIconPopup: { height: 60, width: 60, alignSelf: 'center' },
  imgStep: {
    width: pxToPercentage(26),
    height: pxToPercentage(26),
    marginRight: pxToPercentage(10),
    alignSelf: 'flex-start',
    marginTop: pxToPercentage(5),
  },
});
