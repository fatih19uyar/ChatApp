import React, {useEffect, useState} from 'react';
import TopBar from '../components/TopBar';
import ChatScreenForm from '../forms/ChatScreenForm';
import {firebase} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/stores';
import {Message} from '../types/type';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

type ChatScreenProps = {
  navigation: any;
  route: any;
};

const ChatScreen: React.FC<ChatScreenProps> = ({navigation, route}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const {recipientUserID, recipientUserName} = route.params;
  const senderUserID: string = useSelector<RootState, string>(
    state => state.authReducer.user?.id ?? '',
  );
  // Messages Firebase'den çekme işlemi
  useEffect(() => {
    let messagesRef = database().ref('/messages/');

    // Verileri çek ve snapshot değerine eriş
    messagesRef.once('value').then(snapshot => {
      const transformedData: Message[] = Object.entries(snapshot.val()).map(
        ([id, data]: [string, any]) => ({
          id,
          ...data,
        }),
      );
      console.log('s', transformedData);
      if (transformedData) {
        // Veri mevcutsa yeni mesajlar var demektir
        const incomingMessages: Message[] = Object.values(transformedData);
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

    // Realtime Database'deki 'messages' düğümünde veri değişikliklerini takip ediyoruz
    messagesRef.on('value', snapshot => {
      if (snapshot.val()) {
        const transformedData: Message[] = Object.entries(snapshot.val()).map(
          ([id, data]: [string, any]) => ({
            id,
            ...data,
          }),
        );
        if (transformedData) {
          // Veri mevcutsa yeni mesajlar var demektir
          const incomingMessages: Message[] = Object.values(transformedData);
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
      }
    });

    // Component unmount olduğunda veri değişikliklerini dinlemeyi durduruyoruz
    return () => messagesRef.off('value');
  }, [senderUserID, recipientUserID]);

  const updateisReadMessage = async (item: any) => {
    await database()
      .ref('/messages/')
      .child(item.id)
      .update({
        isRead: true,
      })
      .then(() => {
        console.log('Message read updated.');
        // messages dizisindeki ilgili mesajın isRead alanını güncelle
        setMessages(prevMessages =>
          prevMessages.map((message: any) =>
            message.id === item.id ? {...message, isRead: true} : message,
          ),
        );
      });
  };
  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      sender: senderUserID,
      recipientUserID: recipientUserID,
      text: text,
      time: Date.now().toString(),
      isRead: false,
    };
    const messageId = String(uuid.v4());
    const updatedMessage: any = {
      id: messageId,
      ...newMessage,
    };
    try {
      // 'messages' düğümüne yeni mesajı ekleyin
      database()
        .ref('/messages/')
        .child(messageId)
        .set(newMessage)
        .then(() => console.log('Data set.'));
      // Gönderenin altında alıcının son mesajını güncelleyin
      firebase
        .database()
        .ref('lastMessages')
        .child(senderUserID)
        .child(recipientUserID)
        .set({
          text: text,
          time: Date.now().toString(),
          isRead: false,
        });
      // Alıcının altında gönderenin son mesajını güncelleyin
      firebase
        .database()
        .ref('lastMessages')
        .child(recipientUserID)
        .child(senderUserID)
        .set({
          text: text,
          time: Date.now().toString(),
          isRead: false,
        });
    } catch (error) {
      console.log(error);
    }

    setMessages(prevMessages => [...prevMessages, updatedMessage]);
  };
  return (
    <>
      <TopBar
        navigation={navigation}
        profileStatus={true}
        backStatus={true}
        text={'Chat On ' + recipientUserName}
      />
      <ChatScreenForm
        senderUserID={senderUserID}
        messages={messages}
        onSendMessage={handleSendMessage}
        updateisReadMessage={updateisReadMessage}
      />
    </>
  );
};

export default ChatScreen;
