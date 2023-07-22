import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type NotificationProps = {
  onPress: () => void;
};

const Notification: React.FC<NotificationProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.notificationContainer} onPress={onPress}>
      <Text style={styles.notificationText}>
        New message received! Tap to view
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Notification;
