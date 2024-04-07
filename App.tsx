<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'; 
import { FIREBASE_APP, FIREBASE_Auth } from './FirebaseConfig';
import MyProfile from './app/screens/MyProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(FIREBASE_Auth, (user) => {
      console.log("User ID:", user?.uid);
      console.log("User Name:", user?.displayName);
      setUser(user)
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ?
          <Stack.Screen name='MyProfile' component={MyProfile}  options={{headerShown:false}}/>
        :
          <Stack.Screen name='Login' component={Login}  options={{headerShown:false}}/>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
>>>>>>> dd8d71f (Login System)
