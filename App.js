import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, DrawerView } from 'react-navigation';

// Profile screen
class Profile extends Component {
  static navigationOptions = {
    drawerLabel: 'My Character',
  }

  constructor(props) {
    super(props);
    this.state = {
      race: "",
      name: "",
      clas: ""
    }
  }

  // get stored character object by name
  async getCharacter(name) {
    try {
      const character = JSON.parse(await AsyncStorage.getItem(name));
      if (character != null) {
        console.log(character)
        this.setState({
          race: character.race,
          clas: character.clas,
          name: character.name
        })
      }
    } catch(err) {
      console.error(err);
    }
  }

  render() {
    if (this.state.name == "") {
      this.getCharacter("a"); // for testing
    }
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return(
      <View style={styles.container}>
      <TouchableHighlight onPress={() => {
        this.props.navigation.navigate('DrawerToggle');
        }} style={styles.menuIcon}>
        <Image
          source={require('./menu_icon.png')}
        />
      </TouchableHighlight>
        <View style={styles.profileInfo}>
          <Text style={styles.charName}> {this.state.name} </Text>
          <Text style={styles.charRace}> {this.state.race} </Text>
          <Text style={styles.charClass}> {this.state.clas} </Text>
        </View>
      </View>
    );
  }
}

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
      name: ""
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
        <CharacterForm race={this.state.race} clas={this.state.clas} onPickRace={this.setRace.bind(this)} onPickClass={this.setClass.bind(this)} onSetName={this.setName.bind(this)} saveChar={this.saveCharacterData.bind(this)} />
      </View>
    );
  }
}


// form for entering character data
class CharacterForm extends Component {
  constructor(props) {
    super(props);
  }

  getRaces() {
    races = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"];
    return races.map((race, index) => {
      return <Picker.Item key={index} label={race} value={race} />
    })
  }

  getClasses() {
    classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
    return classes.map((clas, index) => {
      return <Picker.Item key={index} label={clas} value={clas} />
    })
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TextInput
          style={styles.textIn}
          placeholder="Name"
          onChangeText={this.props.onSetName}
        ></TextInput>
        <Picker selectedValue={this.props.race} onValueChange={this.props.onPickRace}>
          {this.getRaces()}
        </Picker>
        <Picker selectedValue={this.props.clas} onValueChange={this.props.onPickClass}>
          {this.getClasses()}
        </Picker>
        <Button
          onPress={this.props.saveChar}
          title="Create!"
        />
      </ScrollView>
    );
  }
}

class DiceRoller extends Component {
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
          <Picker style={styles.dicePicker} selectedValue={this.state.n}
          onValueChange={(val) => {
            this.setState({n: val});
          }}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
          </Picker>
          <Text> d </Text>
          <Picker style={styles.dicePicker} selectedValue={this.state.s}
            onValueChange={(val) => {
              this.setState({s: val});
            }}>
              <Picker.Item label="4" value={4} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="12" value={12} />
              <Picker.Item label="20" value={20} />
              <Picker.Item label="100" value={100} />
          </Picker>
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
  textIn: {
    padding: 10,
    fontSize: 16
  },
  menuIcon: {
    paddingLeft: 10
  },
  profileInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  charName: {
    fontSize: 30
  },
  charRace: {
    marginVertical: 10,
    fontSize: 16
  },
  charClass: {
    fontSize: 16
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

// navigation
export default App = DrawerNavigator({
  Home: { screen: CreateCharacterScreen },
  Profile: { screen: Profile },
  Roll: { screen: DiceRoller }
});
