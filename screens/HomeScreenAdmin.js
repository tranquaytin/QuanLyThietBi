import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: '1', title: 'Quản lý thiết bị', icon: 'list', screen: 'ListRooms' },
  { id: '2', title: 'Quét QR thiết bị', icon: 'qrcode' },
  { id: '3', title: 'Danh sách người dùng', icon: 'user-o', screen: 'ListUser' },
  { id: '4', title: 'Hồ sơ', icon: 'user-circle-o', screen: 'MyProfileAdmin' },
  { id: '5', title: 'Đăng xuất', icon: 'arrow-circle-left' },
];

const HomeScreenAdmin = ({ route }) => {
  const navigation = useNavigation();
  const { fullname } = route.params || {};

  const renderItem = ({ item }) => {
    const itemBackgroundColor = item.id === '1' ? '#e1d7f0' : '#f6f1f9';
    const borderRadius = item.id === '1' ? 30 : 0;

    const onPressItem = () => {
      console.log(`Pressed item: ${item.title}`);
      if (item.screen) {
        console.log(`Navigate to screen: ${item.screen}`);
        navigation.navigate(item.screen, { fullname });
      } else if (item.id === '5') {
        console.log('Logging out...');
        alert('Bạn đã đăng xuất thành công.', [
              navigation.navigate('Login')
        ]);
      }
    };

    return (
      <TouchableOpacity style={[styles.item, { backgroundColor: itemBackgroundColor, borderRadius }]} onPress={onPressItem}>
        <Icon name={item.icon} size={24} color="#000" />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f1f9',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default HomeScreenAdmin;
