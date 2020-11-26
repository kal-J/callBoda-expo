import React from 'react';
import NavHeader from '../components/NavHeader';
import FiveStarRating from '../components/FiveStarRating';
import {
  View,
  Button,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { Container, Content, Text, Icon, Card, CardItem } from 'native-base';
import colors from '../layouts/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import call from 'react-native-phone-call';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Bodas = (props) => {
  const stageName = props.navigation.getParam('stageName');
  const bodas = props.navigation.getParam('bodas');
  return (
    <>
      <View style={{ flex: 1 }}>
        <NavHeader
          navigation={props.navigation}
          title={stageName || 'NO STAGE SELECTED'}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: wp(5),
          }}
        >
          <View>
            <Text>All Bodas</Text>
          </View>
          <View style={{ flex: 1 }}>
            {bodas ? (
              <FlatList
                data={bodas}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => {
                  const boda = item;
                  return (
                    <Card style={{ paddingVertical: 15 }}>
                      <CardItem>
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                paddingVertical: 5,
                              }}
                            >
                              {boda.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              style={{
                                width: 150,
                                height: 150,
                                borderRadius: 75,
                              }}
                              source={
                                boda.photo_url
                                  ? { uri: boda.photo_url }
                                  : require('../assets/avatar-placeholder.png')
                              }
                            />
                          </View>
                          <View style={styles.place_center}>
                            <Text
                              style={{
                                color:
                                  boda.status === 'notVerified'
                                    ? colors.primary
                                    : 'blue',
                                fontSize: 12,
                                marginTop: hp(1),
                              }}
                            >
                              {boda.status}
                            </Text>
                          </View>
                          <View style={styles.place_center}>
                            <FiveStarRating rating={boda.rating} />
                          </View>
                          <View
                            style={[
                              styles.place_center,
                              {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 40,
                              },
                            ]}
                          >
                            <Button color={colors.primary} title="rate" />
                            <TouchableOpacity onPress={() => {}}>
                              <Icon
                                name="alert"
                                style={{ color: colors.primary }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                call({
                                  number: boda.mobileNo,
                                  prompt: true,
                                }).catch(console.error)
                              }
                            >
                              <Icon
                                name="call"
                                style={{ color: colors.primary }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </CardItem>
                    </Card>
                  );
                }}
              />
            ) : stageName ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text>Bodas not available for this stage.</Text>
                <Text>click the '+' button to add a Boda</Text>
              </View>
            ) : (
              Alert.alert('No stage selected, first select a stage')
            )}
          </View>
        </View>
      </View>

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
              "Click 'New Boda' to create and save a new Boda",
              [
                {
                  text: 'New Boda',
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
    </>
  );
};

const styles = StyleSheet.create({
  place_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Bodas;
