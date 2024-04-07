import { FirebaseError } from 'firebase/app';
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { FIREBASE_Auth } from '../../FirebaseConfig';
import { NavigationProp } from '@react-navigation/native';

interface RouteProps {
    navigation: NavigationProp<any,any>;
}

const MyProfile = ({ navigation }: RouteProps) => {
    return (
      <View style={styles.container}>
        <Button title="Logout" onPress={() => FIREBASE_Auth.signOut()} />
        <Text style={styles.username}>{FIREBASE_Auth.currentUser?.displayName}</Text>
        <Text style={styles.detail}>{FIREBASE_Auth.currentUser?.email}</Text>
      </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:25,
    paddingTop:100,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginTop: 5,
  },
});
