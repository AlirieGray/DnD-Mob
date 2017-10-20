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
      alignment: "",
      statPickerVisible: false,
      alignmentPickerVisible: false
    }
  }

  // save character information in a JSON object to local storage
  async saveCharacterData() {
    console.log("saved!")
    console.log(this.state.name);
    var character = {
      race: this.state.race,
      clas: this.state.clas,
      name: this.state.name,
      alignment: this.getAlignment(this.state.alignment)
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

  getAlignment(abbrv){
    switch(abbrv) {
      case "LG":
        return "Lawful Good";
      case "LN":
        return "Lawful Neutral";
      case "LE":
        return "Lawful Evil";
      case "NG":
        return "Neutral Good";
      case "NE":
        return "Neutral Evil";
      case "CG":
        return "Chaotic Good";
      case "CN":
        return "Chaotic Neutral";
      case "CE":
        return "Chaotic Evil";
      default:
        return "True Neutral"
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

  setAlignment(value: string) {
    this.setState({
      alignment: value,
      alignmentPickerVisible: (this.state.alignmentPickerVisible ? false : true)
    })
  }

  setStats(value: string) {
    this.setState({
      stats: value
    })
  }

  showStatPicker() {
    this.setState({
      statPickerVisible: (this.state.statPickerVisible ? false : true)
    })
  }

  showAlignmentPicker() {
    this.setState({
      alignmentPickerVisible: (this.state.alignmentPickerVisible ? false : true)
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
        <CharacterForm setAlignment={this.setAlignment.bind(this)}
        setStats={this.setStats.bind(this)} statPickerVisible={this.state.statPickerVisible}
        showStatPicker={this.showStatPicker.bind(this)} alignmentPickerVisible={this.state.alignmentPickerVisible}
        showAlignmentPicker={this.showAlignmentPicker.bind(this)} race={this.state.race}
        clas={this.state.clas} onPickRace={this.setRace.bind(this)} onPickClass={this.setClass.bind(this)}
        onSetName={this.setName.bind(this)} saveChar={this.saveCharacterData.bind(this)} />
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
