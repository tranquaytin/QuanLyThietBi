import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { HelperText, Button } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import firebase from "../firebaseOtp";

const RegisterScreen = ({ navigation }) => {
  const auth = getAuth();
  const firestore = getFirestore();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [isOTPSent, setIsOTPSent] = useState(false); // Track OTP sending status

  const registerScreen = () => {
    if (!fullname.trim()) {
      setError('Tên không được để trống');
      return;
    }
    if (!email.includes('@')) {
      setError('Email sai định dạng');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu ít nhất 6 kí tự');
      return;
    }
    if (!phone.trim()) {
      setError('Số điện thoại không được để trống');
      return;
    }

    if (!isOTPSent) {
      handleSendOTP();
    } else {
      handleVerifyOTP();
    }
  };

  const setupRecaptcha = () => {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      });
    } catch (error) {
      console.error("Error setting up reCAPTCHA verifier:", error);
    }
  };

  const handleSendOTP = async () => {
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsOTPSent(true);
        alert("Đã gửi mã OTP thành công!");
      })
      .catch((error) => {
        console.log(error);
        alert("Gửi mã OTP thất bại!");
      });
  };

  const handleVerifyOTP = () => (
    window.confirmationResult
    .confirm(otp)
    .then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Tạo tài khoản thành công với email: " + email);
          navigation.navigate("Login");
          setDoc(doc(firestore, "users", email), {
            email,
            fullname,
            password,
            phone,
          });
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    })
    .catch((error) => {
      console.log({error})
      alert("Xác thực OTP thất bại!");
    })
  );

  useEffect(() => {
    setupRecaptcha();
  }, []);

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("../assets/logo.png")} style={styles.image} />
      <Text style={{fontSize:14,paddingBottom:5,}}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} placeholderTextColor="#777777" />
      <Text style={{fontSize:14,paddingBottom:5,}}>Mật khẩu</Text>
      <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} secureTextEntry placeholderTextColor="#777777"/>
      <Text style={{fontSize:14,paddingBottom:5,}}>Họ tên</Text>
      <TextInput style={styles.input} value={fullname} onChangeText={text => setFullname(text)} placeholderTextColor="#777777"/>
      <Text style={{fontSize:14,paddingBottom:5,}}>Số điện thoại</Text>
      <TextInput style={styles.input} placeholder="+84" placeholderTextColor="black" value={phone} onChangeText={text => setPhoneNumber(text)}/>
      {isOTPSent && <TextInput style={styles.input} placeholder="OTP" placeholderTextColor="#aaaaaa" value={otp} onChangeText={text => setOTP(text)}/>}

      <TouchableOpacity onPress={registerScreen} style={styles.button}>
        <Text style={styles.buttonText}>{isOTPSent ? "Xác Nhận OTP" : "Đăng Ký"}</Text>
      </TouchableOpacity>
      
      <div id="sign-in-button"></div>

      {error ? <HelperText type="error">{error}</HelperText> : null}

      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 9 }}>Bạn đã có tài khoản?</Text>
          <Button onPress={() => navigation.navigate('Login')} style={{ marginLeft: -5 }}>Đăng nhập</Button>
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
  texts:{
    fontSize:16,
    paddingBottom:8,
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
    backgroundColor:"white",
  },
  button: {
    backgroundColor: '#0066FF',
    width: 'auto',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
