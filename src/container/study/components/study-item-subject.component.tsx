import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { themes } from '../../../core/themes';
import { pxToPercentage } from '../../../core/libs/utils';
import { textStyle } from '../../../components';
import { CloseIcon4 } from '../../../assets/icons';
import { dateToDDmmYYYYhhMMssFormatter2 } from '../../../core/libs/formatters';
import { PatientStatusEnum } from '../constants/study-constants';
import { SubjectModel } from '../models/subject/subject.model';

interface ComponentProps {
  item: SubjectModel;
  isSelected: boolean;
  onPress: () => void;
}

export type SubjectProps = ComponentProps;
export const SubjectItem: React.FunctionComponent<SubjectProps> = (props) => {
  const getStatusLabel = () => {
    switch (props.item.patientStatus) {
      case PatientStatusEnum.Offline:
        return (
          <Text style={styles.txtStatusFail}>
            Pull/swipe down to refresh and sync with server
          </Text>
        );
      case PatientStatusEnum.UploadFail:
        return (
          <Text style={styles.txtStatusFail}>
            Pull/swipe down to refresh and sync with server
          </Text>
        );
      case PatientStatusEnum.UploadDone:
        return (
          <Text style={styles.txtStatus}>
            {props.item.todayVisitUploadedAt ? (
              <Text style={styles.txtDateTime}>
                {'Last successful upload: ' +
                  dateToDDmmYYYYhhMMssFormatter2(
                    new Date(props.item.todayVisitUploadedAt),
                  )}
              </Text>
            ) : null}
          </Text>
        );
      case PatientStatusEnum.CannotCreate:
        return (
          <Text style={styles.txtStatusFail}>
            Upload fails due to maximum subjects
          </Text>
        );
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={
        props.isSelected ? styles.itemContainerSelected : styles.itemContainer
      }
      onPress={props.onPress}>
      <View style={styles.bodyContainer}>
        <View style={styles.viewID}>
          <Text style={styles.textID}>ID: </Text>
          <Text style={styles.textID}>{props.item.patientId}</Text>
        </View>
        {getStatusLabel()}
        {props.item.patientStatus === PatientStatusEnum.UploadFail ||
        props.item.patientStatus === PatientStatusEnum.Offline ? (
          <View style={styles.viewIcon}>{CloseIcon4(styles.iconX)}</View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainerSelected: {
    backgroundColor: themes['App Theme']['background-color-8'],
    marginVertical: pxToPercentage(8),
    borderRadius: pxToPercentage(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    minHeight: pxToPercentage(65),
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    paddingVertical: pxToPercentage(10),
    width: pxToPercentage(414 - 32),
  },
  itemContainer: {
    backgroundColor: themes['App Theme']['background-color-2'],
    marginVertical: pxToPercentage(8),
    borderRadius: pxToPercentage(8),
    paddingVertical: pxToPercentage(10),
    minHeight: pxToPercentage(65),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
    width: pxToPercentage(414 - 32),
  },
  viewX: {
    position: 'absolute',
    right: pxToPercentage(100),
    top: pxToPercentage(1),
  },
  iconX: {
    width: pxToPercentage(15),
  },
  viewItemContentTail: {
    backgroundColor: themes['App Theme']['app-txt-color-7'],
    width: pxToPercentage(10),
    minHeight: pxToPercentage(84),
    borderBottomRightRadius: pxToPercentage(10),
    borderTopRightRadius: pxToPercentage(10),
  },
  headerContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  txtStatus: {
    fontSize: pxToPercentage(16),
    ...textStyle.montserratRegular,
  },
  txtStatusFail: {
    fontSize: pxToPercentage(16),
    ...textStyle.montserratMedium,
    color: 'red',
    marginRight: pxToPercentage(15),
  },
  txtDateTime: {
    ...textStyle.montserratRegular,
    color: themes['App Theme']['main-text-color-3'],
    fontSize: pxToPercentage(16),
  },
  bodyContainer: {
    width: pxToPercentage(350),
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  avatar: {
    width: pxToPercentage(48),
    height: pxToPercentage(48),
    borderRadius: pxToPercentage(24),
    resizeMode: 'stretch',
    marginRight: pxToPercentage(24),
    alignSelf: 'center',
    marginLeft: pxToPercentage(15),
  },
  viewID: {
    minHeight: pxToPercentage(20),
    flexDirection: 'row',
  },
  textID: {
    ...textStyle.montserratSemiBold,
    fontSize: pxToPercentage(18),
  },
  numberOfCasesTitle: {
    ...textStyle.montserratRegular,
    fontSize: pxToPercentage(14),
    marginTop: pxToPercentage(5),
  },
  numberOfCasesValue: {
    color: themes['App Theme']['app-txt-color-8'],
    fontSize: pxToPercentage(14),
    ...textStyle.montserratBold,
  },
  viewIcon: { position: 'absolute', right: pxToPercentage(10) },
});
