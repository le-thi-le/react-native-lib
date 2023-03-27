import { NavigationActions, NavigationParams } from 'react-navigation';

let navigator: {
  dispatch: (arg0: import('react-navigation').NavigationNavigateAction) => void;
};

function setTopLevelNavigator(navigatorRef: {
  dispatch: (arg0: import('react-navigation').NavigationNavigateAction) => void;
}) {
  navigator = navigatorRef;
}

async function navigate(routeName: string, params?: NavigationParams) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

// add other navigation functions that you need and export them
export const NavigationService = {
  navigate,
  setTopLevelNavigator,
};
