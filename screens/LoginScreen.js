import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { HelperText, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", email));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFullname(userData.fullname);
        if (userData.role === 'admin') {
          alert("Chào mừng admin đăng nhập!");
          navigation.navigate("HomeScreenAdmin");
        } else {
          alert(`Chào mừng đăng nhập: ${userData.fullname}`);
          navigation.navigate("HomeScreen", { fullname: userData.fullname }); 
        }
      } else {
        alert("Không tìm thấy thông tin người dùng.");
      }
    } catch (error) {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("../assets/logo.png")} style={styles.image} />
      <Text style={{ paddingBottom: 8, fontSize: 16 }}>Tài khoản</Text>
      <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} placeholderTextColor="#aaaaaa" />
      <Text style={{ paddingBottom: 8, fontSize: 16 }}>Mật khẩu</Text>
      <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} placeholderTextColor="#aaaaaa" secureTextEntry />

      <TouchableOpacity style={{ alignItems: "flex-end" }}>
        <Text>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Text style={{ color: "black", fontSize: 16, marginTop: 6 }}>Hướng dẫn sử dụng?</Text>
          </TouchableOpacity>
          <Button onPress={() => navigation.navigate('Register')}><Text style={{ color: "black", fontSize: 16, }}>Tạo tài khoản</Text></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#99ddff",
  },
  image: {
    height: 160,
    marginBottom: 30,
    alignItems: 'center',
    width: 'auto',
  },
  input: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    width: 'auto',
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066FF',
    width: 'auto',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
