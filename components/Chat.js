import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;

    this.props.navigation.setOptions({ title: name });
    
    let { bgColor } = this.props.route.params;

    return (
      
      <View 
        style={{
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bgColor,
        }}>
       <Text>Chat Screen</Text>
      </View>
    );
  }
}