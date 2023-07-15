import React, {useState} from 'react';
import Background from '../components/Background';
import ChatListScreenForm from '../forms/ChatListScreenForm';
import ChatScreen from './ChatScreen';

const ChatListScreen: React.FC<any> = ({navigation}) => {
  const [userName, setUserName] = useState('');

  const onConversationPress = (name: string) => {
    console.log(name);
    setUserName(name);
  };

  return (
    <>
      {userName ? (
        <ChatScreen />
      ) : (
        <ChatListScreenForm onConversationPress={onConversationPress} />
      )}
    </>
  );
};

export default ChatListScreen;
