import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Container, Header, Item, Icon, Input } from 'native-base';
import NavHeader from '../components/NavHeader';
import Stage from '../components/Stage';
import { View, FlatList } from 'react-native';
import colors from '../layouts/colors';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

const STAGES = [
  {
    id: 1,
    name: 'Lira University Trading Center',
    bodas: [
      {
        id: 1,
        name: 'Morris',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      },
      {
        id: 2,
        name: 'Okello',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 2,
    name: 'st. Peters Hostel',
    bodas: [
      {
        id: 1,
        name: 'Morris',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      },
      {
        id: 2,
        name: 'Okello',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 3,
    name: 'Lira University Health Faculty',
    bodas: [
      {
        id: 1,
        name: 'Morris',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      },
      {
        id: 2,
        name: 'Okello',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
  {
    id: 4,
    name: 'Okullu Pub, Barapwo Lira',
    bodas: [
      {
        id: 1,
        name: 'Morris',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1565884280295-98eb83e41c65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      },
      {
        id: 2,
        name: 'Okello',
        tel: '0787113924',
        rating: 5,
        profile_picture_url:
          'https://images.unsplash.com/photo-1572316787289-4d87404eea4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      },
    ],
  },
];

const Stages = (props) => {
  return (
    <Container>
      <NavHeader navigation={props.navigation} title="SELECT STAGE" />
      <View style={{ backgroundColor: colors.primary }}>
        <Header searchBar rounded style={{ backgroundColor: colors.primary }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="search" />
          </Item>
        </Header>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={STAGES}
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
      <View
        style={{
          position: 'absolute',
          right: wp(10),
          bottom: hp(5),
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.light,
            paddingVertical: hp(2),
            paddingHorizontal: wp(4),
            borderRadius: hp(2),
            elevation: 10,
          }}
          onPress={() => {
            props.navigation.navigate('AddStage');
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>+</Text>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            ADD NEW STAGE
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Stages;
