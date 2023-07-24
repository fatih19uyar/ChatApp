import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ProfileScreenProps} from '../types/type';

const ProfileScreenForm: React.FC<ProfileScreenProps> = ({user}) => {
  console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/profile-picture.png')}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.status}>{user.email}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Create Time</Text>
        <Text style={styles.aboutText}>{user.createTime}</Text>
        <Text style={styles.sectionTitle}>Last Sign Time</Text>
        <Text style={styles.aboutText}>{user.lastSignTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 3,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: '#ffffff',
  },
  content: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interest: {
    fontSize: 16,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#003f5c',
    color: '#003f5c',
  },
});

export default ProfileScreenForm;
