import {View, StyleSheet} from 'react-native';
import React from 'react';
import MessageItem from '../components/MessageItem';
import {MessageItemProps} from '../types/type';
import {FlatList} from 'react-native';
import {messages} from '../values/values';

type Props = {name: string};

const ChatScreenForms: React.FC<Props> = ({name}) => {
  const userMessages: MessageItemProps[] = messages.filter(
    (item: MessageItemProps) => item.sender === name,
  );

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
        data={userMessages}
        keyExtractor={(item: {id: any}) => item.id}
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
});

export default ChatScreenForms;
