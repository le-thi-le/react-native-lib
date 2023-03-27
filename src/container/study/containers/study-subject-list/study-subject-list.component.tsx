import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { textStyle, ViewContainer } from '../../../../components';
import { themes } from '../../../../core/themes';
import { isEmpty, pxToPercentage } from '../../../../core/libs/utils';

import { useDispatch, useSelector } from 'react-redux';
// import { onThunkAddNewSubject } from './store/thunk';
import { toasts } from '../../../../core/libs/toasts';

// import { AppState, store } from '../../../../core/store';
import { set } from 'lodash';
import { SubjectModel, SubjectParam } from '../../models/subject/subject.model';
import {
  DropdownValue,
  DropdownValueExtended,
} from '../../models/dropdown.model';
import { StudyAppState } from './store/reducer/types';
import { DropDownList } from '../../components/study-dropdown.component';
import {
  PatientStatusEnum,
  StudyMiniAppTypeAddSubEnum,
  StudyMiniAppTypeDDLEnum,
} from '../../constants/study-constants';
import SubjectMoDal from '../../components/modal/study-add-subject-modal';
import { SubjectItem } from '../../components/study-item-subject.component';
// import { TopNavigationBar } from '../../components/top-navigation-bar.component';

interface ComponentProps {
  onGoBack: () => void;
  onRightIconPress: () => void;
  onGoUpLoad: (subjectParam: SubjectModel) => void;
  subject: SubjectModel[];
  onDDLChangeValue: (value: DropdownValue, typeDDL: string) => void;
  onSaveSubjectDone: (
    type: string,
    value: string,
    subject?: SubjectModel,
  ) => void;
  loading: boolean;
  onRefresh?: () => void;
  isFetching: boolean;
  paramRequest: SubjectParam;
}
export type MiniAppStudyProps = ComponentProps;

