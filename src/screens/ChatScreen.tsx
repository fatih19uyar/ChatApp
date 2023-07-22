import React, {useEffect, useState} from 'react';
import TopBar from '../components/TopBar';
import ChatScreenForm from '../forms/ChatScreenForm';
import {firebase} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/stores';
import {v4 as uuidv4} from 'uuid';
import {Message} from '../types/type';

type ChatScreenProps = {
  navigation: any;
  route: any;
};

const ChatScreen: React.FC<ChatScreenProps> = ({navigation, route}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const {recipientUserID} = route.params;
  const senderUserID: string = useSelector<RootState, string>(
    state => state.authReducer.user?.id ?? '',
  );
  // Messages Firebase'den çekme işlemi
  useEffect(() => {
    const messagesRef = firebase.database().ref('messages');

    // Realtime Database'deki 'messages' düğümünde veri değişikliklerini takip ediyoruz
    messagesRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        // Veri mevcutsa yeni mesajlar var demektir
        const incomingMessages: Message[] = Object.values(data);
        // Mesajları gönderen ve alıcısına göre filtreleyip güncelliyoruz
        const filteredMessages = incomingMessages.filter(
          message =>
            (message.sender === senderUserID &&
              message.recipientUserID === recipientUserID) ||
            (message.sender === recipientUserID &&
              message.recipientUserID === senderUserID),
        );
        // setState ile mesajları güncelliyoruz
        setMessages(filteredMessages);
      } else {
        setMessages([]);
      }
    });

    // Component unmount olduğunda veri değişikliklerini dinlemeyi durduruyoruz
    return () => messagesRef.off('value');
  }, [senderUserID, recipientUserID]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(), // flatlist için otomatik key oluşturma
      sender: senderUserID, //gönderen kullanıcının id si
      recipientUserID: recipientUserID, // gönderilecek kullanıcının id si
      text: text, // gönderilecek olan mesaj
      time: Date.now().toString(), // mesaj gönderme zamanı
    };
    console.log('message', newMessage);
    try {
      firebase
        .database()
        .ref('messages') // 'messages' adlı bir düğüm (node) oluşturuyoruz
        .push(newMessage);
    } catch (error) {
      console.log(error);
    }
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  return (
    <>
      <TopBar navigation={navigation} profileStatus={true} backStatus={true} />
      <ChatScreenForm
        senderUserID={senderUserID}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default ChatScreen;
