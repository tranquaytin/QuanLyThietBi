import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { getFirestore, collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListDetailServices = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);
    const [serviceTitle, setServiceTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const firestore = getFirestore();
        const detailservicesRef = collection(firestore, 'detailservices');
        const q = query(detailservicesRef, where('servicesName', '==', route.params.serviceName));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedServices = [];
            querySnapshot.forEach((doc) => {
                fetchedServices.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setServices(fetchedServices);
            setFilteredServices(fetchedServices);
            setLoading(false);
        });

        setServiceTitle(route.params.serviceName); // Set service title here

        return unsubscribe;
    }, [route.params.serviceName]);

    useEffect(() => {
        if (search === '') {
            setFilteredServices(services);
        } else {
            const filteredData = services.filter((item) => 
                item.nameService.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredServices(filteredData);
        }
    }, [search, services]);

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.serviceItem} 
            onPress={() => navigation.navigate('UpdateDetail', { deviceId: item.id })}
        >
            <Text style={styles.serviceName}>{item.nameService}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{serviceTitle}</Text>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} style={styles.searchIcon} />
                <TextInput
                    style={[styles.searchInput, isFocused && styles.searchInputFocused]}
                    placeholder="Tìm kiếm ..."
                    value={search}
                    onChangeText={setSearch}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
            <FlatList
                data={filteredServices}
                renderItem={renderServiceItem}
                keyExtractor={(item) => item.id}
                refreshing={loading}
                onRefresh={() => setLoading(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        paddingTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
        color: 'gray',
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 18,
        paddingLeft: 10,
    },
    searchInputFocused: {
        borderWidth: 0,
        outlineWidth: 0,
    },
    serviceItem: {
        marginBottom: 25,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#F5F5F5",
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '500',
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default ListDetailServices;
