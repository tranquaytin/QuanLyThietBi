import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListUser = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [userFullNames, setUserFullNames] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUserFullNames, setFilteredUserFullNames] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const firestore = getFirestore();
        const usersRef = collection(firestore, 'users');

        const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
            const fullNames = [];
            querySnapshot.forEach((doc) => {
                const { fullname } = doc.data();
                fullNames.push(fullname);
            });
            setUserFullNames(fullNames);
            setFilteredUserFullNames(fullNames);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (search === '') {
            setFilteredUserFullNames(userFullNames);
        } else {
            const filteredData = userFullNames.filter((fullname) => 
                fullname.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUserFullNames(filteredData);
        }
    }, [search, userFullNames]);

    const renderFullNameItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.serviceItem} 
            onPress={() => navigation.navigate('UpdateUsers', { fullname: item })}
        >
            <Text style={styles.serviceName}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
                data={filteredUserFullNames}
                renderItem={renderFullNameItem}
                keyExtractor={(item, index) => index.toString()}
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
        paddingTop: 40,
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
});

export default ListUser;
