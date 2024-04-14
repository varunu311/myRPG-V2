import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Alert, Button, Dimensions } from 'react-native';
import { FIREBASE_Auth } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

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
                            <View style={{top:300}}>
                                <Button title='Create Account' onPress={SignUp} color="white" />
                            </View>
                        ) : (
                            <>
                            <View style={styles.ButtonLoc}>
                                <View>
                                    <Button title='Login' onPress={SignIn} color="white" />
                                </View>
                                <View>
                                    <Button title='Create Account' onPress={() => setIsCreatingAccount(true)} color="white" />
                                </View>
                            </View>
                            </>
                        )}
                    </>
                )}
        </View>
    );
}

const { width, height } = Dimensions.get('window');
const scaleSize = (size:any) => (width / 375) * size;
const scaleVertical = (size:any) => (height / 667) * size;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#180A22',
        alignItems:'center',
    },
    input: {
        width:350,
        top:275,
        marginVertical: 8,
        height: 50,
        borderRadius: 10,
        padding: 15,
        color: 'white',
        borderWidth:1,
        borderColor:'white',
        backgroundColor:'#0D0611'
    },
    backButton: {
        alignSelf: 'flex-start',
        top: 75,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
    ButtonLoc: {
        top:300
    },
});
