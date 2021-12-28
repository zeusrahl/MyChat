import React from 'react';
import { 
  View, 
  Platform, 
  KeyboardAvoidingView } from 'react-native';
import { 
  Bubble, 
  GiftedChat, 
  InputToolbar } from 'react-native-gifted-chat';
// import firebase from 'firebase';
// import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');
require('firebase/auth');

export default class Chat extends React.Component {
  
  // create this.state's objects
  constructor() {
    super();
    this.state = {
      uid: 0,
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyBXTT0a3MOInkL03ydk3zVd2e-CS3FeX70",
      authDomain: "chatapp-c935a.firebaseapp.com",
      projectId: "chatapp-c935a",
      storageBucket: "chatapp-c935a.appspot.com",
      messagingSenderId: "394651513478",
    };

    // Initiliatizing Firebase
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
      };

    // register for updates
    this.referenceChatMessages = firebase
      .firestore()
      .collection("messages");
    // this.refMsgsUser = null;
  }

  componentDidMount() {
    // Load name from props, routed from "Start"
    let name = this.props.route.params.name;

    // Add's name from navigation to have "name" in the title of the page
    this.props.navigation.setOptions({ 
      title: `Welcome ${name}`,
      headerTintColor: '#212224',
    });

    NetInfo.fetch().then(connection => {

      // if user is online
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');

        // listens for updates in the collection
        this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onChatUpdate);

        // user authentication performed first
        this.authUnsubscribe = firebase.auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
             await firebase.auth().signInAnonymously();
            }

          // update user state with currently active user data
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
            },
          });

          // referencing messages of current user
        //   this.refMsgsUser = firebase
        //     .firestore()
        //     .collection('messages')
        //     .where('uid', '==', this.state.uid);
        });
        // save messages locally to AsyncStorage
        this.saveMessages();
      } else { // if user is offline
        console.log('offline');
        this.setState({ isConnected: false });
        // get messages from AsyncStorage
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  onChatUpdate = (querySnapshot) => {
    const messages = [];
    // go through each message chat
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  getMessages = async () => {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      // using the GiftedChat code, add a message to bottom of screen,
      // sent by user
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    })
  }

  addMessage() {
    const message = this.state.messages[0];
    // add a new messages to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: this.state.user,
    });
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
      <InputToolbar
      {...props}
      />
      );
    }
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
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar,
          }}
        />

        {/* adds that the textbox above the keyboard while typing */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  }
}