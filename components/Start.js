import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import bgImage from '../assets/images/BgImage.png';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      bgColor: '',
    }
  };

  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors =  {
    black: '#090C08',
    gray: '#474056',
    lightBlue: '#8A95A5',
    lightGreen: '#B9C6AE',
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.image}>
          <Text style={styles.title}>App Title</Text>
          <View style={styles.box}>
            <TextInput 
              style={styles.input}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder='Your Name'
            />
            <Text style={styles.choose}>Choose Background Color:</Text>
            <View style={styles.swatches}>
              <TouchableOpacity
                onPress={() => this.changeBgColor(this.colors.black)}
                style={styles.swatch1}
              >
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changeBgColor(this.colors.gray)}
                style={styles.swatch2}
              >
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changeBgColor(this.colors.lightBlue)}
                style={styles.swatch3}
              >
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.changeBgColor(this.colors.lightGreen)}
                style={styles.swatch4}
              >
              </TouchableOpacity>
            </View>
            <Button
              color='#757083'
              width='88%'
              onPress={() => {
                this.props.navigation.navigate('Chat', {name: this.state.name});
              }}
              title='Start Chatting'
            />
          </View>
        </ImageBackground>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },

  title: {
    textAlign: 'center',
    paddingTop: 60,
    flexGrow: 2,
    // flexShrink: 10,
    fontWeight: '600',
    fontSize: 45,
    color: '#fff',
  },

  box: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: '11%',
    paddingVertical: '8%',
  },

  input: {
    height: 40,
    width: '88%',
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: .5,
  },

  choose: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    marginBottom: 10,
  },

  swatches: {
    flex: .5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: 'flex-start'
  },

  swatch1: {
    width: 40,
    height: 40,
    backgroundColor: "#090C08",
    borderRadius: 40,
  },

  swatch2: {
    width: 40,
    height: 40,
    backgroundColor: "#474056",
    borderRadius: 40,
  },

  swatch3: {
    width: 40,
    height: 40,
    backgroundColor: "#8A95A5",
    borderRadius: 40,
  },

  swatch4: {
    width: 40,
    height: 40,
    backgroundColor: "#B9C6AE",
    borderRadius: 40,
  },
})