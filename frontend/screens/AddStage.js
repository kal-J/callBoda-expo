import React from 'react';
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
} from 'native-base';
import NavHeader from '../components/NavHeader';
import Stage from '../components/Stage';
import { View, FlatList } from 'react-native';
import colors from '../layouts/colors';
import { Text } from 'react-native';

const AddStage = (props) => {
  return (
    <Container>
      <NavHeader navigation={props.navigation} title="ADD STAGE" />
      <View style={{ flex: 1, paddingHorizontal: wp(10) }}>
        <Form>
          <Item floatingLabel>
            <Label>Stage Name</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Location</Label>
            <Input />
          </Item>
        </Form>
      </View>

      <View
        style={{
          position: 'absolute',
          right: wp(10),
          left: wp(10),
          bottom: hp(5),
        }}
      >
        <Button full style={{ backgroundColor: colors.primary }}>
          <Text style={{ color: '#fff' }}>SUBMIT</Text>
        </Button>
      </View>
    </Container>
  );
};

export default AddStage;
