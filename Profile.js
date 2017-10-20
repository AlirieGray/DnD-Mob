import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, DrawerView } from 'react-navigation';

// Profile screen
export default class Profile extends Component {
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
          name: character.name,
          alignment: character.alignment
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
          <Text style={styles.charAlignment}> {this.state.alignment} </Text>
        </View>
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
  charAlignment: {
    marginTop: 10,
    fontSize: 16
  }
});
