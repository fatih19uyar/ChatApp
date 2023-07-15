import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatListScreen from '../screens/ChatListScreen';

const Tab = createMaterialTopTabNavigator();

const AppStack = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatApp</Text>

      <Tab.Navigator>
        <Tab.Screen
          name="Chats"
          component={ChatListScreen}
          options={{
            tabBarLabel: () => <Text style={{fontWeight: 'bold'}}>Chats</Text>,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: () => (
              <Text style={{fontWeight: 'bold'}}>Profile</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },
  title: {
    fontSize: 24,
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    color: 'white',
  },
});

export default AppStack;
