import React, { useState, useContext } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Container,
  Header,
  Item,
  Icon,
  Input,
  Button,
  Form,
  Label,
  Textarea,
} from 'native-base';
import NavHeader from '../components/NavHeader';
import Stage from '../components/Stage';
import { View, FlatList } from 'react-native';
import colors from '../layouts/colors';
import { Text } from 'react-native';
import Select from '../components/Select';
import { StoreContext } from '../context';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';

const AddBoda = (props) => {
  const { app_state, setAppState } = useContext(StoreContext);
  const [newBoda, setNewBoda] = useState({});
  const { stages } = app_state;

  const selectPhoto = async () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          return alert(
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }
    })();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setNewBoda({ ...newBoda, photo: result });
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <NavHeader navigation={props.navigation} title="ADD BODA" />
        <View style={{ flex: 1, paddingHorizontal: wp(10) }}>
          <Form>
            <Item floatingLabel>
              <Label>Enter name</Label>
              <Input
                value={newBoda.name || ''}
                onChangeText={(name) => setNewBoda({ ...newBoda, name })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Telephone Number</Label>
              <Input
                value={newBoda.mobileNo || ''}
                onChangeText={(mobileNo) =>
                  setNewBoda({ ...newBoda, mobileNo })
                }
              />
            </Item>

            <View style={{ flex: 1, paddingTop: hp(3) }}>
              <Label>Select stage the Boda belongs to : </Label>

              <Select
                selectedValue={newBoda.stage}
                setSelectedValue={setNewBoda}
                items={stages}
                previous_state={newBoda}
                newValue={'stage'}
              />
            </View>
          </Form>
        </View>

        <View
          style={{ flex: 1, paddingHorizontal: wp(10), flexDirection: 'row' }}
        >
          {newBoda.photo ? (
            <View
              style={{
                height: hp(16),
                width: hp(16),
                borderRadius: hp(8),
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: newBoda.photo.uri }}
                style={{ width: hp(16), height: hp(16), borderRadius: hp(8) }}
              />
            </View>
          ) : (
            <View
              style={{
                height: hp(16),
                width: hp(16),
                borderRadius: hp(8),
                backgroundColor: '#000',
              }}
            ></View>
          )}

          <View
            style={{
              height: hp(16),
              justifyContent: 'center',
              paddingHorizontal: wp(4),
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.primary,
                padding: wp(4),
              }}
              onPress={() => selectPhoto()}
            >
              <Text>Select Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: wp(10), marginTop: hp(2) }}>
          <Label>Boda's Bio (optional) </Label>
          <Textarea
            rowSpan={4}
            bordered
            placeholder="About this Boda Guy..."
            value={newBoda.bio || ''}
            onChangeText={(bio) => setNewBoda({ ...newBoda, bio })}
          />
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: wp(10),
          marginVertical: hp(5),
        }}
      >
        <Button
          full
          style={{ backgroundColor: colors.primary }}
          onPress={() => {
            if (newBoda.name === '' || !newBoda.name) {
              setError('Name is a required field');
              return;
            }
            if (newBoda.mobileNo === '' || !newBoda.mobileNo) {
              setError('Telephone number is a required field');
              return;
            }

            // save newBoda to cloud if there is an internet connection, else save to local storage
          }}
        >
          <Text style={{ color: '#fff' }}>ADD BODA</Text>
        </Button>
      </View>
    </>
  );
};

export default AddBoda;
