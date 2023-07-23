import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

export const getUserEmail = async (uid: string) => {
  try {
    const currentUser = auth().currentUser;

    if (currentUser && currentUser.uid === uid) {
      const email = currentUser.email;
      return email || 'Empty'; // E-posta adresi yoksa "Empty" döndür
    } else {
      console.log('Kullanıcı bulunamadı.');
      return 'Empty';
    }
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export const createUserProfile = async (uid: string, username: string) => {
  try {
    const userProfile = {
      username: username,
      createdTime: firebase.database.ServerValue.TIMESTAMP, // Oluşturma zamanını Firebase sunucusu tarafından otomatik olarak belirleyin
    };
    await firebase.database().ref('users').child(uid).set(userProfile);
    console.log('Kullanıcı profili oluşturuldu:', userProfile);
  } catch (error) {
    console.log('Kullanıcı profili oluşturulamadı:', error);
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const snapshot = await firebase
      .database()
      .ref('users')
      .orderByChild('username')
      .equalTo(username)
      .once('value');

    const users = snapshot.val();
    if (users) {
      // Veritabanında kullanıcı adı eşleşen kullanıcı varsa, uid'sini döndür
      const userId = Object.keys(users)[0];
      return userId;
    } else {
      // Eşleşen kullanıcı yoksa null döndür
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const snapshot = await firebase
      .database()
      .ref('users')
      .child(id)
      .once('value');

    const user = snapshot.val();
    if (user) {
      // Veritabanında kullanıcı id'si eşleşen kullanıcı varsa, username'ini döndür
      const username = user.username;
      return username;
    } else {
      // Eşleşen kullanıcı yoksa null döndür
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
