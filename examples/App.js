/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// TODO: Will use package later.
//TODO : backPress not working with debug Navigator Screen

//import UiBuilder from 'react-native-ui-builder';
import React from 'react';
import UiBuilder from './src/navigation/navigation';
import data from './src/data/jsonData';

export default class App extends React.Component {
  render() {
    return <UiBuilder source={data.debugNavigator} />;
  }
}
