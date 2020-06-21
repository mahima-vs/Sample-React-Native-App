import React, { Component } from 'react';
import {
  AppRegistry,
  Text
} from 'react-native';
import { WebView } from 'react-native-webview';

// import RNDraftJSRender from 'react-native-draftjs-renderer';
// import contentState from 'DraftJs/contentState';
 

export default class App extends Component {
  render () {
    // return <Text> hello</Text>
    return <WebView
    source={{ uri: "http://localhost:3000/" }}
  />
  }
}

