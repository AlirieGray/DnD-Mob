import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage } from 'react-native';

export default class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 3
    }
  }

  increment() {
    if (this.state.num < 20) {
      var newNum = this.state.num + 1;
      this.setState({
        num: newNum
      })
    }
  }

  decrement(){
    if (this.state.num > 3) {
      var newNum = this.state.num - 1;
      this.setState({
        num: newNum
      })
    }
  }

  render() {
    return(
      <View style={styles.container}>
          <DisplayNumber num={this.state.num}/>
        <IncrementButtons decrement={this.decrement.bind(this)} increment={this.increment.bind(this)}/>
      </View>
    );
  }
}

class DisplayNumber extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <Text style={{alignSelf:'center'}}> {this.props.num} </Text>
    );
  }
}

class IncrementButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={() => {
            this.props.increment();
          }}>
          <Image
          style={styles.icon}
            source={require('./up_icon.png')} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.props.decrement();
          }}>
          <Image
          style={styles.icon}
            source={require('./down_icon.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 90,
    height: 40,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    width: 17,
    height: 17
  }
})
