import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_Auth } from './FirebaseConfig';
import MyProfile from './app/screens/MyProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const skills = [
    { name: 'Fitness', currentXP: 180, nextLevelXP: 200, level:27 },
    { name: 'Coding', currentXP: 20, nextLevelXP: 100, level:99 },
    { name: 'Cooking', currentXP: 40, nextLevelXP: 75, level:2 },
    { name: 'Swiming', currentXP: 150, nextLevelXP: 200, level:17 },
    { name: 'Reading', currentXP: 50, nextLevelXP: 100, level:76 },
    { name: 'IQ', currentXP: 10, nextLevelXP: 75, level:81 },
    { name: 'Health', currentXP: 100, nextLevelXP: 200, level:52},
    { name: 'Social', currentXP: 10, nextLevelXP: 75, level:81 },
    { name: 'Health', currentXP: 100, nextLevelXP: 200, level:52},
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_Auth, (user) => {
      console.log("User ID:", user?.uid);
      console.log("User Name:", user?.displayName);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='MyProfile' options={{headerShown:false}}>
            {props => <MyProfile {...props} skills={skills} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
