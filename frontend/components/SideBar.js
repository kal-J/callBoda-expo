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
const routes = ['Stages', 'Bodas', 'Account'];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <View>
          <Card>
            <CardItem>
              <Body>
                <Image source={require('../assets/icon.png')} />
              </Body>
            </CardItem>
          </Card>

          <List
            dataArray={routes}
            renderRow={(data) => {
              return (
                <ListItem
                  key={`${Math.random() * 9}`}
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </View>
      </Container>
    );
  }
}
