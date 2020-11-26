import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserUniqueID = () => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        let uId = AsyncStorage.getItem('userID');
        if (uId !== null) {
          return resolve(uId);
        }

        uId = `${Date.now()}-${Math.random() * 8}`;

        AsyncStorage.setItem('userID', uId)
          .then(() => {
            return resolve(uId);
          })
          .catch(() => {
            return reject();
          });
      } catch (error) {
        return reject();
      }
    })();
  });
};

export default getUserUniqueID;
