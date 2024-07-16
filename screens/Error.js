import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { getFirestore, collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { HelperText } from "react-native-paper";

const Error = ({ route, navigation }) => {
    const { deviceName } = route.params;
    const [description, setDescription] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [rooms, setRooms] = React.useState([]);
    const [error, setError] = React.useState('');

    const addErrorReport = async () => {
        if (!description.trim()) {
            setError('Mô tả không được để trống');
            return;
        }

        setError('');

        const firestore = getFirestore();
        const ref = collection(firestore, 'error');

        try {
            await addDoc(ref, {
                deviceName,
                description,
            });
            alert('Hệ thống đã ghi nhận và sẽ gửi phản hồi sớm nhất!');
            setDescription('');
            setLoading('');
        } catch (error) {
            console.error("Lỗi:", error);
        }
    }

    React.useEffect(() => {
        const firestore = getFirestore();
        const ref = collection(firestore, 'error');

        const unsubscribe = onSnapshot(query(ref), (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { deviceName, description } = doc.data();
                list.push({
                    id: doc.id,
                    deviceName,
                    description,
                });
            });
            setRooms(list);
            if (loading) {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [loading]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Báo Lỗi</Text>
                <Text style={{marginBottom:5, fontSize:16}}>Tên thiết bị</Text>
                <TextInput
                    style={[styles.inputtenphong, styles.disabledInput]}
                    value={deviceName}
                    editable={false}
                />
                <Text style={{marginBottom:5, fontSize:16}}>Mô tả</Text>
                <TextInput
                    style={styles.inputmota}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                />
                {error ? <HelperText type="error" style={{fontSize:13}}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={addErrorReport} style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Gửi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDescription('')} style={styles.button}>
                        <Text style={styles.buttonText}>Huỷ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

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
    disabledInput: {
        backgroundColor: '#f4f4f4', // Màu xám nhạt
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputtenphong: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: "white",
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 5,
        paddingLeft: 10
    },
    inputmota: {
        backgroundColor: "white",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        placeholderTextColor: "#777777",
        height: 200,
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#21005d',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '30%',
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#21005d',
    },
    listContainer: {
        marginTop: 20,
    },
    roomItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    roomName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    roomDescription: {
        fontSize: 14,
        color: '#888',
    },
});

export default Error;
