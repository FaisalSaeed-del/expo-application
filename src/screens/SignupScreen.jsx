import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

 function SignupScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignup = async () => {
    // Check if any field is empty
    if (!email || !password || !confirmPassword || !profileImage) {
      alert('Please fill all fields');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Sign up the user with Firebase authentication
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = result.user;

      // Upload profile image to Firebase storage
      const imageRef = firebase.storage().ref(`profileImages/${user.uid}`);
      await imageRef.putFile(profileImage.uri);
      const imageUrl = await imageRef.getDownloadURL();

      // Update user profile with profile image URL
      await user.updateProfile({ photoURL: imageUrl });

      // Navigate to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleImagePicker = async () => {
    // Ask for permission to access the user's camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      // Launch the camera roll picker
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });

      if (!result.cancelled) {
        setProfileImage(result);
      }
    } else {
      alert('Permission to access camera roll is required');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
        {profileImage ? <Image source={{ uri: profileImage.uri }} style={styles.image} /> : <Text style={styles.imagePlaceholder}>Pick Profile Image</Text>}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
        <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={styles.input} onChangeText={setEmail} value={email} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
        <TextInput placeholder="Password" secureTextEntry={!isPasswordVisible} style={styles.input} onChangeText={setPassword} value={password} />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="gray" style={styles.icon} />
          </TouchableOpacity>
  </View>

  <View style={styles.inputContainer}>
    <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
    <TextInput placeholder="Confirm Password" secureTextEntry={!isPasswordVisible} style={styles.input} onChangeText={setConfirmPassword} value={confirmPassword} />
    <TouchableOpacity onPress={togglePasswordVisibility}>
      <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="gray" style={styles.icon} />
    </TouchableOpacity>
  </View>

  <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

  <Text style={styles.footerText}>Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Log in</Text></Text>
</ScrollView>
);
}







const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
  alignItems: 'center',
  paddingTop: 30,
  paddingBottom: 30
  },
  title: {
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 20
  },
  imageContainer: {
  width: 150,
  height: 150,
  backgroundColor: '#E5E5E5',
  borderRadius: 75,
  marginBottom: 20,
  alignItems: 'center',
  justifyContent: 'center'
  },
  image: {
  width: 150,
  height: 150,
  borderRadius: 75
  },
  imagePlaceholder: {
  fontSize: 16,
  color: '#9B9B9B',
  textAlign: 'center'
  },
  inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
  borderRadius: 10,
  paddingLeft: 10,
  paddingRight: 10,
  marginTop: 10,
  marginBottom: 10,
  width: '90%'
  },
  icon: {
  marginRight: 10
  },
  input: {
  flex: 1,
  height: 40
  },
  footerText: {
  marginTop: 20,
  fontSize: 16
  },
  link: {
  color: 'blue',
  textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: '#f4a261',
    borderRadius: 4,
    padding: 12,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  });

export default SignupScreen;
