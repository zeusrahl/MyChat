import React from 'react';
import { View, Platform, KeyboardAvoidingView, } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  
  // create this.state's objects
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  // 
  componentDidMount() {
    // Load name from props, routed from "Start"
    let name = this.props.route.params.name;

    // Add's name from navigation to have "name" in the title of the page
    this.props.navigation.setOptions({ 
      title: `Welcome ${name}`,
      headerTintColor: '#212224',
    });

    // Update the state's messages
    this.setState({
        messages: [
          {
            _id: 0,
            text: `This is your chat with ${name}`,
            createdAt: new Date(),
            system: true, // makes message a "system message"
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
      // using the GiftedChat code, add a message to bottom of screen,
      // sent by user
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // adds a new chat bubble
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
    // imports the bgColor as props from "start"
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

        {/* adds that the textbox above the keyboard while typing */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}