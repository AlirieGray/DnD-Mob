import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, DrawerView } from 'react-navigation';

// form for entering character data
export default class CharacterForm extends Component {
  constructor(props) {
    super(props);
  }

  getRaces() {
    var races = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"];
    return races.map((race, index) => {
      return <Picker.Item key={index} label={race} value={race} />
    })
  }

  getClasses() {
    var classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
    return classes.map((clas, index) => {
      return <Picker.Item key={index} label={clas} value={clas} />
    })
  }

  getStats() {
    var stats = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
    return stats.map((stat, index) => {
      return <Stat key={index} abbrv={stat} setData={this.props.setStats} />
    });
  }

  getAlignments() {
    var alignments = ["LG", "LN", "LE", "NG", "NN", "NE", "CG", "CN", "CN"];
    return alignments.map((align, index) => {
      return <Alignment key={index} abbrv={align} setData={this.props.setAlignment}/>
    });
  }

  render() {
    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <PopUp isVisible={this.props.statPickerVisible} toggleVisbility={this.props.showStatPicker} getData={this.getStats.bind(this)} popUpStyle={styles.statsContainer}/>
      <PopUp isVisible={this.props.alignmentPickerVisible} toggleVisbility={this.props.showAlignmentPicker} getData={this.getAlignments.bind(this)} popUpStyle={styles.alignmentContainer}/>
        <TextInput
          style={styles.textIn}
          placeholder="Name"
          onChangeText={this.props.onSetName}> </TextInput>
        <Picker selectedValue={this.props.race} onValueChange={this.props.onPickRace}>
          {this.getRaces()}
        </Picker>
        <Picker selectedValue={this.props.clas} onValueChange={this.props.onPickClass}>
          {this.getClasses()}
        </Picker>
        <View style={styles.charFormButton} >
          <Button
            onPress={this.props.showStatPicker}
            title="Stats"
          />
        </View>
        <View style={styles.charFormButton} >
          <Button
            onPress={this.props.showAlignmentPicker}
            title="Alignment"
          />
        </View>
        <Button
          onPress={this.props.saveChar}
          title="Create!"
        />
      </ScrollView>
    );
  }
}

class Stat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View>
        <Text> {this.props.abbrv} </Text>
      </View>
    );
  }
}

class Alignment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TouchableHighlight onPress={() => {
        this.props.setData(this.props.abbrv);
      }}>
        <View style={styles.alignmentBox}>
          <Text> {this.props.abbrv} </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class PopUp extends Component {
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
  closeStatWindow: {
    alignItems: 'flex-end'
  },
  charFormButton: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignmentContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  alignmentBox: {
    width: 70,
    height: 40,
    margin: 2,
    marginVertical: 20,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  statsContainer: {

  }
});
