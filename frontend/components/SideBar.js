import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Card,
  CardItem,
  Left,
  Right,
  Body,
} from 'native-base';
import { View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SideBar = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Card>
        <CardItem>
          <Body>
            <Image
              source={require('../assets/icon.png')}
              style={{ width: wp(30), height: wp(30) }}
            />
          </Body>
        </CardItem>
      </Card>

      <List>
        <ListItem button onPress={() => props.navigation.navigate('Home')}>
          <Text>Home</Text>
        </ListItem>
        <ListItem button onPress={() => props.navigation.navigate('Bodas')}>
          <Text>Bodas</Text>
        </ListItem>
        <ListItem button onPress={() => props.navigation.navigate('Account')}>
          <Text>Account</Text>
        </ListItem>
      </List>
    </View>
  );
};

export default SideBar;
