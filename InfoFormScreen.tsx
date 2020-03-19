import React, { useState, useEffect, useRef } from "react"
import { LayoutAnimation, Keyboard, ScrollView, KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native"
import { Input, ListItem } from "react-native-elements"
import DateTimePicker from "@react-native-community/datetimepicker"
import { format as formatDate } from "date-fns"
const locale = require("date-fns/locale/fr")
import { useUserInfo } from "./UserInfo"

const InfoForm = () => {
  const { userInfo, setUserInfo } = useUserInfo()
  const [showDatePicker, setShowDatePicker] = useState(false)

  // anime l'affichage du date picker
  useEffect(() => {
    LayoutAnimation.easeInEaseOut()

    if (showDatePicker) {
      // quand on l'active, on scroll (pour l'iPhone 8 & co.)
      Keyboard.dismiss()
    }
  }, [showDatePicker])

  // pour passer d'un champ à l'autre (sinon c'est insupportable...)
  const nameRef = useRef<Input>(null)
  const streetRef = useRef<Input>(null)
  const postCodeRef = useRef<Input>(null)
  const cityRef = useRef<Input>(null)

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        enabled={Platform.OS === "ios"}
        keyboardVerticalOffset={40}
      >
        <View style={styles.group}>
          <ListItem
            title="Prénom"
            input={{
              autoFocus: true,
              placeholder: "Jean",
              returnKeyType: "next",
              keyboardType: "default",
              autoCapitalize: "words",
              autoCorrect: true,
              value: userInfo.firstName,
              onChangeText: firstName => setUserInfo({ firstName }),
              onSubmitEditing: () => nameRef.current?.focus(),
            }}
          />
          <ListItem
            title="Nom"
            rightElement={
              <Input
                ref={nameRef}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={true}
                onSubmitEditing={() => streetRef.current?.focus()}
                placeholder="Martin"
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContentContainer}
                containerStyle={styles.inputContainer}
                value={userInfo.lastName}
                onChangeText={lastName => setUserInfo({ lastName })}
              />
            }
          />
        </View>
        <View style={styles.group}>
          <ListItem
            title="Rue"
            rightElement={
              <Input
                ref={streetRef}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect={true}
                onSubmitEditing={() => postCodeRef.current?.focus()}
                placeholder="55 rue du Faubourg-Saint-Honoré"
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContentContainer}
                containerStyle={styles.inputContainer}
                value={userInfo.street}
                onChangeText={street => setUserInfo({ street })}
              />
            }
          />
          <ListItem
            title="Code postal"
            rightElement={
              <Input
                ref={postCodeRef}
                returnKeyType="next"
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => cityRef.current?.focus()}
                placeholder="75008"
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContentContainer}
                containerStyle={styles.inputContainer}
                value={userInfo.postCode}
                onChangeText={postCode => setUserInfo({ postCode })}
              />
            }
          />
          <ListItem
            title="Ville"
            rightElement={
              <Input
                ref={cityRef}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={true}
                onSubmitEditing={() => setShowDatePicker(true)}
                placeholder="Paris"
                inputStyle={styles.input}
                inputContainerStyle={styles.inputContentContainer}
                containerStyle={styles.inputContainer}
                value={userInfo.city}
                onChangeText={city => setUserInfo({ city })}
              />
            }
          />
        </View>
        <View style={styles.group}>
          <ListItem
            title="Date de naissance"
            rightTitle={formatDate(userInfo.birthDate, "dd/MM/yyyy", {
              locale,
            })}
            onPress={() => setShowDatePicker(!showDatePicker)}
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              mode="date"
              is24Hour={true}
              display="default"
              value={userInfo.birthDate}
              onChange={(event, birthDate) => setUserInfo({ birthDate })}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  group: {
    marginTop: 30,
  },
  // copié from react-native-elements (pour avoir des refs...)
  inputContainer: {
    flex: 1,
    paddingRight: 0,
  },
  inputContentContainer: {
    flex: 1,
    borderBottomWidth: 0,
    width: null,
    height: null,
  },
  input: {
    flex: 1,
    textAlign: "right",
    width: null,
    height: null,
  },
})


export default InfoForm