import React, { useContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import firebase from '../firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container, Header, Item, Icon, Input, Button } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NavHeader from '../components/NavHeader';
import Stage from '../components/Stage';
import { View, FlatList } from 'react-native';
import colors from '../layouts/colors';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { StoreContext } from '../context';
import { Alert } from 'react-native';
import Error from '../components/Error';
import { isEqual, isArray } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createMaterialTopTabNavigator();

const Stages = (props) => {
  const { stages } = props;

  if (!stages.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', marginHorizontal: wp(2) }}>
          click the '+' button to add a new stage.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stages}
        keyExtractor={(item) => `${item.id}}`}
        renderItem={({ item }) => (
          <Stage navigation={props.navigation} stage={item} />
        )}
      />
    </View>
  );
};

const Map_stages = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Maps showing stages are not supported yet.</Text>
    </View>
  );
};

const Home = (props) => {
  const { app_state, setAppState } = useContext(StoreContext);
  const [error, setError] = useState(null);

  // listen for any updates to cloud storage and update local storage
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        firebase
          .firestore()
          .collection('stages')
          .doc('stages')
          .onSnapshot((doc) => {
            if (doc.exists) {
              const { stages } = doc.data();
              if (isArray(stages)) {
                if (stages.length) {
                  // get stages not yet uploaded
                  const stagesNotUploaded = app_state.stages.filter(
                    (local_stage) => {
                      const exists = stages.filter(
                        (cloud_stage) => local_stage.id === cloud_stage.id
                      ).length;
                      if (exists) {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  );

                  setAppState({
                    ...app_state,
                    stages: [...stages, ...stagesNotUploaded],
                  });

                  // update cloud storage if some stages are not uploaded yet
                  if (stagesNotUploaded.length) {
                    (() => {
                      try {
                        firebase
                          .firestore()
                          .collection('stages')
                          .doc('stages')
                          .set({
                            stages: [...stages, ...stagesNotUploaded],
                          });
                      } catch (error) {}
                    })();
                  }

                  // upate local storage
                  (async () => {
                    try {
                      const jsonValue = JSON.stringify([
                        ...stages,
                        ...stagesNotUploaded,
                      ]);
                      await AsyncStorage.setItem('stages', jsonValue);
                    } catch (e) {
                      setError(
                        'something went wrong while updating stages info'
                      );
                    }
                  })();
                }
              }
            }
          });
      }
    });

    return unsubscribe();
  }, []);

  useEffect(() => {
    let local_store_stages = [];
    let cloud_stages = [];

    // fetch stages from local storage

    (async () => {
      try {
        let stages = await AsyncStorage.getItem('stages');
        if (stages !== null) {
          stages = JSON.parse(stages);
          if (isArray(stages)) {
            if (stages.length) {
              local_store_stages = [...stages];

              if (!isEqual(stages, app_state.stages)) {
                setAppState({ ...app_state, stages });
              }
            }
          }
        }
      } catch (e) {
        setError('something went wrong, loading app data!');
      }
    })();

    // if there is an internet connection, sync cloud && local store
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        firebase
          .firestore()
          .collection('stages')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                // check if doc has an object with stages array
                const { stages } = doc.data();
                if (isArray(stages)) {
                  if (stages.length) {
                    cloud_stages = [...stages];
                  }
                }
              }
            });

            // compare stages in local storage with ones in the cloud and sync local && cloud
            let stagesNotUploaded = [];
            if (local_store_stages.length) {
              stagesNotUploaded = local_store_stages.filter((local_stage) => {
                // check if stage is saved to cloud db
                const isSaved = cloud_stages.filter((cloud_stage) =>
                  isEqual(cloud_stage, local_stage)
                ).length;

                if (isSaved) {
                  return false;
                } else {
                  return true;
                }
              });
            }

            // sync stages
            const syncedStages = [...cloud_stages, ...stagesNotUploaded];

            // update local storage with synced stages

            (async () => {
              try {
                const jsonValue = JSON.stringify(syncedStages);
                await AsyncStorage.setItem('stages', jsonValue);
              } catch (e) {
                setError('something went wrong while updating stages info');
              }
            })();

            // update app state with synced stages
            if (!isEqual(app_state.stages, syncedStages)) {
              setAppState({ ...app_state, stages: syncedStages });
            }

            // update cloud storage with synced stages
            firebase.firestore().collection('stages').doc('stages').set({
              stages: syncedStages,
            });
          });
      }
    });
  }, []);

  if (error) {
    return <Error setError={setError} message={error} />;
  }

  return (
    <Container>
      <NavHeader navigation={props.navigation} title="SELECT STAGE" />
      <View style={{ backgroundColor: colors.primary }}>
        <Header searchBar rounded style={{ backgroundColor: colors.primary }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="SEARCH BODA STAGES" />
          </Item>
        </Header>
      </View>

      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            // showIcon: true,
            activeTintColor: colors.primary,
            inactiveTintColor: 'gray',
            style: {},
            indicatorStyle: {
              backgroundColor: colors.primary,
            },
            labelStyle: {
              fontSize: 11,
            },
          }}
        >
          <Tab.Screen
            name="Stages"
            children={() => (
              <Stages {...props} stages={app_state.stages || []} />
            )}
          />
          <Tab.Screen name="Map" children={() => <Map_stages {...props} />} />
        </Tab.Navigator>
      </NavigationContainer>

      <View
        style={{
          paddingVertical: hp(2),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          elevation: 5,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            width: wp(14),
            height: wp(14),
            borderRadius: wp(7),
            elevation: 5,
          }}
          onPress={() => {
            Alert.alert(
              null,
              'Add a new stage or boda',
              [
                {
                  text: 'NEW STAGE',
                  onPress: () => {
                    props.navigation.navigate('AddStage');
                  },
                },
                {
                  text: 'NEW BODA',
                  onPress: () => {
                    props.navigation.navigate('AddBoda');
                  },
                },
                null,
              ],
              { cancelable: true }
            );
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Home;
