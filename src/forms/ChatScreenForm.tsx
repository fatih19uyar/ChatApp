import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {Message} from '../types/type';
import Notification from '../components/Notification';
import {convertTimestampToReadableDate} from '../utils/Time';

type Props = {
  messages: Message[];
  onSendMessage: (text: string) => void;
  senderUserID: string;
};

const ChatScreenForm: React.FC<Props> = ({
  messages,
  onSendMessage,
  senderUserID,
}) => {
  const [inputText, setInputText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // İlk açılış durumunu tutan değişken
  const [sentMessageCount, setSentMessageCount] = useState(0); // Gönderilen mesaj sayısını tutan değişken
  const flatListRef = useRef<FlatList>(null);

  // Mesajları zamanlarına göre sırala (en yeni en üstte olacak şekilde)
  const sortedMessages = messages
    .slice()
    .sort((a: any, b: any) => a.time - b.time);

  useEffect(() => {
    // Yeni mesaj geldiğinde bildirimi göster ve otomatik olarak en alta kaydır
    if (messages.length > 0) {
      setShowNotification(true);
      // İlk açılışta ve mesajlar yüklendiğinde scrollToEnd işlemini gerçekleştir
      if (initialLoad && flatListRef.current) {
        flatListRef.current.scrollToEnd({animated: true});
        setInitialLoad(false); // İlk açılış durumunu false olarak güncelle
      }
    }
  }, [messages, initialLoad]);

  const handleNotificationPress = () => {
    // Bildirime tıklandığında FlatList'i en alta kaydır
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
    setShowNotification(false); // Bildirimi gizle
  };

  const renderItem = ({item}: {item: Message}) => {
    const isSender = item.sender === senderUserID;
    const containerStyle = isSender
      ? styles.senderContainer
      : styles.receiverContainer;
    const textStyle = isSender ? styles.senderText : styles.receiverText;
    return (
      <View style={[styles.messageContainer, containerStyle]}>
        <Text style={textStyle}>{item.text}</Text>
        <Text style={styles.timeText}>
          {convertTimestampToReadableDate(parseInt(item.time))}
        </Text>
      </View>
    );
  };

  const onSendButtonPress = () => {
    if (inputText !== '') {
      onSendMessage(inputText);
      setInputText('');
      setSentMessageCount(count => count + 1);
    }
  };

  return (
    <View style={styles.container}>
      {showNotification && <Notification onPress={handleNotificationPress} />}
      <FlatList
        ref={flatListRef}
        data={sortedMessages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onContentSizeChange={() => {
          if (sentMessageCount > 0 && flatListRef.current) {
            flatListRef.current.scrollToEnd({animated: true});
          }
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={onSendButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C5',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  senderText: {
    fontSize: 16,
    color: 'black',
  },
  receiverText: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#888888',
  },
});

export default ChatScreenForm;
