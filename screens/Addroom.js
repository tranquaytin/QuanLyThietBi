import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from "react-native"; // Import Alert for iOS and Android
import { getFirestore, collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { HelperText, Button } from "react-native-paper";

const Addroom = ({ navigation }) => {
    const [roomName, setRoomName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [rooms, setRooms] = React.useState([]);
    const [error, setError] = React.useState('');

    const addRoom = async () => {
        if (!roomName.trim() && !description.trim()) {
            setError('Tên phòng và mô tả không được để trống');
            return;
        }
        if (!roomName.trim()) {
            setError('Tên phòng không được trống');
            return;
        }
        if (!description.trim()) {
            setError('Mô tả không được để trống');
            return;
        }

        setError('');

        const firestore = getFirestore();
        const ref = collection(firestore, 'rooms');

        try {
            await addDoc(ref, {
                roomName,
                description,
            });
            alert('Thêm phòng thành công!');
            setRoomName('');
            setDescription('');
        } catch (error) {
            console.error("Lỗi:", error);
        }
    }

    React.useEffect(() => {
        const firestore = getFirestore();
        const ref = collection(firestore, 'rooms');

        const unsubscribe = onSnapshot(query(ref), (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { roomName, description } = doc.data();
                list.push({
                    id: doc.id,
                    roomName,
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
                <Text style={{marginBottom:5, fontSize:16}}>Tên phòng</Text>
                <TextInput style={styles.inputtenphong} value={roomName} onChangeText={setRoomName}/>
                <Text style={{marginBottom:5, fontSize:16,}}>Mô tả</Text>
                <TextInput style={styles.inputmota} multiline value={description} onChangeText={setDescription} />
                {error ? <HelperText type="error" style={{fontSize:13}}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={addRoom} style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setRoomName(''); setDescription(''); }} style={styles.button}>
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
        paddingTop: 20,
        backgroundColor:"white",
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 16,
        textAlign:"center",
    },
    inputContainer: {
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputtenphong: {
        height:50, 
        borderColor: "#ccc", 
        borderWidth: 1, 
        backgroundColor:"white",
        marginBottom:15, 
        fontSize:20, 
        borderRadius:5, 
        paddingLeft:10
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
        height:200,
        fontSize:20,
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
        marginLeft:10,
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

export default Addroom;