const MiniAppStudy: React.FunctionComponent<MiniAppStudyProps> = (props) => {
  // const { subjects, studies, sites }: StudyAppState = useSelector(
  //   (state: AppState) => state.studyMiniApp,
  // );
  const { subjects, studies, sites }: StudyAppState = useSelector(
    (state: any) => state.studyMiniApp,
  );
  const listDDLSites = React.useRef<DropdownValue[]>([]);
  const listDDLStudy = React.useRef<DropdownValue[]>([]);
  const [valueSiteSelected, setValueSiteSelected] =
    React.useState<DropdownValue>();
  const [valueStudySelected, setValueStudySelected] =
    React.useState<DropdownValue>();

  const getListSiteDDl = () => {
    const result = sites.map(
      (item) => new DropdownValueExtended(item.id.toString(), item.name),
    );
    if (result.length > 1) {
      result.splice(0, 0, new DropdownValueExtended('', 'All'));
    }
    return result;
  };
  const getListStudyDDl = () => {
    const result = studies.map(
      (item) =>
        new DropdownValueExtended(item.clinicalStudyId, item.clinicalStudyName),
    );
    if (result.length > 1) {
      result.splice(0, 0, new DropdownValueExtended('', 'All'));
    }
    return result;
  };
  useEffect(() => {
    const listSite = getListSiteDDl();
    listDDLSites.current = listSite;
    setValueSiteSelected(listSite[0]);
    const listStudy = getListStudyDDl();
    listDDLStudy.current = listStudy;
    setValueStudySelected(listStudy[0]);
  }, [sites, studies]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [messageTxt, setMessageTxt] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const [itemSelected, setItemSelected] = useState<SubjectModel | undefined>();
  useEffect(() => {
    setItemSelected(undefined);
  }, [props.paramRequest]);
  const renderEmptyComponent = () => {
    if (props.loading) {
      return <View />;
    }
    return (
      <View>
        <Text style={styles.txtNodata}>No Data</Text>
      </View>
    );
  };
  const checkAllowCreateSubject = (currentStudyId: string) => {
    const study = studies.filter(
      (e) => e.clinicalStudyId === currentStudyId,
    )[0];
    const numberOfSubjects = subjects.filter(
      (e) => e.clinicalStudyId === currentStudyId,
    ).length;

    if (study.totalSubject === 0 && study.unlimited === false) {
      return true;
    } else {
      if (study.totalSubject > numberOfSubjects) {
        return true;
      } else {
        return false;
      }
    }
  };
  const handleSelection = (item: SubjectModel) => {
    var selectedId = itemSelected;

    if (selectedId?.patientId === item.patientId) {
      setItemSelected(undefined);
    } else {
      setItemSelected(item);
    }
  };
  const renderSubject = ({ item }: { item: SubjectModel; index: number }) => {
    return (
      <SubjectItem
        item={item}
        onPress={() => {
          handleSelection(item);
          if (
            item.patientStatus === PatientStatusEnum.UploadFail ||
            item.patientStatus === PatientStatusEnum.Offline
          ) {
            props.onGoUpLoad(item);
          }
        }}
        isSelected={itemSelected?.patientId === item.patientId}
      />
    );
  };
  const dispatch = useDispatch();
  const onSaveSubject = (value: string, type: string) => {
    // crashlyticsHelper.logEvent(
    //   'list subject component',
    //   type === StudyMiniAppTypeAddSubEnum.Save
    //     ? EventNameEnum.saveSubject
    //     : 'save and go upload',
    // );
    if (
      checkAllowCreateSubject(
        isEmpty(valueStudySelected?.key)
          ? listDDLStudy.current[0]?.key
          : valueStudySelected?.key,
      )
    ) {
      if (
        subjects.findIndex(
          (e) => e.patientId.toLowerCase() === value.toLowerCase(),
        ) === -1
      ) {
        const body = new SubjectModel();

        body.clinicalStudyId = isEmpty(valueStudySelected?.key)
          ? listDDLStudy.current[0]?.key
          : valueStudySelected?.key;
        body.siteName = valueSiteSelected?.key ?? listDDLSites.current[0]?.key;
        body.patientId = value;

        // dispatch(
        //   onThunkAddNewSubject(
        //     //success
        //     (data, subject) => {
        //       toasts.success('New Subject added successfully.');
        //       setMessageTxt('');
        //       setIsVisible(false);
        //       props.onSaveSubjectDone(type, value, subject);
        //     },
        //     //fail
        //     (message, subject) => {
        //       console.log(message);
        //       if (message.includes('Network Error')) {
        //         setMessageTxt('');
        //         setIsVisible(false);
        //         props.onSaveSubjectDone(type, value, subject);
        //       } else if (message === 'CreateSubject.SubjectExisted') {
        //         setMessageTxt(
        //           'This Subject ID is already in use for the selected study. Please enter an unused ID or select the ID in question from the Subject list and continue with a new upload.',
        //         );
        //       } else if (message === 'CreateSubject.Invalid') {
        //         setMessageTxt('Number of subjects exceeds the limitation.');
        //       } else {
        //         toasts.warning(message);
        //       }
        //     },
        //     body,
        //   ),
        // );
      } else {
        setMessageTxt(
          'This Subject ID is already in use for the selected study. Please enter an unused ID or select the ID in question from the Subject list and continue with a new upload.',
        );
      }
    } else {
      setMessageTxt('Number of subjects exceeds the limitation.');
    }
  };
  return (
    <ViewContainer>
      {/* <TopNavigationBar
        disabledLeftIcon={true}
        title={'Belle Study™'}
        onRightPress={props.onRightIconPress}
      /> */}
      <View style={styles.viewContainer}>
        <View style={styles.viewContent}>
          <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>Study</Text>
            {listDDLStudy.current.length > 1 ? (
              <DropDownList
                value={valueStudySelected}
                onChange={(data) => {
                  setItemSelected(undefined);
                  setValueStudySelected(data);
                  props.onDDLChangeValue(data, StudyMiniAppTypeDDLEnum.Study);
                }}
                listItem={listDDLStudy.current}
              />
            ) : listDDLStudy.current.length === 1 ? (
              <Text style={styles.txtSite}>{valueStudySelected?.value}</Text>
            ) : null}
          </View>
          <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>Site</Text>
            {listDDLSites.current.length > 1 ? (
              <DropDownList
                value={valueSiteSelected}
                onChange={(data) => {
                  setItemSelected(undefined);
                  setValueSiteSelected(data);
                  props.onDDLChangeValue(data, StudyMiniAppTypeDDLEnum.Site);
                }}
                listItem={listDDLSites.current}
              />
            ) : listDDLSites.current.length === 1 ? (
              <Text style={styles.txtSite}>{valueSiteSelected?.value}</Text>
            ) : null}
          </View>
          <View style={styles.viewTitle}>
            <Text style={styles.txtTitle}>Subjects</Text>
          </View>
          <TouchableOpacity
            style={
              isEmpty(valueSiteSelected?.key) ||
              isEmpty(valueStudySelected?.key)
                ? styles.btnButtonDis
                : styles.btnButton
            }
            disabled={
              isEmpty(valueSiteSelected?.key) ||
              isEmpty(valueStudySelected?.key)
            }
            onPress={() => {
              // crashlyticsHelper.logEvent(
              //   'list subject component',
              //   EventNameEnum.addNewSubject,
              // );
              setIsVisible(true);
            }}>
            <Text style={styles.txtTitleUpload}>ADD NEW SUBJECT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex1}>
          <FlatList
            data={props.subject}
            extraData={itemSelected}
            keyExtractor={(item, index) => `${item.patientId}${index}`}
            renderItem={renderSubject}
            contentContainerStyle={styles.flatList}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={1}
            ListEmptyComponent={renderEmptyComponent}
            onRefresh={() => {
              setItemSelected(undefined);
              props.onRefresh && props.onRefresh();
            }}
            refreshing={false}
          />
        </View>
        <SubjectMoDal
          title={'Enter the Subject ID'}
          value={value}
          isVisible={isVisible}
          onCloseModal={() => {
            setIsVisible(false);
            setMessageTxt('');
          }}
          message={messageTxt}
          onSavePress={onSaveSubject}
        />
        <View style={styles.viewBtnUpload}>
          <TouchableOpacity
            onPress={() => {
              if (itemSelected) {
                props.onGoUpLoad(itemSelected);
              }
            }}
            style={
              itemSelected === undefined
                ? styles.btnButtonDis
                : styles.btnButton
            }
            disabled={itemSelected === undefined}>
            <Text style={styles.txtTitleUpload}>CONTINUE TO NEW UPLOAD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ViewContainer>
  );
};
const styles = StyleSheet.create({
  viewContainer: { alignItems: 'center', flex: 1 },
  txtSite: {
    ...textStyle.montserratRegular,
    fontSize: pxToPercentage(16),
  },
  btnButton: {
    backgroundColor: themes['App Theme']['app-txt-color-7'],
    height: pxToPercentage(45),
    borderRadius: pxToPercentage(8),
    justifyContent: 'center',
    marginHorizontal: pxToPercentage(16),
    width: pxToPercentage(414 - 32),
  },
  viewContent: { marginVertical: pxToPercentage(10), alignItems: 'center' },
  btnButtonDis: {
    backgroundColor: themes['App Theme']['button-disabled-color'],
    height: pxToPercentage(45),
    borderRadius: pxToPercentage(8),
    justifyContent: 'center',
    marginHorizontal: pxToPercentage(16),
    width: pxToPercentage(414 - 32),
  },
  viewBtnUpload: {
    marginVertical: pxToPercentage(20),
  },
  txtTitleUpload: {
    textAlign: 'center',
    ...textStyle.montserratMedium,
    fontSize: pxToPercentage(16),
    color: 'white',
  },
  flatList: {
    paddingBottom: pxToPercentage(100),
    paddingHorizontal: pxToPercentage(14),
  },
  flex1: { flex: 1 },
  txtTitle: {
    width: pxToPercentage(132),
    color: '#3A3379',
    ...textStyle.montserratSemiBold,
    fontSize: pxToPercentage(22),
  },
  viewTitle: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginHorizontal: pxToPercentage(16),
    flexDirection: 'row',
    marginVertical: pxToPercentage(9),
  },
  txtNodata: {
    ...textStyle.montserratMedium,
    fontSize: pxToPercentage(16),
  },
});
export default MiniAppStudy;
