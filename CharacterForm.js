import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, ScrollView, Picker, Modal, TouchableHighlight, AsyncStorage } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, DrawerView } from 'react-navigation';
import PopUp from './PopUp';
import NumberPicker from './NumberPicker';

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
        <Text style={{color: '#bbb', fontStyle: 'italic', paddingLeft:5}}> Name: </Text>
        <TextInput
          style={styles.textIn}
          placeholder="Name"
          onChangeText={this.props.onSetName}> </TextInput>
        <Text style={{color: '#bbb', fontStyle: 'italic', paddingLeft:5}}> Race: </Text>
        <Picker style={{marginBottom:10}} selectedValue={this.props.race} onValueChange={this.props.onPickRace}>
          {this.getRaces()}
        </Picker>
        <Text style={{color: '#bbb', fontStyle: 'italic', paddingLeft:5}}> Class: </Text>
        <Picker style={{marginBottom:10}} selectedValue={this.props.clas} onValueChange={this.props.onPickClass}>
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
      <View style={styles.statObj}>
          <Text style={{fontSize:16}}> {this.props.abbrv} </Text>
          <NumberPicker />
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
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 16,
    marginHorizontal: 3,
    marginBottom: 10
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
    backgroundColor: '#B3E5FC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  statObj: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  }
});
