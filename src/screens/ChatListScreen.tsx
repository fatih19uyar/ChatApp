import React, {useEffect, useState} from 'react';
import ChatListScreenForm from '../forms/ChatListScreenForm';
import TopBar from '../components/TopBar';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/stores';
import {firebase} from '@react-native-firebase/database';
import {LastMessageData} from '../types/type';
import {Snackbar} from 'react-native-paper';

const ChatListScreen: React.FC<any> = ({navigation}) => {
  const senderUserID: string = useSelector<RootState, string>(
    state => state.authReducer.user?.id ?? '',
  );

  const [lastMessage, setLastMessage] = useState<LastMessageData[] | null>([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const selectedUser = (id: string) => {
    if (id) navigation.navigate('ChatScreen', {recipientUserID: id});
    else {
      setTimeout(() => {
        showSnackbar('No Found User');
      }, 300);
    }
  };

  useEffect(() => {
    const lastMessageRef = firebase
      .database()
      .ref('lastMessages')
      .child(senderUserID);

    const handleLastMessageChange = (snapshot: any) => {
      // DataSnapshot türü yerine any kullanılıyor.
      const lastMessageData: {[key: string]: LastMessageData} = snapshot.val();
      if (!lastMessageData) {
        setLastMessage([]);
      } else {
        const dataArray: {id: string; text: string; time: string}[] =
          Object.entries(lastMessageData).map(
            ([id, messageData]: [string, LastMessageData]) => ({
              id,
              text: messageData.text,
              time: messageData.time,
            }),
          );

        setLastMessage(dataArray);
      }
    };

    lastMessageRef.on('value', handleLastMessageChange);

    // clean-up fonksiyonu, olay dinleyicisini kaldırır
    return () => {
      lastMessageRef.off('value', handleLastMessageChange);
    };
  }, [senderUserID]);

  return (
    <>
      <TopBar navigation={navigation} profileStatus={true} backStatus={false} />
      <ChatListScreenForm
        selectedUser={selectedUser}
        lastMessage={lastMessage}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

export default ChatListScreen;
