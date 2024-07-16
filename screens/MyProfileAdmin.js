import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; 

const MyProfileAdmin = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomName, setRoomName] = useState(''); // Thêm roomName nếu cần thiết

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email; // Lấy email của người dùng hiện tại
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", userEmail)); // Truy vấn Firestore với email

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullname(userData.fullname || '');
          setEmail(userData.email || '');
          setPhone(userData.phone || '');
          setRoomName(userData.roomName || ''); // Lấy roomName nếu cần thiết
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userEmail = user.email;
      const db = getFirestore();
      const userDocRef = doc(db, "users", userEmail);

      try {
        await updateDoc(userDocRef, {
          fullname: fullname,
          email: email,
          phone: phone,
          roomName: roomName,
        });
        alert("Cập nhật thông tin thành công!");
      } catch (error) {
        Alert.alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("../assets/logouser.png")} style={styles.image} />
      <Text style={{ paddingBottom: 8, fontSize: 16 }}>Tên người dùng</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={text => setFullname(text)}
      />
      <Text style={{ paddingBottom: 8, fontSize: 16 }}>Phòng</Text>
      <TextInput
        style={styles.input}
        value={roomName}
        onChangeText={text => setRoomName(text)}
        placeholder="Phòng Kỹ Thuật"
      />
      <Text style={{ paddingBottom: 8, fontSize: 16 }}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={{ paddingBottom: 8, fontSize: 16 }}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={text => setPhone(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor:"white",
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
    backgroundColor: '#21005d',
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

export default MyProfileAdmin;
