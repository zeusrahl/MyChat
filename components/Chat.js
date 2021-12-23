import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text, Keyboard } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;

    this.props.navigation.setOptions({ 
      title: `Welcome ${name}`,
      headerTintColor: '#212224',
    });

    

    this.setState({
        messages: [
          {
            _id: 0,
            text: `This is your chat with ${name}`,
            createdAt: new Date(),
            system: true,
          },
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {  
    let { bgColor } = this.props.route.params;

    return (
      <View style={{
        flex: 1,
        backgroundColor: bgColor,
      }}
      >
        <GiftedChat 
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
      
      // <View 
      //   style={{
      //     flex:1,
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     backgroundColor: bgColor,
      //   }}>
      //  <Text>Chat Screen</Text>
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   window: {
//     flex: 1,
//   }
// });