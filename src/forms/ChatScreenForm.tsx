import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type Message = {
  id: string;
  sender: string;
  text: string;
};

type ChatScreenProps = {
  messages: Message[];
  onSendMessage: (text: string) => void;
};

const ChatScreen: React.FC<ChatScreenProps> = ({messages, onSendMessage}) => {
  const [inputText, setInputText] = React.useState('');

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        text: inputText,
      };

      try {
        // Firebase Firestore bağlantısını al
        // const db = firebase.getApp();

        // Yeni mesajı Firestore'a ekle
        //   await db.collection('messages').add(newMessage);

        // Mesajı gönderme işlevini tetikle
        onSendMessage(inputText);

        // Metin girişini temizle
        setInputText('');
      } catch (error) {
        console.error('Mesaj gönderilirken bir hata oluştu:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'me'
                ? styles.myMessageBubble
                : styles.otherMessageBubble,
            ]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  myMessageBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessageBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3777F0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ChatScreen;
