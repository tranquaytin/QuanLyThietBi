import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { getFirestore, collection, doc, onSnapshot } from "firebase/firestore";
import { HelperText } from "react-native-paper";

const UpdateUsers = ({ route }) => {
    const { fullname } = route.params;

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const firestore = getFirestore();
                const usersRef = collection(firestore, 'users');
                const unsubscribe = onSnapshot(usersRef, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        if (userData.fullname === fullname) {
                            setEmail(userData.email);
                            setPhone(userData.phone);
                            setPassword(userData.password);
                            setLoading(false);
                        }
                    });
                });
                return unsubscribe;
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
                setError('Đã xảy ra lỗi khi lấy dữ liệu người dùng.');
            }
        };

        fetchUserData();
    }, [fullname]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput style={styles.input} value={fullname} editable={false} />
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                {error ? <HelperText type="error" style={styles.errorText}>{error}</HelperText> : null}
            </View>
        </View>
    );
};

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
        paddingLeft: 10,
    },
    errorText: {
        fontSize: 13,
    },
});

export default UpdateUsers;
