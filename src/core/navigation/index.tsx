import {
  createAppContainer,
  NavigationContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { PreviewContainer } from '../../container/study/containers/study-preview/study-preview.container';
import { MiniAppStudyContainer } from '../../container/study/containers/study-subject-list/study-subject-list.container';


const createAppRouter = (): NavigationContainer => {
  return createAppContainer(
    createSwitchNavigator(
      {
        ['miniAppStudy']: MiniAppStudyContainer,
        ['preview']: PreviewContainer,
        // ['UpLoadPhoto']: UpLoadPhotoContainer,
        // ['StudySetting']: SettingContainer,
      },
      { initialRouteName: 'miniAppStudy' },
    ),
  );
};

export const Router: NavigationContainer = createAppRouter();
