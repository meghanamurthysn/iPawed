import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  ListView,
  ActivityIndicator
} from 'react-native';
import { Card,
  ListItem,
  Button
} from 'react-native-elements';
import * as firebase from 'firebase';

import Header from './../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

import RecActCard from '../../components/RecActCard';
import HorActCards from '../../components/HorActCards';
import ActCat from '../../components/ActCat';
import ActivityCard from '../../components/ActivityCard';

export default class ActivityCategory extends Component {

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Icon name="paw" size={24} color={tintColor}/>
      ),
    title: 'Activities',
    headerTintColor: '#5AC8B0',
    headerBackTitle: 'back',
    headerBackTitleStyle: {
      fontFamily: 'Century Gothic'
    },
    headerTitleStyle: {
      fontFamily: 'SignPainter',
      fontSize: 28,
      color: 'black'
    },
  };

  state = {
    userID:'',
    // recommendedActivities: null
  }


  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
    }
}

getActivities(category){
  firebase.database().ref('userDetails/' + userID + '/' + 'recommendedActivities' + '/').once('value')
  .then((snapshot) => {
    this.setState({
      recommendedActivities: snapshot.val()
    });
    // console.log(recommendedActivities)
  })
  .catch((error) => {
    alert("Error")
  })
  
}

getRef() {
  return firebase.database().ref();
}

componentDidMount() {

  const user = firebase.auth().currentUser;
  console.log("user",user)
  const userID = user ? user.uid : null;
  console.log("uid",userID)

  if(userID) {
    this.setState({
      userID: userID,
      // recommendedActivities: user.recommendedActivities
    });
  
    // this.getUserRecommendedActivities(userID)
    // this.setState({
    //           dataSource: this.state.dataSource.cloneWithRows(this.state.recommendedActivities)
    //       });
  }

  // console.log("Getting Firebase items");

  firebase.database().ref('userDetails/' + userID + '/' + 'recommendedActivities' + '/').on('value', (snap) => {
      console.log('snap', snap);

      var items = [];
      snap.forEach((child) => {
          items.push({
            title: child.val().title,
            category: child.val().category,
            desc: child.val().desc,
            steps: child.val().steps,
            video: child.val().video,
          imageurl: child.val().imageURL});
      });

      console.log('items', items);

      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
      });
  });
}

  render() {

    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F8F8F8'}}>

      <Text style={styles.screenTitle}>
        {"Explore Activities"}
      </Text>

        <Text style={styles.subheader}>
          {"Keep your routine strong or try something new. As long as you're hanging out with Peanut, you're making memories."}
        </Text>

        <Text style={styles.sectionTitle}>
          {"Recommended for you:"}
        </Text>

        <ScrollView horizontal={true}>
            <ListView
                horizontal={true}
                // style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
            />
        </ScrollView>
      </ScrollView>
      );
    }
  
    _renderItem(item) {
  
      const onPress = () => {
        AlertIOS.prompt(
          'Complete',
          null,
          [
            {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
            {text: 'Cancel', onPress: (text) => console.log('Cancel')}
          ],
          'default'
        );
      };
  
      return (
        <ActivityCard navigation={this.props.navigation} item={item} />
      );
    }
  }
  
  const styles = StyleSheet.create({
    screenTitle: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'SignPainter',
      textAlign: 'center',
      marginTop: 10
    },
    subheader: {
      color: 'black',
      fontSize: 12,
      fontFamily: 'Century Gothic',
      textAlign: 'center',
      margin: 10,
      marginBottom: 0
    },
    sectionTitle: {
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Century Gothic',
      color: 'black',
      margin: 10,
      marginTop: 30,
      marginBottom: 0,
    },
    cardStyle: {
      height: 120,
      width: 120,
      margin: 10,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 12,
      alignItems: 'center',
      shadowOffset:{height: 1.5},
      shadowColor: 'grey',
      shadowOpacity: 1.0,
      shadowRadius: 2,
    },
    catTitle: {
      textAlign: 'center',
      color:'black',
      fontFamily: 'Century Gothic',
      fontSize: 14,
      opacity: 1,
      padding: 5,
      paddingBottom: 10,
      fontStyle:'italic',
      position: 'absolute'
    },
    catInnerCirc: {
      width:70,
      height:70,
      borderRadius: 35,
      position:'absolute',
      backgroundColor:'white'
    },
    activityTitle: {
      textAlign: 'center',
      color:'black',
      fontFamily: 'Century Gothic',
      fontSize: 15,
      opacity: 1,
      marginTop: -28.5,
      padding: 5,
      backgroundColor:'rgba(255,255,255,0.8)',
    },
    thumbnail: {
      width: 120,
      height: 120,
      justifyContent:'flex-start',
      alignItems:'stretch',
      marginTop:-16,
      opacity:1
    },
    instructions: {
      fontSize: 8.5,
      textAlign: 'left',
      color: '#333333',
      fontFamily: 'Century Gothic',
    },
  });
  
  AppRegistry.registerComponent('ActivityMain', () => ActivityMain);
  