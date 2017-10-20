import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, DrawerView } from 'react-navigation';
import DiceRoller from './DiceRoller';
import CharacterForm from './CharacterForm';
import Profile from './Profile';


// create new character screen
class CreateCharacterScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Create a Character',
    contentOptions: {
      style: {
        marginVertical: 30,
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      race: "Dragonborn",
      clas: "Barbarian",
      name: "",
      statPickerVisible: false
    }
  }

  // save character information in a JSON object to local storage
  async saveCharacterData() {
    console.log("saved!")
    console.log(this.state.name);
    var character = {
      race: this.state.race,
      clas: this.state.clas,
      name: this.state.name
    };
    try {
      await AsyncStorage.setItem("a", JSON.stringify(character));
      console.log(JSON.stringify(character));
      this.props.navigation.navigate("Profile");

    } catch (err) {
      // Error saving data
      console.error(err);
    }
  }

  setRace(value: string) {
    this.setState({
      race: value
    })
  }

  setClass(value: string) {
    this.setState({
      clas: value
    })
  }

  setName(value: string) {
    this.setState({
      name: value
    })
  }

  showStatPicker() {
    this.setState({
      statPickerVisible: (this.state.statPickerVisible ? false : true)
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
      <TouchableHighlight onPress={() => {
        this.props.navigation.navigate('DrawerToggle');
      }} style={styles.menuIcon}>
        <Image
          source={require('./menu_icon.png')}
        />
      </TouchableHighlight>
        <CharacterForm statPickerVisible={this.state.statPickerVisible} showStatPicker={this.showStatPicker.bind(this)} race={this.state.race} clas={this.state.clas} onPickRace={this.setRace.bind(this)} onPickClass={this.setClass.bind(this)} onSetName={this.setName.bind(this)} saveChar={this.saveCharacterData.bind(this)} />
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
  menuIcon: {
    paddingLeft: 10
  }
});

// navigation
export default App = DrawerNavigator({
  Home: { screen: CreateCharacterScreen },
  Profile: { screen: Profile },
  Roll: { screen: DiceRoller }
});
