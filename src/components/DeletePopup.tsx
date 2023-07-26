import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';

type DeletePopupProps = {
  visible: boolean;
  onConfirm: any;
  onCancel: () => void;
};

const DeletePopup: React.FC<DeletePopupProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.text}>
            Are you sure you want to delete this message?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  confirmButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    marginLeft: 10,
  },
  cancelButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'gray',
    borderRadius: 4,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DeletePopup;
