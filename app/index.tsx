import { Dimensions, Image, Text, View } from "react-native";
import LandingPage from "./component/LandingPage"



export default function Index() {
  return (


    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      {/* <Image
        source={require('../assets/images/coach-illustration.png')}
        style={{
          width: '100%',
          height: Dimensions.get('screen').height
        }}
      /> */}


      {/* <View
        style={{
          position: 'absolute',
          height: Dimensions.get('screen').height,
          backgroundColor: 'purple',
          width: "100%",
          opacity: 0.5
        }} >

      </View> */}

      <View>
        <LandingPage></LandingPage>
      </View>
      {/* <Text>HI THIS IS NATIVE Reborn 😎.</Text> */}
    </View>
  );
}
