// import { isEmpty } from '@src/core/libs/utils';
// import { onSetVisibleSpinner } from '@src/core/store/reducer/app/actions';
// import { ThunkActionTypes } from '@src/core/store/thunk/types';
// import { fileHelper } from '@src/core/libs/file-helper';

// import { PreViewState } from '../../../../constants/study-constants';
// import { ReviewPhotoService } from '@src/containers/mini-apps/study/services/study-review-photo.service';
// import { setAccessTokenForAI } from '../reducer/action';
// import { StudyAppBodyRegionModel } from '@src/containers/mini-apps/study/models/subject/subject.model';

// export const onThunkGetTokenAI = (): ThunkActionTypes => async (dispatch) => {
//   try {
//     var result = await ReviewPhotoService.instance.getToken();
//     console.log('onThunkGetTokenAI done', result.access_token);
//     dispatch(setAccessTokenForAI(result.access_token));
//   } catch (error) {
//     console.log('onThunkGetTokenAI', error);
//   }
// };
// export const onThunkReviewImage =
//   (
//     request: StudyAppBodyRegionModel,
//     subjectId: string,
//     onPreviewSuccess: (status: PreViewState, message: string) => void,
//     onPreviewFail: (message: string) => void,
//   ): ThunkActionTypes =>
//   async (dispatch) => {
//     // dispatch(onSetVisibleSpinner(true));
//     const path = await fileHelper.getCacheFilePath(
//       request.bodyPart,
//       subjectId,
//       true,
//     );
//     try {
//       //Decrypt
//       await fileHelper.saveBase64ImageForStudy(
//         subjectId,
//         request.bodyPart,
//         true,
//         request.imageValue,
//       );
//     } catch (error) {
//       console.log(error);
//     }

//     if (!isEmpty(path)) {
//       try {
//         console.log(request.nameImage);
//         var result = await ReviewPhotoService.instance.imageQualityCheck(
//           path ?? '',
//           request.nameImage,
//         );
//         console.log('imageQualityCheck ', result);
//         if (!isEmpty(result.id)) {
//           await getResultPreview(
//             result.id,
//             path,
//             onPreviewSuccess,
//             onPreviewFail,
//           );
//           // dispatch(onSetVisibleSpinner(false));
//           fileHelper.removeCachedFiles(subjectId).then(() => {
//             __DEV__ && console.log('remove thumb file done');
//           });
//         } else {
//           // dispatch(onSetVisibleSpinner(false));
//           fileHelper.removeCachedFiles(subjectId).then(() => {
//             __DEV__ && console.log('remove thumb file done');
//           });
//           onPreviewFail && onPreviewFail('');
//         }
//       } catch (error: any) {
//         // dispatch(onSetVisibleSpinner(false));
//         console.log('error imageQualityCheck', error);
//         fileHelper.removeCachedFiles(subjectId).then(() => {
//           __DEV__ && console.log('remove thumb file done');
//         });
//         onPreviewFail && onPreviewFail(error.toString());
//       }
//       // dispatch(onSetVisibleSpinner(false));
//     }
//   };

// const getResultPreview = async (
//   previewId: string,
//   path?: string,
//   onPreviewSuccess?: (status: PreViewState, message: string) => void,
//   onPreviewFail?: (message: string) => void,
//   status?: any,
// ) => {
//   try {
//     let newResult = isEmpty(status)
//       ? { [previewId]: { status: '', result_version: 1 } }
//       : status;
//     // var resultCheck = await ReviewPhotoService.instance.imageQualityResult([
//     //   previewId,
//     // ]);
//     console.log('newResult', JSON.stringify(newResult));
//     if (newResult[previewId].result_version === 1) {
//       switch (newResult[previewId].status) {
//         case 'SUCCESS': {
//           if (newResult[previewId].message?.scores?.acceptable >= 0.6) {
//             onPreviewSuccess && onPreviewSuccess(PreViewState.PreviewDone, '');
//           } else {
//             if (
//               newResult[previewId].message?.scores?.blur >
//               newResult[previewId].message?.scores?.bad_intensity
//             ) {
//               onPreviewSuccess &&
//                 onPreviewSuccess(
//                   PreViewState.PreviewFail,
//                   'Your image appears to be out of focus. Please press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO NEXT PHOTO” if you continue to receive this message despite attempts to address image quality.',
//                 );
//             } else {
//               onPreviewSuccess &&
//                 onPreviewSuccess(
//                   PreViewState.PreviewFail,
//                   'Please review lighting conditions and ensure that your image is not too bright or too dark. Press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO NEXT PHOTO” if you continue to receive this message despite attempts to address lighting conditions.',
//                 );
//             }
//           }
//           return;
//         }
//         case 'FAILURE': {
//           onPreviewSuccess &&
//             onPreviewSuccess(
//               PreViewState.PreviewFail,
//               'Please press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO NEXT PHOTO” if you continue to receive this message despite attempts to address image quality.',
//             );
//           return;
//         }
//         default: {
//           var resultCheck =
//             await ReviewPhotoService.instance.imageQualityResult([previewId]);
//           console.log('resultCheck', JSON.stringify(resultCheck));

//           getResultPreview(
//             previewId,
//             path,
//             onPreviewSuccess,
//             onPreviewFail,
//             resultCheck,
//           );
//         }
//       }
//     } else {
//       onPreviewSuccess &&
//         onPreviewSuccess(
//           PreViewState.PreviewFail,
//           'Please press “RETAKE” to try again.\n\nOr, press “ACCEPT - CONTINUE TO NEXT PHOTO” if you continue to receive this message despite attempts to address image quality.',
//         );
//     }
//   } catch (e: any) {
//     console.log('error imageQualityResult', e);
//     onPreviewFail && onPreviewFail(e.toString());
//     return;
//   }
// };
