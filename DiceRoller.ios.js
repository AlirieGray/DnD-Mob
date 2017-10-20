import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Modal, TouchableHighlight, PickerIOS } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, DrawerView } from 'react-navigation';

var PickerItemIOS = PickerIOS.Item;

export default class DiceRoller extends Component {
  static navigationOptions = {
    drawerLabel: 'Dice Roller',
    contentOptions: {
      style: {
        marginVertical: 30,
      },
    }
  };

  constructor(props){
    super(props);
    this.state = {
      n: 1,
      s: 6,
      rollSum: ""
    }
  }

  roll(n, s) {
    var sum = 0;
    for (let i = 0; i < n; i++) {
      sum += Math.floor((Math.random() * s ) + 1)
    }
    this.setState({
      rollSum: sum
    })
  }

  render() {
    return(
      <View style={styles.container}>
      <TouchableHighlight onPress={() => {
        this.props.navigation.navigate('DrawerToggle');
      }} style={styles.menuIcon}>
        <Image
          source={require('./menu_icon.png')}
        />
      </TouchableHighlight>
        <View style={styles.diceString}>
          <PickerIOS style={styles.dicePicker} selectedValue={this.state.n}
          onValueChange={(val) => {
            this.setState({n: val});
          }}>
            <PickerItemIOS label="1" value={1} />
            <PickerItemIOS label="2" value={2} />
            <PickerItemIOS label="3" value={3} />
            <PickerItemIOS label="4" value={4} />
            <PickerItemIOS label="5" value={5} />
            <PickerItemIOS label="6" value={6} />
          </PickerIOS>
          <Text> d </Text>
          <PickerIOS style={styles.dicePicker} selectedValue={this.state.s}
            onValueChange={(val) => {
              this.setState({s: val});
            }}>
              <PickerItemIOS label="4" value={4} />
              <PickerItemIOS label="6" value={6} />
              <PickerItemIOS label="10" value={10} />
              <PickerItemIOS label="12" value={12} />
              <PickerItemIOS label="20" value={20} />
              <PickerItemIOS label="100" value={100} />
          </PickerIOS>
        </View>
          <Button
            onPress={() => {
              this.roll(this.state.n, this.state.s);
            }}
            title="Roll!"
          />
          <Text style={styles.showRoll}> {this.state.rollSum} </Text>
      </View>
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
  contentContainer: {
    paddingVertical: 20,
  },
  menuIcon: {
    paddingLeft: 10
  },
  diceString: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dicePicker: {
    width: 100
  },
  showRoll: {
    fontSize: 50,
    marginVertical: 10,
    alignSelf: 'center'
  }
});
