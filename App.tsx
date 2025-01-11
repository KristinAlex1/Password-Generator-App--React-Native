import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from 'yup'
import Heading from './components/Heading';



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
        let characterList = '';

        const upperCaseChars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseChars   = 'abcdefghijklmnopqrstuvwxyz';
        const digitsChars      = '0123456789';
        const specialChars     = '!@#$%^&*()_+';

        if (upperCaseChars) {
            characterList += upperCaseChars;
        }
        if (lowerCaseChars) {
            characterList += lowerCaseChars;
        }
        if (digitsChars) {
            characterList += upperCaseChars;
        }
        if (specialChars) {
            characterList += upperCaseChars;
        }
        
        const passwordResult = createPassword(characterList, passwordLength); 

        setPassword(passwordResult);
        setIsPasswordGenerated(true);
    
    
    };

    const createPassword = (characters: string, passwordLength: number) => {

        let result = '';
        for (let i = 0;i < passwordLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const resetPasswordState = () => {
        setPassword('');
        setIsPasswordGenerated(false);
        setLowercase(true);
        setUppercase(false);
        setNumber(false);
        setSymbols(false);

    }

  return (
    <SafeAreaView>
        <ScrollView>
        <Heading/>
        </ScrollView>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})