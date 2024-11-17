import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Yup from "yup";
const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "password length should be greater than 4")
    .max(16, "password length can not be greator than 16")
    .required("password length should be atleast 4"),
});
const App = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(0);
  const [isUppperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(true);
  const [isSprecialCharacters, setIsSpecailCharacters] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isPasswordGenrated, setPasswordGenrated] = useState(false);
  function genaratePassword(passwordLength: number) {
    let characterList = "";
    let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerCase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";
    if (isUppperCase) {
      characterList += upperCase;
    }
    if (isLowerCase) {
      characterList += lowerCase;
    }
    if (isNumbers) {
      characterList += numbers;
    }
    if (isSprecialCharacters) {
      characterList += symbols;
    }

    let passWordResult = createPassword(characterList, passwordLength);
    setPassword(passWordResult);
    setPasswordGenrated(true);
  }
  function createPassword(characterList: string, passwordLength: number) {
    let result = "";
    for (let i = 0; i <= passwordLength; i++) {
      let characterIndex = Math.round(Math.random() * characterList.length);
      result += characterList.charAt(characterIndex);
    }
    return result;
  }

  function resetPassword() {
    setPassword("");
    setIsUpperCase(false);

    setIsSpecailCharacters(false);
    setIsNumbers(false);
    setPasswordGenrated(false);
  }
  return (
    <ScrollView>
      <SafeAreaView>
        <Formik
          validationSchema={passwordSchema}
          initialValues={{ passwordLength: "" }}
          onSubmit={(value) => {
            genaratePassword(Number(value.passwordLength));
          }}
        >
          {({
            values,
            errors,
            isValid,
            touched,
            handleChange,
            handleSubmit,
            handleReset,
          }) => (
            <>
              <View style={styles.container}>
                <Text style={styles.title}>Password Genrator</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.error}>{errors.passwordLength}</Text>
                )}
                <View style={styles.passwordWrapper}>
                  <Text>Password Length</Text>
                  <TextInput
                    value={values.passwordLength}
                    onChangeText={handleChange("passwordLength")}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                    style={styles.passwordLengthInputFeild}
                  />
                </View>

                <View style={styles.checkboxContainer}>
                  <Text>Lower Case</Text>
                  <BouncyCheckbox
                    isChecked={isLowerCase}
                    disableText
                    onPress={() => setIsLowerCase(!isLowerCase)}
                    fillColor="#EA425C"
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text>Upper Case</Text>
                  <BouncyCheckbox
                    isChecked={isUppperCase}
                    disableText
                    onPress={() => setIsUpperCase(!isUppperCase)}
                    fillColor="#EA425C"
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text>Number's</Text>
                  <BouncyCheckbox
                    isChecked={isNumbers}
                    disableText
                    onPress={() => setIsNumbers(!isNumbers)}
                    fillColor="#EA425C"
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text>Symbol's</Text>
                  <BouncyCheckbox
                    isChecked={isSprecialCharacters}
                    disableText
                    onPress={() =>
                      setIsSpecailCharacters(!isSprecialCharacters)
                    }
                    fillColor="#EA425C"
                  />
                </View>
                <View style={styles.buttonsWrapper}>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={styles.genrateButton}
                  >
                    <Text>Genrate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                    style={styles.resetButton}
                  >
                    <Text>Rest Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
        {isPasswordGenrated && (
          <View>
            <Text selectable={true} style={styles.password}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 9,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  checkBoxText: {
    fontSize: 12,
    fontWeight: "600",
  },
  passwordWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordLengthInputFeild: {
    width: 60,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  error: {
    fontSize: 12,
    color: "#EA425C",
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  genrateButton: {
    backgroundColor: "#74B9FF",
    padding: 5,
    borderRadius: 7,
  },
  resetButton: {
    backgroundColor: "#6A89CC",
    padding: 5,
    borderRadius: 7,
  },
  password: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
