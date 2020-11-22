import React, { useState } from 'react';
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
import { ScrollView } from 'react-native';

const locations = [{ name: 'Lira University' }];

const AddStage = (props) => {
  const [location, setLocation] = useState('Lira University');

  return (
    <View style={{ flex: 1 }}>
      <NavHeader navigation={props.navigation} title="STAGE DETAILS" />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: wp(10) }}>
          <Form>
            <Item floatingLabel>
              <Label>What's the name of the stage</Label>
              <Input />
            </Item>
          </Form>
        </View>
        <View
          style={{ flex: 1, marginHorizontal: wp(10), marginVertical: hp(2) }}
        >
          <Label>Select location of this stage</Label>
          <Select
            selectedValue={location}
            setSelectedValue={setLocation}
            items={locations}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: wp(10) }}>
          <Label>Short Description (optional)</Label>
          <Textarea rowSpan={5} bordered placeholder="About this stage" />
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: wp(10),
          marginVertical: hp(5),
          backgroundColor: '#000'
        }}
      >
        <Button full style={{ backgroundColor: colors.primary }}>
          <Text style={{ color: '#fff' }}>SAVE STAGE</Text>
        </Button>
      </View>
    </View>
  );
};

export default AddStage;
