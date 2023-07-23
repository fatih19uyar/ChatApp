import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ConversationItemProps} from '../types/type';
import {getUserByUsername} from '../utils/Firebase';

interface ChatListScreenFormProps {
  selectedUser: (id: string, name: string) => void;
  lastMessage: any;
}

const ConversationItem: React.FC<
  ConversationItemProps & ChatListScreenFormProps
> = ({id, name, text, time, image, selectedUser}) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  const openProfileModal = () => {
    setShowModal(true);
  };

  const closeProfileModal = () => {
    setShowModal(false);
  };

  const handleConversationPress = () => {
    selectedUser(id, name);
  };

  return (
    <>
      <View style={styles.conversationItem}>
        <TouchableOpacity onPress={openProfileModal}>
          <Image source={image} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity key={id} onPress={handleConversationPress}>
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}>{text}</Text>
          </View>
          <Text style={styles.timestamp}>{time}</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={closeProfileModal}
          />
          <View style={styles.profileModal}>
            {/* User profile details */}
            <Image source={image} style={styles.profileImage} />
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileMessage}>{text}</Text>
            {/* Add more user details here */}
            <KeyboardAvoidingView behavior="padding">
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
              />
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const ChatListScreenForm: React.FC<ChatListScreenFormProps> = ({
  selectedUser,
  lastMessage,
}) => {
  const [showStartChatModal, setShowStartChatModal] = useState(false);
  const [username, setUsername] = useState('');

  const openStartChatModal = () => {
    setShowStartChatModal(true);
  };

  const closeStartChatModal = () => {
    setShowStartChatModal(false);
  };

  const handleStartChat = async (username: string) => {
    if (username !== '') {
      const userId: any = await getUserByUsername(username);
      closeStartChatModal();
      selectedUser(userId, username);
    }
  };
  const renderConversationItem = ({item}: {item: ConversationItemProps}) => {
    return (
      <ConversationItem
        id={item.id}
        name={item.name}
        text={item.text}
        time={item.time}
        image={require('../assets/profile-picture.png')}
        selectedUser={selectedUser}
        lastMessage={undefined}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lastMessage}
        keyExtractor={item => item.id}
        renderItem={renderConversationItem}
      />
      <TouchableOpacity
        style={styles.startChatButton}
        onPress={openStartChatModal}>
        <Text style={styles.startChatButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={showStartChatModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={closeStartChatModal}
          />
          <View style={styles.startChatModal}>
            <Text style={styles.startChatTitle}>Start a Chat</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              onChangeText={setUsername}
            />
            <TouchableOpacity
              style={styles.startChatSubmitButton}
              onPress={() => handleStartChat(username)}>
              <Text style={styles.startChatSubmitButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#888888',
  },
  timestamp: {
    fontSize: 12,
    color: '#888888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileModal: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileMessage: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    width: 200,
  },
  startChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  startChatButtonText: {
    fontSize: 32,
    color: 'white',
    lineHeight: 32,
  },
  startChatModal: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  startChatTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startChatSubmitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 120,
    alignItems: 'center',
  },
  startChatSubmitButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ChatListScreenForm;
