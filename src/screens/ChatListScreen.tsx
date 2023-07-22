import React from 'react';
import ChatListScreenForm from '../forms/ChatListScreenForm';
import TopBar from '../components/TopBar';

const ChatListScreen: React.FC<any> = ({navigation}) => {
  const selectedUser = (id: string) => {
    console.log(id);
    navigation.navigate('ChatScreen', {recipientUserID: id});
  };
  return (
    <>
      <TopBar navigation={navigation} profileStatus={true} backStatus={false} />
      <ChatListScreenForm selectedUser={selectedUser} />
    </>
  );
};

export default ChatListScreen;
