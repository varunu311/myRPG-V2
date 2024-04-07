import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Alert, Button } from 'react-native';
import { FIREBASE_Auth } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const auth = FIREBASE_Auth;

    const SignIn = async() => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log("Signed In!");
        } catch (error) {
            console.log(error);
            Alert.alert("Sign In Failed", error.message);
        } finally {
            setLoading(false);
        }
    }

    const SignUp = async() => {
        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "The passwords do not match.");
            return;
        }
        if (name.trim() === '' || age.trim() === '') {
            Alert.alert("Required Fields", "Please enter all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response);
            Alert.alert("Account Created!", "Your account has been successfully created.");
            const user = response.user;
            updateProfile(user,{displayName:name})
            FIREBASE_Auth.signOut();
        } catch (error) {
            console.log(error);
            Alert.alert("Registration Failed", error.message);
        } finally {
            setLoading(false);
            setIsCreatingAccount(false);
        }
    }

    const renderBackButton = () => (
        <TouchableOpacity onPress={() => setIsCreatingAccount(false)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
    );

    const renderAccountCreationFields = () => (
        <>
            <TextInput 
                value={confirmPassword} 
                style={styles.input} 
                placeholder='Confirm Password' 
                secureTextEntry={true} 
                onChangeText={setConfirmPassword}
                placeholderTextColor="#777"
            />
            <TextInput 
                value={name} 
                style={styles.input} 
                placeholder='Name' 
                onChangeText={setName}
                placeholderTextColor="#777"
            />
            <TextInput 
                value={age} 
                style={styles.input} 
                placeholder='Age' 
                keyboardType="numeric"
                onChangeText={setAge}
                placeholderTextColor="#777"
            />
        </>
    );

    return (
        <View style={styles.container}>
                {renderBackButton()}
                <TextInput 
                    value={email} 
                    style={styles.input} 
                    placeholder='Email' 
                    autoCapitalize='none' 
                    onChangeText={setEmail}
                    placeholderTextColor="#777"
                />
                <TextInput 
                    secureTextEntry={true} 
                    value={password} 
                    style={styles.input} 
                    placeholder='Password' 
                    autoCapitalize='none' 
                    onChangeText={setPassword}
                    placeholderTextColor="#777"
                />
                {isCreatingAccount && renderAccountCreationFields()}
                
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        {isCreatingAccount ? (
                            <Button title='Create Account' onPress={SignUp} color="#2196F3" />
                        ) : (
                            <>
                                <Button title='Login' onPress={SignIn} color="#4CAF50" />
                                <Button title='Create Account' onPress={() => setIsCreatingAccount(true)} color="#2196F3" />
                            </>
                        )}
                    </>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop:75,
        flex: 1,
    },
    input: {
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        color: '#333',
    },
    backButton: {
        alignSelf: 'flex-start',
        top: 0,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        paddingHorizontal:15,
        paddingVertical: 5
    },
    backButtonText: {
        color: '#2196F3',
        fontSize: 16,
    },
});
