import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import colors from '../layouts/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Stage = (props) => {
  return (
    <TouchableOpacity
      style={{ margin: wp(4) }}
      onPress={() =>
        props.navigation.navigate({
          routeName: 'Bodas',
          params: {
            stage: props.name,
            bodas: props.bodas,
          },
        })
      }
    >
      <Card>
        <CardItem>
          <Text style={{ fontWeight: 'bold' }}>{props.name}</Text>
        </CardItem>
        <CardItem
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
          }}
        >
          <Text>No. of Bodas: 10</Text>

          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text>Top rated Boda:</Text>
            <Text style={{ color: colors.primary, marginLeft: wp(1) }}>
              Okello
            </Text>
          </TouchableOpacity>

          <Text>Stage rating: 5 stars</Text>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default Stage;
