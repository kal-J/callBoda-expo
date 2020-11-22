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

const Bodas = (props) => {
  const stage = props.navigation.getParam('stage') || 'No stage selected';
  const bodas = props.navigation.getParam('bodas');
  return (
    <>
      <View style={{ flex: 1 }}>
        <NavHeader navigation={props.navigation} title={stage} />
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
                renderItem={({ item }) => {
                  const boda = item;
                  return (
                    <Card
                      key={`'yuuu'-${Math.random() * 9}`}
                      style={{ paddingVertical: 15 }}
                    >
                      <CardItem>
                        <View>
                          <View style={styles.place_center}>
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
                          <View style={styles.place_center}>
                            <Image
                              style={{
                                width: 150,
                                height: 150,
                                borderRadius: 75,
                              }}
                              source={{ uri: boda.profile_picture_url }}
                            />
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
                                call({ number: boda.tel, prompt: true }).catch(
                                  console.error
                                )
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
