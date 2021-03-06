import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppRegistry
} from 'react-native';
import AboutScreen from './../screens/LoginScreens/AboutScreen';
import * as firebase from 'firebase';

export default class ControlPanel extends Component {

  constructor(props){
    super(props);
  }

  logout(){
    firebase.auth().signOut().then(this.props.navigation.navigate('UserLogin'))
    .catch(function(error) {
    });
  }

  render() {
    return (
      <ScrollView style={styles.menu}>
        <TouchableOpacity>
          <Text style={styles.links}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.links}>Update Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.links}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.links}>Notification Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.links}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.links}>Help & Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen')}>
          <Text style={styles.links}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text style={styles.links}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#5AC8B0',
  },
  links: {
    color: 'white',
    fontSize: 16,
    margin: 15,
    textAlign: 'left',
    fontFamily: "Century Gothic"
  }
});

AppRegistry.registerComponent('ControlPanel', () => ControlPanel);
