import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function HeaderLogo() {
  return (
    <View>
      <Image 
        source={require('../assets/images/layout_set_logo.png')}
        style={styles.logo}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    logo: {
        marginBottom: 30,
        marginTop: 20,
      },

})



