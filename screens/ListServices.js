import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';

const ListServices = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const firestore = getFirestore();
        const servicesRef = collection(firestore, 'services');

        const unsubscribe = onSnapshot(servicesRef, (querySnapshot) => {
            const fetchedServices = [];
            querySnapshot.forEach((doc) => {
                fetchedServices.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setServices(fetchedServices);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity 
    style={styles.serviceItem} 
    onPress={() => navigation.navigate('ListDetailService', { serviceName: item.servicesName })}
>
    <Text style={styles.serviceName}>{item.servicesName}</Text>
        </TouchableOpacity>

    );

    return (
        <View style={styles.container}>
            <FlatList
                data={services}
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
        paddingTop:40,
        backgroundColor: "white",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: "center",
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
        color: '#49454f',
    },
    serviceItem: {
        marginBottom: 25,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor:"#F5F5F5",
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ListServices;
