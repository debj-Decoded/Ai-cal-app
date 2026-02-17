import React, { useContext, useState } from 'react';
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
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/FirebaseConfig';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const convex=useConvex()
    const { user, setuser } = useContext(UserContext)


    //login user logic
    const handleLogin = () => {

        if (!email || !password) {
            Alert.alert('Fill the fields')
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then( async(userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const userData=await convex.query(api.Users.GetUser,{
                    email:email
                })
                console.log('login resx',userData)
                setuser(userData)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('erroer',error.message)
            });
    }

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
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Join NutriPal AI and start your journey</Text>
                </View>

                {/* Form Fields */}
                <View style={styles.form}>


                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="hello@nutripal.com"
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
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.signUpButton}
                        onPress={() => handleLogin()}
                    >
                        <Text style={styles.signUpButtonText}>Log In</Text>
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
                    onPress={() => router.push('/auth/SignUp')}
                >
                    <Text style={styles.footerText}>

                        Dont have an account? <Text style={styles.linkBold}>

                            SignUp</Text>
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
        alignItems: 'center',
        marginBottom: 40,
    },
    miniLogo: {
        width: 60,
        height: 60,
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
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
        marginTop: 10,
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
        marginTop: 40,
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