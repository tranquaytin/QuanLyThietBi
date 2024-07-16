import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { getFirestore, collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { HelperText } from "react-native-paper";

const AddUsers = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [fullname, setFullname] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState('');

    const addUser = async () => {
        if (!email.trim() || !fullname.trim() || !phone.trim() || !password.trim()) {
            setError('Không được để trống!');
            return;
        }

        setError('');

        const firestore = getFirestore();
        const auth = getAuth();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userRef = doc(firestore, 'users', email);
            await setDoc(userRef, {
                email,
                fullname,
                phone,
                password,
            });

            alert('Thêm người dùng thành công!');
            setEmail('');
            setFullname('');
            setPhone('');
            setPassword('');
        } catch (error) {
            console.error("Lỗi:", error);
            setError(error.message);
        }
    }

    React.useEffect(() => {
        const firestore = getFirestore();
        const ref = collection(firestore, 'users');

        const unsubscribe = onSnapshot(ref, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { email, fullname, phone, password } = doc.data();
                list.push({
                    id: doc.id,
                    email,
                    fullname,
                    phone,
                    password,
                });
            });
            setUsers(list);
            if (loading) {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [loading]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput style={styles.input} value={fullname} onChangeText={setFullname} />
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                {error ? <HelperText type="error" style={styles.errorText}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={addUser} style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setEmail(''); setFullname(''); setPhone(''); setPassword(''); }} style={styles.button}>
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
        paddingTop: 30,
        backgroundColor: "white",
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
        fontSize: 20,
        borderRadius: 5,
        paddingLeft: 10
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
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 13,
    },
});

export default AddUsers;
