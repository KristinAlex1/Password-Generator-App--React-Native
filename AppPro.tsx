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
import React, {useState} from 'react';
import App from './App';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
import {Formik} from 'formik';

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

  const generatePasswordString = (passwordLength: number) => {
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

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
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
          initialValues={{passwordLength: ''}}
          validationSchema={PasswordSchema}
          onSubmit={values => {
            console.log(values);
            generatePasswordString(+values.passwordLength);
          }}>
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
                    <Text style={styles.errorText}>
                        {errors.passwordLength}

                    </Text>
                )}
                  <TextInput 
                  style={styles.textInput}
                  value = {values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder='Ex. 8'
                  keyboardType='numeric'/>
                </View>
                <View style={styles.lowerCaseContainer}>
                  <Text style={styles.CheckBoxHeading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="#29ab87"
                    style={styles.LowercaseCheckbox}
                  />
                </View>
                <View style={styles.lowerCaseContainer}>
                  <Text style={styles.CheckBoxHeading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="yellow"
                    style={styles.LowercaseCheckbox}
                  />
                </View>
                <View style={styles.lowerCaseContainer}>
                  <Text style={styles.CheckBoxHeading}>Include Numbers </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="pink"
                    style={styles.LowercaseCheckbox}
                  />
                </View>
                <View style={styles.lowerCaseContainer}>
                  <Text style={styles.CheckBoxHeading}>Include Symbols </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="red"
                    style={styles.LowercaseCheckbox}
                  />
                </View>
              </View>
            <View style={styles.formActions}>
                <TouchableOpacity><Text>Generate Password</Text></TouchableOpacity>
                <TouchableOpacity><Text>Reset</Text></TouchableOpacity>
            </View>
            </>
          )}
        </Formik>
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
    marginLeft: 10,
  },
  headingText: {
    paddingVertical: 5,
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'monospace',
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
    width: 100,
    backgroundColor: 'gray',
    borderRadius: 5,
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
});
