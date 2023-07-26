import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ConversationItemProps} from '../types/type';

type DeletePopupProps = {
  visible: boolean;
  onClose: any;
  profile: ConversationItemProps;
};

const ProfilePopup: React.FC<DeletePopupProps> = ({
  visible,
  onClose,
  profile,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <View style={styles.profileModal}>
          {/* User profile details */}
          <Image source={profile.image} style={styles.profileImage} />
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileMessage}>{profile.text}</Text>
          <Text style={styles.profileMessage}>
            Create Time : {profile.time}
          </Text>
          {/* Add more user details here */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ProfilePopup;
