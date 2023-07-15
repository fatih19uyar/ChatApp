import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {ConversationItemProps} from '../types/type';
import {useNavigation} from '@react-navigation/native';

interface ChatListScreenFormProps {
  onConversationPress: (name: string) => void;
}

const ConversationItem: React.FC<
  ConversationItemProps & ChatListScreenFormProps
> = ({name, message, timestamp, image, onConversationPress}) => {
  const [showModal, setShowModal] = useState(false);

  const openProfileModal = () => {
    setShowModal(true);
  };

  const closeProfileModal = () => {
    setShowModal(false);
  };

  const handleConversationPress = () => {
    onConversationPress(name);
  };

  return (
    <>
      <View style={styles.conversationItem}>
        <TouchableOpacity onPress={openProfileModal}>
          <Image source={image} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleConversationPress}>
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
          <Text style={styles.timestamp}>{timestamp}</Text>
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
            <Text style={styles.profileMessage}>{message}</Text>
            {/* Add more user details here */}
          </View>
        </View>
      </Modal>
    </>
  );
};

const ChatListScreenForm: React.FC<ChatListScreenFormProps> = ({
  onConversationPress,
}) => {
  const conversations: ConversationItemProps[] = [
    {
      id: '1',
      name: 'John Doe',
      message: 'Hello, how are you?',
      timestamp: '12:30 PM',
      image: require('../assets/profile-picture.png'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      message: 'Hey there! Are you free tonight?',
      timestamp: '11:45 AM',
      image: require('../assets/profile-picture.png'),
    },
  ];

  const renderConversationItem = ({item}: {item: ConversationItemProps}) => (
    <ConversationItem
      id={item.id}
      name={item.name}
      message={item.message}
      timestamp={item.timestamp}
      image={item.image}
      onConversationPress={onConversationPress}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={renderConversationItem}
      />
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
});

export default ChatListScreenForm;
