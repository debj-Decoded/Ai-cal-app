// import { Dimensions, Image, Text, View } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import LandingPage from "./component/LandingPage"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/service/FirebaseConfig";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { router, useRouter } from "expo-router";



export default function Index() {

  const { user, setuser } = useContext(UserContext)
  const convex = useConvex()
  // const router =useRouter
  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log("ussseerr", userInfo?.email);
      if (userInfo?.email) {
        const userData = await convex.query(api.Users.GetUser, {
          email: userInfo.email,
        });
        console.log("user_data", userData);
        setuser(userData);

        router.replace('/(tabs)/Home')
      }
    });

  return ()=>unsubscribe();
   
  }, [])
  

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          {/* <Text style={styles.backArrow}>{"<"}</Text> */}
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>New Chat</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.headerSubtitle}>AI Coach</Text>
            <View style={styles.onlineDot} />
          </View>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          {/* <Text style={styles.historyIcon}>🕒</Text> */}
        </TouchableOpacity>
      </View>

      {/* Main Illustration Area */}
      <View style={styles.imageContainer}>
        <Image
          //  source={require('../../assets/images/coach-illustration.png')}
          source={require('../assets/images/coach-illustration.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* Text Content */}
      <View style={styles.textSection}>
        <Text style={styles.mainTitle}>
          Meet Your <Text style={styles.highlightText}>AI Coach</Text>
        </Text>
        <Text style={styles.description}>
          FitCal is here to guide your health and nutrition journey.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/SignUp')}   // 👈 navigate to /home
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>


      </View>

      {/* Footer Disclaimer */}
      <View style={styles.footer}>
        <Text style={styles.disclaimer}>
          ⓘ Consult a professional before acting
        </Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
    marginLeft: 5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '90%',
    height: '80%',
  },
  textSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 25
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#222',
  },
  highlightText: {
    color: '#F4A261', // The orange/copper color from your image
    fontStyle: 'italic',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,

    opacity: 0.7,
    lineHeight: 23,
  },

  button: {
    marginTop: 7,
    backgroundColor: '#F4A261',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },

  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  disclaimer: {
    fontSize: 12,
    color: '#AAA',
  },
});