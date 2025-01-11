import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Heading() {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Lock-Key</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#C2E7DA',

    },
    container: {
        backgroundColor: '#1A1B41',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
        borderColor: 'black',
        borderBottomWidth: 4,
    }

})