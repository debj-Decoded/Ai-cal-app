import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';

const LoadingDialog = ({ message = "Generating your recipe...", isLoading = false }) => {
  return (
    <Modal transparent visible={isLoading} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <ActivityIndicator size="large" color="#F4A261" />
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#1E1E1E',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // Android shadow
  },
  text: {
    marginTop: 16,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});


// import React from 'react';
// import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';

// const LoadingDialog = ({ message = "Loading..." ,isLoading=false }) => {
//   return (
   
//     <Modal transparent visible={isLoading}>

//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#F4A261" />
//       <Text style={styles.text}>{message}</Text>
//     </View>
//     </Modal>
//   );
// };

// export default LoadingDialog;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',  // centers vertically
//     alignItems: 'center',      // centers horizontally
//     backgroundColor: '#121212', // optional background
//   },
//   text: {
//     marginTop: 12,
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });


