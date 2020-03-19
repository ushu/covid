import React from "react"
import {
  NavigationContainer,
} from "@react-navigation/native"
import { AppLoading } from 'expo';
import { Provider as UserInfoProvider, reloadUserInfo, UserInfo, emptyUserInfo, isValidUserInfo } from "./UserInfo"
import RootStackNavigator from "./RootStackNavigator"

type State = {
  ready: boolean
  userInfo: UserInfo
}

class App extends React.Component<State> {
  state: State = {
    ready: false,
    userInfo: emptyUserInfo
  }

  componentDidCatch(error, errorInfo) {
    if (__DEV__) console.warn("Caught error:", error, errorInfo)
  }

  _cacheResourcesAsync = async () => {
    const userInfo = await reloadUserInfo()
    this.setState({ userInfo })
  }

  // update user info
  _setUserInfo = (update: Partial<UserInfo>) => {
    const userInfo = {
      ...this.state.userInfo,
      ...update
    }
    this.setState({ userInfo })
  }

  render() {
    if (!this.state.ready) {
      return <AppLoading
        startAsync={this._cacheResourcesAsync}
        onFinish={() => this.setState({ ready: true })}
        onError={error => {
          if (__DEV__) console.warn(error)
          this.setState({ ready: true })
        }}
      />
    }

    const value = {
      userInfo: this.state.userInfo,
      isValid: isValidUserInfo(this.state.userInfo),
      setUserInfo: this._setUserInfo,
    }
    return (
      <UserInfoProvider value={value}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </UserInfoProvider>
    )
  }
}

export default App
