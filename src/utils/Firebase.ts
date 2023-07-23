import auth from '@react-native-firebase/auth';

export const getUserEmail = async (uid: string) => {
  try {
    const currentUser = auth().currentUser;
    if (currentUser?.uid === uid) {
      const email = currentUser.email;
      return email;
    } else {
      console.log('Kullanıcı bulunamadı.');
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
