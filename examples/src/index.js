/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { get } from 'lodash';

import ButtonComponent from './components/button';
import CardComponent from './components/card';
import CarouselComponent from './components/carousel';
import CheckboxComponent from './components/Checkbox';
import DividerComponent from './components/divider';
import HeaderComponent from './components/header';
import IconComponent from './components/icon';
import ImageComponent from './components/image';
import ModalComponent from './components/modal';
import SliderComponent from './components/slider';
import TextComponent from './components/text';
import TextInput from './components/input';
import VideoComponent from './components/video';
import { COMPONENTS } from './utility/constant';
import { appendInFile, requestPermission, writeInFile } from './utility/utils';
import { applyTheme } from './utility/utils';

// Global variable to get theme type in other files.
export let theme;

export default class Components extends React.Component {
  constructor() {
    super();
    this.selectComponent = this.selectComponent.bind(this);
  }

  selectComponent(component, index) {
    const type = get(component, 'type', '');
    switch (type) {
      case COMPONENTS.INPUT:
        return <TextInput {...component.properties} key={index} />;
      case COMPONENTS.ICON:
        return <IconComponent {...component.properties} key={index} />;
      case COMPONENTS.BUTTON:
        return (
          <ButtonComponent
            {...component.properties}
            createScreen={this.props.createScreen}
            key={index}
          />
        );
      case COMPONENTS.CAROUSEL: {
        let itemsData = component.properties.data.map((componentData, i) => {
          return this.selectComponent(componentData, i);
        });
        return (
          <CarouselComponent
            {...component.properties}
            data={itemsData}
            key={index}
          />
        );
      }

      case COMPONENTS.HEADER:
        return (
          <HeaderComponent
            {...component.properties}
            createScreen={this.props.createScreen}
            key={index}
          />
        );
      case COMPONENTS.TEXT:
        return (
          <TextComponent
            {...component.properties}
            createScreen={this.props.createScreen}
            key={index}
          />
        );
      case COMPONENTS.MODAL:
        return (
          <ModalComponent
            {...component}
            createScreen={this.props.createScreen}
            key={index}
          />
        );
      case COMPONENTS.VIEW: {
        if (theme) {
          component.style = applyTheme(component.style, theme);
        }
        return (
          <View style={component.style} key={index}>
            {component.childrens.map((componentData, i) => {
              return this.selectComponent(componentData, i);
            })}
          </View>
        );
      }
      case COMPONENTS.CHECKBOX:
        return <CheckboxComponent {...component.properties} key={index} />;

      case COMPONENTS.CARD:
        // map to store children components of card
        const childComponents = component.childrens.map((component, index) => {
          return this.selectComponent(component, index);
        });

        console.log(component);
        return (
          <CardComponent
            {...component.properties}
            childrens={childComponents}
            key={index}
          />
        );
      case COMPONENTS.IMAGE:
        return <ImageComponent {...component.properties} key={index} />;
      case COMPONENTS.SLIDER:
        return <SliderComponent {...component.properties} key={index} />;
      case COMPONENTS.DIVIDER:
        return <DividerComponent {...component.properties} key={index} />;
      case 'video':
        return <VideoComponent
          {...component.properties} key={index}
        />;
    }
  }

  render() {
    const { source } = this.props;
    theme = source.theme;

    // writing into a file
    var content =
      `<KeyboardAvoidingView
        enabled
        behavior={'position'}
        keyboardVerticalOffset={-200}>
        <ScrollView>
        `
    // requesting for a permission to write in a file
    requestPermission('writeExternalStorage')
    writeInFile('/ui-builder.js', content)

    // appending into a file 
    content =
      ` </ScrollView>
      </KeyboardAvoidingView>
        `
    setTimeout(
      function () {
        appendInFile('/ui-builder.js', content)
      },
      2000
    );
    return (
      <KeyboardAvoidingView
        enabled
        behavior={'position'}
        keyboardVerticalOffset={-200}>
        <ScrollView>
          <View>
            {source.data.map((component, index) => {
              return this.selectComponent(component, index);
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
