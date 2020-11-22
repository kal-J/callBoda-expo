import React, { useContext, useState } from 'react';
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

const Tab = createMaterialTopTabNavigator();

const Stages = (props) => {
  const { app_state } = useContext(StoreContext);
  const { stages } = app_state;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stages}
        renderItem={({ item }) => (
          <Stage
            key={`jhkjjhjjk-${item.id}`}
            name={item.name}
            bodas={item.bodas}
            id={item.id}
            navigation={props.navigation}
          />
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
  return (
    <Container>
      <NavHeader navigation={props.navigation} title="SELECT STAGE" />
      <View style={{ backgroundColor: colors.primary }}>
        <Header searchBar rounded style={{ backgroundColor: colors.primary }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="search stages : type a stage name" />
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
          <Tab.Screen name="Stages" children={() => <Stages {...props} />} />
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
