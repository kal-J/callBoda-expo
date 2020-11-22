import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../layouts/colors';
const Select = (props) => {
  const { selectedValue, setSelectedValue, items } = props;
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{width: wp(70) }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {items.map((item, index) => {
          return (
            <Picker.Item key={index} color={colors.primary} label={item.name} value={item.name} />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Select;
