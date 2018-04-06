import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import Header from './../components/Header';
import WelcomeScreen from './../screens/LoginScreens/WelcomeScreen';
import UserLoginScreen from './../screens/LoginScreens/UserLoginScreen';
import GetPetDetails from './../screens/LoginScreens/GetPetDetails';
import HomeScreen from './../screens/LoginScreens/HomeScreen';
import ActivityDetail from './../screens/ActivityScreens/ActivityDetail';
import ActivityMain from './../screens/ActivityScreens/ActivityMain';
import TimelineScreen from './../screens/JournalScreens/TimelineScreen';
import AddEventScreen from './../screens/JournalScreens/AddEventScreen';
import ActivityPrestart from './../screens/ActivityScreens/ActivityPrestart';
import ActivityRecord from './../screens/ActivityScreens/ActivityRecord';
import ActivitySummary from './../screens/ActivityScreens/ActivitySummary';
import ActivityTrain from './../screens/ActivityScreens/ActivityTrain';

// static navigationOptions = {
//   header: null,
// };


const LoginStack = StackNavigator({
  // Welcome: { screen: WelcomeScreen },
  // UserLogin: { screen: UserLoginScreen },
  // PetDetails: { screen: GetPetDetails },
  Home: { screen: HomeScreen },
});

const ActivityStack = StackNavigator({
  ActivityMain: { screen: ActivityMain },
  ActivityDetail: { screen: ActivityDetail },
  ActivityPrestart: { screen: ActivityPrestart},
  ActivityRecord: { screen: ActivityRecord},
  ActivitySummary: { screen: ActivitySummary},
  ActivityTrain: { screen: ActivityTrain}, 
});

const JournalStack = StackNavigator({
  Timeline: { screen: TimelineScreen },
  AddEvent: { screen: AddEventScreen },
  initialRouteName: 'Timeline'
});

export default TabNavigator(
  {
    Login: { screen: LoginStack },
    Activity: { screen: ActivityStack },
    Journal: { screen:  JournalStack   }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#5497A7',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
    header: null
  }
);

