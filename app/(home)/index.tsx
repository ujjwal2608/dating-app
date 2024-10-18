import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'rgb(40,25,52)',justifyContent: 'center',alignItems:'center'}}>
      <Text className='text-3xl text-white'>Home Explore Screen</Text>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})