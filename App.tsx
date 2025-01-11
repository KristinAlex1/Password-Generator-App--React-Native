import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from 'yup'



const PasswordSchema = Yup.object().shape({
    passwordLength: Yup.number().min(6,"There should be min of 6 charactersd").max(18, 'There should be maximum characters of only 18').required('Length is required'), 
})
export default function App() {

    const {password, setPassword} = useState('');
    const {isPasswordGenerated, setIsPasswordGenerated} = useState(false);
    const {loewrcase, setLowercase} = useState(true);
    const {uppercase, setUppercase} = useState(false);
    const {number, setNumber} = useState(false);
    const {symbols, setSymbols} = useState(false);

    const generatePasswordString = (passwordLength: number) => {
        //
    }

    const createPassword = (characters: string, passwordLength: number) => {

        let result = '';
        for (let i = 0;i < passwordLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const resetPasswordState = () => {

    }

  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})