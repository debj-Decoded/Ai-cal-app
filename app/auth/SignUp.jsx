import React, { useContext, useState } from 'react';
import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Image,
    Alert
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/FirebaseConfig';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import { useMutation } from "convex/react";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setuser } = useContext(UserContext)
    // const [loading, setLoading] = useState(false); // Added loading state

    const createNewUser=useMutation(api.Users.CreateNewUser)

    // signup function to firebase
    const handleSignUp = () => {
        if (!name || !email || !password) {
            Alert.alert("Fill all fields");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                if (user) { 
                    const result= await createNewUser({
                        name:name,
                        email:email
                    });
                    console.log(result)
                    setuser(result)
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorx", errorMessage, process.env.EXPO_PUBLIC_FIREBASE_API_KEY)
                // console.log("errorx",  process.env.EXPO_PUBLIC_FIREBASE_API_KEY)
                // ..
            });
    };

    
    // const handleSignUp = async () => {
    //     if (!name || !email || !password) {
    //         Alert.alert("Error", "Please fill all fields");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //         const firebaseUser = userCredential.user;

    //         if (firebaseUser) {
    //             const result = await createNewUser({
    //                 name: name,
    //                 email: email
    //             });
                
    //             setuser(result);
    //             // Navigate after success
    //             router.replace('/(tabs)/home'); 
    //         }
    //     } catch (error) {
    //         console.log("Sign up error:", error.code, error.message);
    //         Alert.alert("Signup Failed", error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                {/* Logo & Header */}
                <View style={styles.headerSection}>
                    <Image
                        // source={require('../../assets/logo.png')} 
                        source={require('../../assets/images/icon.png')}
                        style={styles.miniLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join NutriPal and start your journey</Text>
                </View>

                {/* Form Fields */}
                <View style={styles.form}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="hello@nutripal.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            // placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => handleSignUp()}
                    >

                        <Text style={styles.signUpButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>Or sign up with</Text>
                    <View style={styles.line} />
                </View>

                {/* Social Buttons */}
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialCircle}>
                        <Text style={{ fontSize: 20 }}>G</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialCircle}>
                        <Text style={{ fontSize: 20 }}></Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.footerLink}

                    onPress={() => router.push('/auth/SignIn')}
                >
                    <Text style={styles.footerText}>
                        Already have an account? <Text style={styles.linkBold}>


                            Login</Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    headerSection: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 40,
    },
    miniLogo: {
        width: 60,
        height: 60,
        marginBottom: 15,
    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#222',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    form: {
        width: '100%',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F9F9F9',
        height: 55,
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        // Modern Shadow
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
        elevation: 2,
    },
    signUpButton: {
        backgroundColor: '#F4A261', // Matches your "AI Coach" highlight
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        boxShadow: '0px 5px 15px rgba(244, 162, 97, 0.3)',
        elevation: 3,
    },
    signUpButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEE',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#AAA',
        fontSize: 12,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
    },
    footerLink: {
        marginTop: 15,
        marginBottom: 5,
        alignItems: 'center',
    },
    footerText: {
        color: '#888',
        fontSize: 14,
    },
    linkBold: {
        color: '#F4A261',
        fontWeight: '700',
    },
});