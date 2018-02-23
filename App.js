import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { dark_primary_color } from './utils/colors'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers'
import { setLocalNotification } from './utils/helpers';
import { MainNavigation } from './routers.js';


function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MyStatusBar backgroundColor={dark_primary_color} barStyle="light-content" />
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}
