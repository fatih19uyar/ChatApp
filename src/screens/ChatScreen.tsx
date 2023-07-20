import React, {useEffect} from 'react';
import TopBar from '../components/TopBar';
import ChatScreenForm from '../forms/ChatScreenForm';
import {firebase} from '@react-native-firebase/database';

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

  useEffect(() => {
    // Firebase veritabanından users düğümündeki veriyi çekiyoruz
    firebase
      .database()
      .ref('/users')
      .once('value')
      .then(snapshot => {
        const usersData = snapshot.val();
        if (usersData) {
          // Çekilen veriyi User[] tipindeki state'e atıyoruz
          const users: any = usersData;
          console.log(users);
        }
      })
      .catch(error => {
        console.log('Error fetching users data: ', error);
      });
  }, []);

  return (
    <>
      <TopBar navigation={navigation} profileStatus={true} backStatus={true} />
      <ChatScreenForm messages={messages} onSendMessage={handleSendMessage} />
    </>
  );
};

export default ChatScreen;
