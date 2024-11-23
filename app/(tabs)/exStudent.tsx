import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeaderLogo from '@/components/headerLogo'
import Colors from '@/constants/Colors';

export default function ExStudents() {
  return (
    <View style={styles.container}>
      <HeaderLogo/>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.Trr,
    alignItems: 'center',
  }
});