import firebase from '../firebase';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const editBoda = (boda, stages) => {
  return new Promise((resolve, reject) => {
    const saveToLocalStorage = () => {
      stages = stages || [];

      stages.forEach((stage, index) => {
        if (stage.id === boda.stage.id) {
          console.log('### executing 1');

          const oldStage = stage;
          stages[index] = {
            ...oldStage,
            get bodas() {
              if (oldStage.bodas) {
                // mutate old boda
                let o_stage_bodas = [...oldStage.bodas];

                oldStage.bodas.forEach((oldBoda, index) => {
                  if (oldBoda.id === boda.id) {
                    o_stage_bodas[index] = { ...boda };
                  }
                });

                return [...o_stage_bodas];
              }

              return [boda];
            },
          };
        }
      });

      const jsonValue = JSON.stringify(stages);
      AsyncStorage.setItem('stages', jsonValue)
        .then(() => {
          return resolve(boda);
        })
        .catch(() => reject('Failed to save boda - #1'));
    };

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        firebase
          .firestore()
          .collection('stages')
          .doc('stages')
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (isArray(doc.data().stages)) {
                let cloud_boda_stages = doc.data().stages;

                // check if boda's stage exists in cloud data

                const isStageSavedToCloud = cloud_boda_stages.filter(
                  (stage) => stage.id === boda.stage.id
                ).length;
                if (!isStageSavedToCloud) {
                  return saveToLocalStorage();
                }

                // check if cloud stages have this boda
                const stagesHaveBoda = cloud_boda_stages.filter((stage) => {
                  if (stage.id === boda.stage.id) {
                    if (stage.bodas) {
                      const bodaExists = stage.bodas.filter(
                        (c_boda) => boda.id === c_boda.id
                      ).length;
                      bodaExists ? true : false;
                    } else {
                      return false;
                    }
                  }
                }).length;

                if (!stagesHaveBoda) {
                  return saveToLocalStorage();
                }

                // mutate selected cloud_boda_stage
                let mutatedStages = [...cloud_boda_stages];
                cloud_boda_stages.forEach((stage, index) => {
                  if (stage.id === boda.stage.id) {
                    const oldStage = stage;
                    mutatedStages[index] = {
                      ...oldStage,
                      get bodas() {
                        if (oldStage.bodas) {
                          // mutate old boda
                          let o_stage_bodas = [...oldStage.bodas];

                          oldStage.bodas.forEach((oldBoda, index) => {
                            if (oldBoda.id === boda.id) {
                              o_stage_bodas[index] = {
                                ...boda,
                                local_photo: null,
                              };
                            }
                          });
                          return [...o_stage_bodas];
                        }
                        return [{ ...boda, local_photo: null }];
                      },
                    };
                  }
                });

                firebase
                  .firestore()
                  .collection('stages')
                  .doc('stages')
                  .set({
                    stages: [...mutatedStages],
                  })
                  .then(() => {
                    return resolve(boda);
                  });
              }
            }
          })
          .catch((error) => {
            // if error , save to local storage
            saveToLocalStorage();
          });
      } else {
        // save to local storage
        saveToLocalStorage();
      }
    });
  });
};

export default editBoda;
