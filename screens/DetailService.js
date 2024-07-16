import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from "react-native"; // Import Alert for iOS and Android
import { getFirestore, collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { HelperText, Button } from "react-native-paper";

const DetailService = ({ navigation }) => {
    const [nameService, setNameService] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [servicesName, setServicesName] = React.useState('');
    const [roomtypeService, setRoomTypeService] = React.useState('');
    const [specifications, setSpecifications] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [detailservices, setdetailServices] = React.useState([]);
    const [error, setError] = React.useState('');

    const addsdetailServices = async () => {
        if (!nameService.trim()) {
            setError('Tên thiết bị không được trống');
            return;
        }
        if (!userName.trim()) {
            setError('Tên người dùng không được để trống');
            return;
        }
        if (!servicesName.trim()) {
            setError('Loại thiết bị không được để trống');
            return;
        }
        if (!roomtypeService.trim()) {
            setError('Phòng loại không được để trống');
            return;
        }
        if (!specifications.trim()) {
            setError('Thông số không được để trống');
            return;
        }
        if (!status.trim()) {
            setError('Tình trạng không được để trống');
            return;
        }

        setError('');

        const firestore = getFirestore();
        const ref = collection(firestore, 'detailservices');

        try {
            await addDoc(ref, {
                nameService,
                userName,
                servicesName,
                roomtypeService,
                specifications,
                status,
            });
            alert('Thêm chi tiết thiết bị thành công!');
            setNameService('');
            setUserName('');
            setServicesName('');
            setRoomTypeService('');
            setSpecifications('');
            setStatus('');
        } catch (error) {
            console.error("Lỗi:", error);
        }
    }

    React.useEffect(() => {
        const firestore = getFirestore();
        const ref = collection(firestore, 'detailservices');

        const unsubscribe = onSnapshot(query(ref), (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { nameService, userName, servicesName, roomtypeService, specifications, status } = doc.data();
                list.push({
                    id: doc.id,
                    nameService,
                    userName,
                    servicesName, roomtypeService, specifications, status,
                });
            });
            setdetailServices(list);
            if (loading) {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [loading]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={{marginBottom:5, fontSize:16}}>Tên thiết bị</Text>
                <TextInput style={styles.inputtenphong} value={nameService} onChangeText={setNameService}/>
                <Text style={{marginBottom:5, fontSize:16}}>Tên người dùng</Text>
                <TextInput style={styles.inputtenphong} value={userName} onChangeText={setUserName}/>
                <Text style={{marginBottom:5, fontSize:16}}>Loại thiết bị</Text>
                <TextInput style={styles.inputtenphong} value={servicesName} onChangeText={setServicesName}/>
                <Text style={{marginBottom:5, fontSize:16}}>Phòng thiết bị</Text>
                <TextInput style={styles.inputtenphong} value={roomtypeService} onChangeText={setRoomTypeService}/>
                <Text style={{marginBottom:5, fontSize:16,}}>Thông số kỹ thuật</Text>
                <TextInput style={styles.inputmota} multiline value={specifications} onChangeText={setSpecifications} />
                <Text style={{marginBottom:5, fontSize:16}}>Tình trạng</Text>
                <TextInput style={styles.inputtenphong} value={status} onChangeText={setStatus}/>

                {error ? <HelperText type="error" style={{fontSize:13}}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={addsdetailServices} style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setNameService(''); setUserName(''); setServicesName(''); setRoomTypeService(''); setSpecifications(''); setStatus(''); }} style={styles.button}>
                        <Text style={styles.buttonText}>Huỷ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

// Your styles remain unchanged


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
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

export default DetailService;
