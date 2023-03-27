import { PermissionsAndroid, Platform } from 'react-native';
import { ImageTypeEnum } from './constants';
import { isEmpty } from './utils';
import RNFS from 'react-native-fs';
import { BodyPartEnum, StateUpload } from '../../container/study/constants/study-constants';
import { ImageModel, SubjectModel } from '../../container/study/models/subject/subject.model';
import { CameraConfig } from '../../container/study/containers/study-upload-view/study-camera-config';


export const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

export const isLocalUriPath = (url?: string) => {
  if (isEmpty(url)) {
    return false;
  } else {
    const splistType = url!.split('.');
    if (splistType.length === 0) {
      return false;
    } else {
      let typeFile = splistType[splistType!.length - 1];
      typeFile = typeFile.toString().toLowerCase();
      return (
        typeFile === ImageTypeEnum.gif ||
        typeFile === ImageTypeEnum.png ||
        typeFile === ImageTypeEnum.jpeg ||
        typeFile === ImageTypeEnum.jpg
      );
    }
  }
};
const appFolder = 'subject';
/**
 * get path file of subject
 * @param bodyPath
 * @param subjectId
 * @param isThunk
 * @returns
 */
export const getCacheFilePath = async (
  bodyPath: number,
  subjectId: string,
  isThunk: boolean,
) => {
  try {
    switch (Platform.OS) {
      case 'android': {
        if (await fileHelper.hasAndroidPermission()) {
          return createSubFolder(bodyPath, subjectId, isThunk);
        }
        break;
      }
      case 'ios': {
        return createSubFolder(bodyPath, subjectId, isThunk);
      }
      default: {
        break;
      }
    }
  } catch (err) {
    console.log(err);
  }
  // return `${RNFS.TemporaryDirectoryPath}${filename}`;
};
/**
 * create subfolder use save base 64 image to file
 * @param bodyPath
 * @param subjectId
 * @param isThunk
 * @returns
 */
const createSubFolder = async (
  bodyPath: number,
  subjectId: string,
  isThunk: boolean,
) => {
  const imageName = getFileNameCacheBodyPart(bodyPath);
  return new Promise<string>((resole, reject) => {
    RNFS.readDir(RNFS.TemporaryDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        //
        let path = `${RNFS.TemporaryDirectoryPath}/${appFolder}/${subjectId}`;
        if (isThunk) {
          path = `${
            RNFS.TemporaryDirectoryPath
          }/${appFolder}/${subjectId}/${'thunk'}`;
        }
        const fullPath = path + '/' + imageName;
        checkFileExitByPath(fullPath).then((isExit) => {
          if (isExit) {
            resole(fullPath);
          } else {
            RNFS.mkdir(path)
              .then((resultpath) => {
                console.log(resultpath);
                resole(path + '/' + imageName);
              })
              .catch((error) => {
                reject(error);
              })
              .catch((err) => {
                console.log(err.message, err.code);
                reject(err);
              });
          }
        });
      });
  });
};
/**
 * get file name from body part
 * @param bodyPart
 * @returns
 */
const getFileNameCacheBodyPart = (bodyPart: number) => {
  switch (bodyPart) {
    case BodyPartEnum.UpperFront:
      return 'Upper Front.jpg';
    case BodyPartEnum.LowerFront:
      return 'Lower Front.jpg';
    case BodyPartEnum.UpperBack:
      return 'Upper Back.jpg';
    default:
      return 'Lower Back.jpg';
  }
};
// save file cache from base 64
/**
 * save base 64 image from camera study for file
 * @param subjectId
 * @param bodyPart
 * @param isThunk
 * @param valueImageThumk
 */
export const saveBase64ImageForStudy = async (
  subjectId: string,
  bodyPart: number,
  isThunk: boolean,
  valueImageThumk?: any,
): Promise<void> => {
  const imageTempPath: string =
    (await getCacheFilePath(bodyPart, subjectId, isThunk)) ?? '';

  var value = !isThunk
    ? await CameraConfig.getCachedFile(
        subjectId,
        bodyPart.toString(),
        false,
        true,
        true,
      )
    : await CameraConfig.getCachedFile(
        subjectId,
        bodyPart.toString(),
        true,
        true,
        true,
      );
  switch (Platform.OS) {
    case 'android': {
      if (await hasAndroidPermission()) {
        RNFS.writeFile(imageTempPath, value, 'base64')
          .then(() => {})
          .catch(() => {});
      }

      break;
    }
    case 'ios': {
      RNFS.writeFile(imageTempPath, value, 'base64')
        .then(() => {})
        .catch(() => {});

      break;
    }
    default: {
      break;
    }
  }
};
// read file from base 64
/**
 * read file to base 64
 * @param path
 * @param onSuccess
 */
