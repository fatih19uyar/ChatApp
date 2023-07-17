import React, {useState} from 'react';
import Background from '../components/Background';
import ChatListScreenForm from '../forms/ChatListScreenForm';
import TopBar from '../components/TopBar';

const ChatListScreen: React.FC<any> = ({navigation}) => {
  const selectedUser = (name: string) => {
    console.log(name);
    navigation.navigate('ChatScreen', {selectedName: name});
  };

  return (
    <>
      <TopBar navigation={navigation} profileStatus={true} backStatus={false} />
      <ChatListScreenForm selectedUser={selectedUser} />
    </>
  );
};

export default ChatListScreen;
