import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <>
      <View style={styles.header}>
        <Image
          source={require('../assets/profile-picture.png')}
          style={styles.profilePicture}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.status}>Online</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed
          velit dui. Etiam auctor odio in dui ultrices eleifend.
        </Text>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          <Text style={styles.interest}>Photography</Text>
          <Text style={styles.interest}>Traveling</Text>
          <Text style={styles.interest}>Cooking</Text>
        </View>
      </View>
    </>
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

export default ProfileScreen;