export const readBase64ImageForStudy = async (
  path: string,
  onSuccess: (base64Image: string) => void,
): Promise<void> => {
  RNFS.readFile(path, 'base64')
    .then((value) => {
      onSuccess(value);
    })
    .catch((e) => {});
};
/**
 * check file exit
 * @param path
 * @returns
 */
export const checkFileExitByPath = async (path: string) => {
  return await RNFS.exists(path);
};
/**
 * remote file cache on store
 * if subjetcId = empty then delete all else delete for current subjectId
 * @param subjectId
 */
export const removeCachedFiles = async (subjectId?: string) => {
  if (subjectId) {
    checkFileExitByPath(
      `${RNFS.TemporaryDirectoryPath}/${appFolder}/${subjectId}`,
    ).then(async (isExit) => {
      if (isExit) {
        await RNFS.unlink(
          `${RNFS.TemporaryDirectoryPath}/${appFolder}/${subjectId}`,
        );
      }
    });
  } else {
    checkFileExitByPath(`${RNFS.TemporaryDirectoryPath}/${appFolder}`).then(
      async (isExit) => {
        if (isExit) {
          await RNFS.unlink(`${RNFS.TemporaryDirectoryPath}/${appFolder}`);
        }
      },
    );
  }
};

export const renameFile = async (
  currentSubjectId: string,
  subjectId: string,
) => {
  checkFileExitByPath(
    `${RNFS.DocumentDirectoryPath}/Photos/${currentSubjectId}`,
  ).then(async (isExit) => {
    if (isExit) {
      await RNFS.mkdir(
        `${RNFS.DocumentDirectoryPath}/Photos/${currentSubjectId}`,
      );
      await RNFS.moveFile(
        `${RNFS.DocumentDirectoryPath}/Photos/${currentSubjectId}`,
        `${RNFS.DocumentDirectoryPath}/Photos/${subjectId}`,
      );
      // await RNFS.unlink(
      //   `${RNFS.DocumentDirectoryPath}/Photos/${currentSubjectId}`,
      // );
    }
  });
};

export const saveImagePath = async (
  bodyPart: number,
  subjectId: string,
  subjects: SubjectModel[],
  path: string,
) => {
  const param: ImageModel = new ImageModel(bodyPart, path);
  const item = subjects.filter((e) => e.patientId === subjectId);
  console.log('itemk', item[0]);
  const indexNewItem = subjects.findIndex((e) => e.patientId === subjectId);
  const imageItem = item[0]?.image ?? [];
  if (imageItem.findIndex((e) => e.bodyPart === param.bodyPart) === -1) {
    imageItem.push(param);
  }
  // item[0].patientStatus = PatientStatusEnum.partlyShoot;
  item[0].image = imageItem;
  // if (imageItem.length === 4) {
  //   item[0].patientStatus = PatientStatusEnum.NoneUpload;
  // }

  return await item[0];
};
export const saveImageStatus = async (
  bodyPart: number,
  subjectId: string,
  subjects: SubjectModel[],
  status: StateUpload,
) => {
  const item = subjects.filter((e) => e.patientId === subjectId);
  const imageItem = item[0]?.image ?? [];
  const index = imageItem.findIndex((e) => e.bodyPart === bodyPart);
  if (index !== -1) {
    imageItem[index].status = status;
  }
  item[0].image = imageItem;
  return item[0];
};
export const fileHelper = {
  hasAndroidPermission,
  isLocalUriPath,
  saveBase64ImageForStudy,
  getCacheFilePath,
  getFileNameCacheBodyPart,
  checkFileExitByPath,
  removeCachedFiles,
  saveImageStatus,
  renameFile,
};
