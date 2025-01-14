import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
  import BouncyCheckbox from 'react-native-bouncy-checkbox';
  import * as Yup from 'yup';
  import { Formik } from 'formik';
  
  const PasswordSchema = Yup.object().shape({
    passwordLength: Yup.number()
      .min(7, 'Minimum of 7 characters are required')
      .max(15, 'Maximum of 15 characters are allowed')
      .required('Length is required'),
  });
  
  export default function AppPro() {
    const [password, setPassword] = useState('');
    const [isPasswordGenerated, setPasswordGenerated] = useState(false);
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(false);
    const [number, setNumber] = useState(false);
    const [symbols, setSymbols] = useState(false);
  
    const generatePasswordString = (passwordLength) => {
      let characterList = '';
  
      const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const digitsChars = '0123456789';
      const specialChars = '!@#$%^&*()_+';
  
      if (uppercase) {
        characterList += upperCaseChars;
      }
      if (lowercase) {
        characterList += lowerCaseChars;
      }
      if (number) {
        characterList += digitsChars;
      }
      if (symbols) {
        characterList += specialChars;
      }
  
      if (characterList.length === 0) {
        return '';
      }
  
      const passwordResult = createPassword(characterList, passwordLength);
  
      setPassword(passwordResult);
      setPasswordGenerated(true); // Ensure the password container is displayed
    };
  
    const createPassword = (characters, passwordLength) => {
      let result = '';
      for (let i = 0; i < passwordLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      return result;
    };
  
    const resetPasswordState = () => {
      setPassword('');
      setPasswordGenerated(false);
      setLowercase(true);
      setUppercase(false);
      setNumber(false);
      setSymbols(false);
    };
  
    return (
      <ScrollView>
        <SafeAreaView style={styles.Appcontainer}>
          <View style={styles.container}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/891/891399.png',
              }}
              style={styles.headingImage}
            />
            <Text style={styles.headingText}>Lock-Key</Text>
          </View>
  
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              generatePasswordString(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.formContainer}>
                  <View style={styles.lengthContainer}>
                    <Text style={styles.formHeading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                    <TextInput
                      style={styles.textInput}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 8"
                      keyboardType="numeric"
                    />
                  </View>
  
                  <View style={styles.lowerCaseContainer}>
                    <Text style={styles.CheckBoxHeading}>Include Lowercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lowercase}
                      onPress={() => setLowercase(!lowercase)}
                      fillColor="#29ab87"
                      style={styles.LowercaseCheckbox}
                    />
                  </View>
  
                  <View style={styles.lowerCaseContainer}>
                    <Text style={styles.CheckBoxHeading}>Include Uppercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor="yellow"
                      style={styles.LowercaseCheckbox}
                    />
                  </View>
  
                  <View style={styles.lowerCaseContainer}>
                    <Text style={styles.CheckBoxHeading}>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={number}
                      onPress={() => setNumber(!number)}
                      fillColor="pink"
                      style={styles.LowercaseCheckbox}
                    />
                  </View>
  
                  <View style={styles.lowerCaseContainer}>
                    <Text style={styles.CheckBoxHeading}>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="red"
                      style={styles.LowercaseCheckbox}
                    />
                  </View>
                </View>
  
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.generateButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.generateButtonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.resetButtonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
  
          {isPasswordGenerated && password ? (
            <View style={styles.passwordContainer}>
              <Text selectable={true} style={styles.passwordText}>{password}</Text>
              <Text style={styles.passwordDescription}>🔐Long press to copy</Text>
            </View>
          ) : null}
        </SafeAreaView>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    Appcontainer: {
      backgroundColor: '#011638',
      flex: 1,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
    },
    headingImage: {
      width: 50,
      height: 50,
      marginLeft: 25,
      
    },
    headingText: {
      paddingVertical: 5,
      fontSize: 50,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      color: '#EEF0F2',
      marginTop: 10,
    },
    formContainer: {
      borderRadius: 10,
      backgroundColor: '#141414',
      padding: 20,
      margin: 20,
      borderBlockColor: '#EEC643',
      borderWidth: 10,
    },
    formHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#EEF0F2',
      fontFamily: 'monospace',
    },
    lengthContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 25,
      alignItems: 'center',
      margin: 10,
    },
    textInput: {
      height: 40,
      width: 90,
      backgroundColor: 'gray',
      borderRadius: 5,
      color: '#FFF',
      textAlign: 'center',
    },
    lowerCaseContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 25,
      margin: 10,
    },
    CheckBoxHeading: {
      fontSize: 19,
      fontWeight: 'bold',
      color: '#EEF0F2',
      fontFamily: 'monospace',
    },
    LowercaseCheckbox: {
      marginLeft: 45,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
    formActions: {
        marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
    },
    generateButton: {

      backgroundColor: '#EEF0F2',
      height: 50,
      width: 150,
      borderRadius: 15,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    generateButtonText: {
        
      fontSize: 20,
      fontWeight: 'bold',
      color: '#011638',
    },
    resetButton: {
      backgroundColor: '#EEC643',
      height: 50,
      width: 150,
      borderRadius: 15,
      marginVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resetButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#011638',
    },
    passwordContainer: {
      marginTop: 15,
      padding: 15,
      backgroundColor: '#141414',
      borderRadius: 10,
      alignSelf: 'center',
      width: '90%',
      height: 100,
      marginBottom: 200,
      marginTop: 50,
      flexDirection: 'column',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    passwordText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#EEF0F2',
    },
    passwordDescription: {
        marginTop: 10,
        fontSize: 15,
        color: '#EEF0F2',
    }
  });
  