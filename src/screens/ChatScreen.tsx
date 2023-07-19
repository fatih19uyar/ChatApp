import React from 'react';
import TopBar from '../components/TopBar';
import ChatScreenForm from '../forms/ChatScreenForm';

type Props = {
  navigation: any;
  route: any;
};
type Message = {
  id: string;
  sender: string;
  text: string;
};

const ChatScreen: React.FC<Props> = ({navigation, route}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: text,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <>
      <TopBar navigation={navigation} profileStatus={true} backStatus={true} />
      <ChatScreenForm messages={messages} onSendMessage={handleSendMessage} />
    </>
  );
};

export default ChatScreen;
