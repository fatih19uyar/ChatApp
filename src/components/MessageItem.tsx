import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {MessageItemProps} from '../types/type';

const MessageItem: React.FC<MessageItemProps> = ({
  sender,
  message,
  timestamp,
  image,
}) => {
  return (
    <View style={styles.messageItem}>
      <Image source={image} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.sender}>{sender}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  sender: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 12,
    color: '#888888',
  },
  timestamp: {
    fontSize: 10,
    color: '#888888',
    marginLeft: 10,
  },
});

export default MessageItem;
