import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const UpdateDetail = ({ route }) => {
    const [deviceDetail, setDeviceDetail] = useState({
        nameService: '',
        roomtypeService: '',
        servicesName: '',
        specifications: '',
        status: '',
        userName: '',
    });

    useEffect(() => {
        const fetchDeviceDetail = async () => {
            const firestore = getFirestore();
            const detailsRef = doc(firestore, 'detailservices', route.params.deviceId);

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
    }, [route.params.deviceId]);

    const updateDeviceDetail = async () => {
        const firestore = getFirestore();
        const detailsRef = doc(firestore, 'detailservices', route.params.deviceId);

        try {
            await updateDoc(detailsRef, {
                nameService: deviceDetail.nameService,
                roomtypeService: deviceDetail.roomtypeService,
                servicesName: deviceDetail.servicesName,
                specifications: deviceDetail.specifications,
                status: deviceDetail.status,
                userName: deviceDetail.userName,
            });
            alert("Cập nhật thành công!")
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>

                <Text style={styles.label}>Tên thiết bị</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.nameService}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, nameService: text })}
                />
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.userName}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, userName: text })}
                />
                <Text style={styles.label}>Loại thiết bị</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.servicesName}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, servicesName: text })}
                />
                <Text style={styles.label}>Phòng Loại thiết bị</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.roomtypeService}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, roomtypeService: text })}
                />

                <Text style={styles.label}>Thông số kỹ thuật</Text>
                <TextInput
                    style={[styles.input, { height: 150 }]}
                    multiline
                    value={deviceDetail.specifications}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, specifications: text })}
                />

                <Text style={styles.label}>Tình trạng</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.status}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, status: text })}
                />


                {/* Button to update */}
                <TouchableOpacity style={styles.updateButton} onPress={updateDeviceDetail}>
                    <Text style={styles.updateButtonText}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 20,
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
        backgroundColor: "white",
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 5,
        paddingLeft: 10
    },
    updateButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    updateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default UpdateDetail;
