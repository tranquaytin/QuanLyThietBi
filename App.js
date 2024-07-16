import { StatusBar } from 'react-native';
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import Addroom from './screens/Addroom';
import AddService from './screens/AddService';
import DetailService from './screens/DetailService';
import ListRooms from './screens/ListRooms';
import ListServices from './screens/ListServices';
import ListDetailService from './screens/ListDetailServices';
import UpdateDetail from './screens/UpdateDetail';
import MyServices from './screens/MyServices';
import MyDetailServices from './screens/MyDetailServices';
import Error from './screens/Error';
import HomeScreenAdmin from './screens/HomeScreenAdmin';
import MyProfile from './screens/MyProfile';
import MyProfileAdmin from './screens/MyProfileAdmin';
import ListUser from './screens/ListUser';
import AddUsers from './screens/AddUsers';
import UpdateUsers from './screens/UpdateUsers';

import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{title: 'Đăng Ký', headerTitleAlign: 'center'}} name='Register' component={RegisterScreen} />
        <Stack.Screen options={{title: 'Trang Chủ', headerTitleAlign: 'center', headerLeft: () => null}} name='HomeScreen' component={HomeScreen} />
        <Stack.Screen options={{title: 'Thêm Phòng', headerTitleAlign: 'center'}} name='Addroom' component={Addroom}/>
        <Stack.Screen options={{title: 'Thêm Loại Thiết Bị', headerTitleAlign: 'center'}} name='AddService' component={AddService}/>
        <Stack.Screen options={{title: 'Thêm Chi Tiết Thiết Bị', headerTitleAlign: 'center'}} name='DetailService' component={DetailService}/>
        <Stack.Screen options={({ navigation }) => ({ title: 'Danh Sách Phòng', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('Addroom')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListRooms' component={ListRooms}
        />
        <Stack.Screen options={({ navigation }) => ({ title: 'Danh Sách Thiết Bị', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('AddService')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListServices' component={ListServices}
        />
        <Stack.Screen options={({ navigation }) => ({ title: 'Thiết Bị', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('DetailService')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListDetailService' component={ListDetailService}
        />
        <Stack.Screen options={{title: 'Chi Tiết Thiết Bị', headerTitleAlign: 'center'}} name='UpdateDetail' component={UpdateDetail}/>
        <Stack.Screen options={{title: 'Thiết Bị Của Tôi', headerTitleAlign: 'center'}} name='MyServices' component={MyServices}/>
        <Stack.Screen options={{ headerShown: false }} name='MyDetailServices' component={MyDetailServices}/>
        <Stack.Screen options={{title: 'Trở về'}} name='Error' component={Error}/>
        <Stack.Screen options={{title: 'Trang Chủ', headerTitleAlign: 'center', headerLeft: () => null}} name='HomeScreenAdmin' component={HomeScreenAdmin}/>
        <Stack.Screen options={{title: 'Hồ Sơ Cá Nhân', headerTitleAlign: 'center'}} name='MyProfile' component={MyProfile}/>
        <Stack.Screen options={{title: 'Hồ Sơ Cá Nhân', headerTitleAlign: 'center'}} name='MyProfileAdmin' component={MyProfileAdmin}/>

        <Stack.Screen options={({ navigation }) => ({ title: 'Danh Sách Người Dùng', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('AddUsers')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListUser' component={ListUser}
        />
        <Stack.Screen options={{title: 'Thêm Người Dùng', headerTitleAlign: 'center'}} name='AddUsers' component={AddUsers} />
        <Stack.Screen options={{title: 'Chi Tiết Người Dùng', headerTitleAlign: 'center'}} name='UpdateUsers' component={UpdateUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
