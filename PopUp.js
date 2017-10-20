import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, DrawerView } from 'react-navigation';

export default class PopUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Modal transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.toggleVisbility}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#00000080',
            alignItems: 'center'}}>

            <View style={{
              width: 300,
              height: 300,
              backgroundColor: '#fff',
              padding: 20,
              display: 'flex'
            }}>
              <View style={this.props.popUpStyle}>
                {this.props.getData()}
              </View>
              <View style={styles.closeStatWindow}>
                <TouchableHighlight onPress={() => {
                  this.props.toggleVisbility()
                }}>
                  <Text> Close </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  closeStatWindow: {
    alignItems: 'flex-end'
  }
});
