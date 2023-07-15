import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';

interface MessageItemProps {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  image: number;
}

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

const ChatScreen: React.FC = () => {
  const messages: MessageItemProps[] = [
    {
      id: '1',
      sender: 'John Doe',
      message: 'Hello, how are you?',
      timestamp: '12:30 PM',
      image: require('../assets/profile-picture.png'),
    },
    {
      id: '2',
      sender: 'Jane Smith',
      message: "I'm good, thank you! How about you?",
      timestamp: '12:35 PM',
      image: require('../assets/profile-picture.png'),
    },
    {
      id: '3',
      sender: 'John Doe',
      message: "I'm doing well too. Any plans for the weekend?",
      timestamp: '12:37 PM',
      image: require('../assets/profile-picture.png'),
    },
    // Add more messages here
  ];

  const renderMessageItem = ({item}: {item: MessageItemProps}) => (
    <MessageItem
      id={item.id}
      sender={item.sender}
      message={item.message}
      timestamp={item.timestamp}
      image={item.image}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messageList}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messageList: {
    padding: 20,
  },
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

export default ChatScreen;
