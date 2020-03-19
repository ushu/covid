import React from "react"
import { View, StyleSheet, Alert } from "react-native"
import { Text, Button } from "react-native-elements"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "./RootStackNavigator"
import { useUserInfo, Kind } from "./UserInfo"
import printAttestation from "./printAttestation"

type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">
type Props = { navigation: HomeNavigationProp }

// les différents boutons
const buttons: Array<{ title: string, kind: Kind }> = [
  { title: "Déplacement professionnel", kind: "pro" },
  { title: "Courses", kind: "shopping" },
  { title: "Médecin et santé", kind: "health" },
  { title: "Motif familial", kind: "family" },
  { title: "Sport & animaux", kind: "sport" },
]

const Home: React.FC<Props> = ({ navigation }) => {
  const { userInfo, isValid } = useUserInfo()

  // au click, on imprime 
  const onPress = (kind: Kind) => async () => {
    if (!isValid) {
      navigation.navigate("InfoForm")
      return // <- on remplit d'abord les infos !
    }
    try {
      await printAttestation(userInfo, kind)
      Alert.alert("Votre impression à démarré", "pensez à la signer une fois imprimée", [
        { text: 'OK' }
      ])
    } catch (error) {
      if (__DEV__) console.warn(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text h4>Choisir un type d'activité pour générer votre attestation.</Text>
      {buttons.map(({ title, kind }) =>
        <Button
          key={kind}
          type="outline"
          buttonStyle={styles.button}
          title={title}
          onPress={onPress(kind)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  button: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 20,
  },
})

export default Home