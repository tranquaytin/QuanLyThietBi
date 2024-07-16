import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore"; 

const MyProfile = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomtypeService, setRoomtypeService] = useState(''); 

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

          // Truy vấn thêm từ detailservices với fullname hiện tại
          const q = query(collection(db, "detailservices"), where("userName", "==", userData.fullname));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const detailServiceData = doc.data();
            setRoomtypeService(detailServiceData.roomtypeService || '');
          });
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

      // Cập nhật thông tin người dùng trong Firestore
      const userDocRef = doc(db, "users", userEmail);
      try {
        await updateDoc(userDocRef, {
          fullname: fullname,
          email: email,
          phone: phone,
        });

        // Truy vấn và cập nhật roomtypeService trong detailservices
        const q = query(collection(db, "detailservices"), where("userName", "==", fullname));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          const detailServiceDocRef = doc.ref;
          await updateDoc(detailServiceDocRef, {
            roomtypeService: roomtypeService,
          });
        });

        alert("Cập nhật thông tin thành công!");
      } catch (error) {
        alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
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
        value={roomtypeService}
        onChangeText={text => setRoomtypeService(text)}
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

export default MyProfile;
