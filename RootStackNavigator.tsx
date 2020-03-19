import React from "react"
import { Kind, useUserInfo, persistUserInfo } from "./UserInfo"
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { Button } from "react-native-elements"

// Les pages
import HomeScreen from "./HomeScreen"
import InfoFormScreen from "./InfoFormScreen"

export type RootStackParamList = {
  Home: {}
  InfoForm: { kind: Kind } // <- on passe le type d'attestation par le route
  Attestation: { kind: Kind } // <- on passe le type d'attestation par le route
}
const Stack = createStackNavigator<RootStackParamList>()

const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          title: "Type d'attestation",
          headerRight: () => <OpenSettingsButton />,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="InfoForm"
        options={{
          title: "Informations personnelles",
          headerBackTitle: "Annuler",
          headerRight: () => <SaveUserInfoButton />,
        }}
        component={InfoFormScreen}
      />
    </Stack.Navigator>
  )
}

// Les nav boutons
// -> je dois en faire des composants à part pour utiliser les hooks

const SaveUserInfoButton = () => {
  const { userInfo, isValid } = useUserInfo()
  const navigation = useNavigation()

  return (
    <Button
      type="clear"
      title="OK"
      disabled={!isValid}
      onPress={async () => {
        try {
          await persistUserInfo(userInfo)
          // après la sauvegarde, on revient sur la page d'accutil
          navigation.goBack()
        } catch (error) {
          if (__DEV__) console.warn("Cannot persist UserInfo:", error)
        }
      }}
    />
  )
}

type HomeNavigationParam = StackNavigationProp<RootStackParamList, "Home">
const OpenSettingsButton = () => {
  const navigation = useNavigation<HomeNavigationParam>()

  return (
    <Button
      type="clear"
      icon={{
        name: "cog",
        type: "font-awesome"
      }}
      onPress={() => navigation.navigate("InfoForm")}
    />
  )
}

export default RootStackNavigator