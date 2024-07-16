import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const MyDetailServices = ({ route }) => {
    const [deviceDetail, setDeviceDetail] = useState({
        nameService: '',
        roomtypeService: '',
        servicesName: '',
        specifications: '',
        status: '',
        userName: '',
    });

    const navigation = useNavigation();

    useEffect(() => {
        const fetchDeviceDetail = async () => {
            const firestore = getFirestore();
            const detailsRef = doc(firestore, 'detailservices', route.params.serviceId);

            try {
                const docSnap = await getDoc(detailsRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setDeviceDetail({
                        nameService: data.nameService || '',
                        roomtypeService: data.roomtypeService || '',
                        servicesName: data.servicesName || '',
                        specifications: data.specifications || '',
                        status: data.status || '',
                        userName: data.userName || '',
                    });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document: ', error);
            }
        };

        fetchDeviceDetail();
    }, [route.params.serviceId]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View>
                <Text style={styles.title}>Chi tiết thiết bị</Text>
                </View>

                <Text style={{paddingTop: 20, marginBottom: 5, fontSize: 16,}}>Tên thiết bị</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.nameService}
                    editable={false}
                />
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.userName}
                    editable={false}
                />
                <Text style={styles.label}>Loại thiết bị</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.servicesName}
                    editable={false}
                />
                <Text style={styles.label}>Phòng Loại thiết bị</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.roomtypeService}
                    editable={false}
                />
                <Text style={styles.label}>Thông số kỹ thuật</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput, { height: 150 }]}
                    multiline
                    value={deviceDetail.specifications}
                    editable={false}
                />
                <Text style={styles.label}>Tình trạng</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.status}
                    editable={false}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => navigation.navigate('Error', { deviceName: deviceDetail.nameService })}
                >
                    <Text style={styles.updateButtonText}>Báo lỗi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Trở về</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 16,
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: "white",
    },
    disabledInput: {
        backgroundColor: '#f4f4f4', // Màu xám nhạt
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    updateButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    updateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    backButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 15,
        borderRadius: 5,
        flex: 1,
    },
    backButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default MyDetailServices;
