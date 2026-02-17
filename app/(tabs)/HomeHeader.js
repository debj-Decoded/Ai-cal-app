import { View, Text } from 'react-native'
import React from 'react'

export default function HomeHeader({ userName }) {
  return (
    <View style={styles.headerContainer}>
    <View>
      <Text style={styles.greetingText}>Hello,</Text>
      <Text style={styles.userNameText}>{userName}</Text>
    </View>
    <View style={styles.profileCircle}>
      {/* Placeholder for Profile Image */}
      <Text style={{fontSize: 20}}>👤</Text>
    </View>
  </View>
  )
}