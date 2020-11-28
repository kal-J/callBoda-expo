import firebase from '../firebase';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isArray } from 'lodash';

const deleteBoda = (boda, stages, app_state, setAppState) => {
  const deleteFromLocalStorage = () => {
    return new Promise((resolve, reject) => {
      stages = stages || [];

      [...stages].forEach((stage, index) => {
        if (stage.id === boda.stage.id) {
          const oldStage = stage;
          stages[index] = {
            ...oldStage,
            get bodas() {
              if (oldStage.bodas) {
                // mutate old boda
                let o_stage_bodas = [...oldStage.bodas];

                oldStage.bodas.forEach((oldBoda, index) => {
                  if (oldBoda.id === boda.id) {
                    o_stage_bodas[index] = { ...boda, status: 'deleted' };
                  }
                });

                return [...o_stage_bodas];
              }

              return [{ ...boda, status: 'deleted' }];
            },
          };
        }
      });

      const jsonValue = JSON.stringify(stages);
      AsyncStorage.setItem('stages', jsonValue)
        .then(() => {
          setAppState({ ...app_state, stages: stages });
          return resolve(boda);
        })
        .catch(() => reject('Failed to save boda - #1'));
    });
  };

  return new Promise((resolve, reject) => {
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          firebase
            .firestore()
            .collection('stages')
            .doc('stages')
            .get()
            .then((doc) => {
              if (!doc.exists) {
                return reject('sorry, something went wrong, please try again');
              }
              const { stages } = doc.data();
              if (!stages) {
                return reject('sorry, something went wrong, please try again');
              }

              if (!isArray(stages)) {
                return reject('sorry, something went wrong, please try again');
              }

              const cloud_stages = [...stages];

              // check if boda exists
              const bodaExists = cloud_stages.filter((stage) => {
                if (stage.id === boda.stage.id) {
                  if (!stage.bodas) {
                    return false;
                  }
                  if (!isArray(stage.bodas)) {
                    return false;
                  }

                  const boda_in_stage = stage.bodas.filter((c_boda) => {
                    if (boda.id === c_boda.id) {
                      return true;
                    }
                  }).length;

                  return boda_in_stage;
                }
              }).length;

              if (!bodaExists) {
                return reject('sorry, something went wrong, please try again');
              }

              // delete from cloud
              [...stages].forEach((stage, index) => {
                if (stage.id === boda.stage.id) {
                  const oldStage = stage;
                  cloud_stages[index] = {
                    ...oldStage,
                    get bodas() {
                      if (oldStage.bodas) {
                        // mutate old boda
                        let o_stage_bodas = [...oldStage.bodas];

                        oldStage.bodas.forEach((oldBoda, index) => {
                          if (oldBoda.id === boda.id) {
                            o_stage_bodas[index] = {
                              ...boda,
                              status: 'deleted',
                            };
                          }
                        });

                        return [...o_stage_bodas];
                      }

                      return [{ ...boda, status: 'deleted' }];
                    },
                  };
                }
              });

              // save to cloud
              firebase
                .firestore()
                .collection('stages')
                .doc('stages')
                .set({
                  stages: [...cloud_stages],
                })
                .then(async () => {
                  await deleteFromLocalStorage();
                  return resolve({ ...boda, status: 'deleted' });
                })
                .catch((err) => {
                  return reject();
                });
            })
            .catch(() => {
              return reject('sorry, something went wrong, please try again');
            });
        } else {
          return reject(
            'No internet connection. You need an internet connection to delete a boda'
          );
        }
      })
      .catch(() => {
        return reject('sorry, something went wrong, please try again');
      });
  });
};

export default deleteBoda;