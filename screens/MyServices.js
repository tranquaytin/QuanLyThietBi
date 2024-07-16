import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase';

const MyServices = ({ route }) => {
  const [services, setServices] = useState([]);
  const { fullname } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    const db = getFirestore();

    const fetchServices = async () => {
      const q = query(collection(db, 'detailservices'), where('userName', '==', fullname));
      const querySnapshot = await getDocs(q);
      const servicesList = [];
      querySnapshot.forEach((doc) => {
        servicesList.push({
          id: doc.id,
          nameService: doc.data().nameService,
        });
      });
      setServices(servicesList);
    };

    fetchServices();
  }, [fullname]);

  const renderItem = ({ item, index }) => {
    const onPressItem = () => {
      navigation.navigate('MyDetailServices', { serviceId: item.id });
    };

    return (
      <TouchableOpacity style={[styles.item, index !== 0 && { marginTop: 10 }]} onPress={onPressItem}>
        <View style={styles.iconContainer}>
          <Icon name="desktop" size={24} color="#000" />
        </View>
        <Text style={styles.title}>{item.nameService}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    color: '#49454f',
    marginLeft: -20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#F5F5F5', // Set background color for each item
    borderRadius: 8,
    marginHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default MyServices;
