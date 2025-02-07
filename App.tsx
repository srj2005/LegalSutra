import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import HomePage from "./screens/HomePage"
import ContractUpload from "./screens/ContractUpload"
import ContractSummary from "./screens/ContractSummaryPage"
import RiskAssessment from "./screens/RiskAssessment"
import LegalAssistant from "./screens/LegalAssistant"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="ContractUpload" component={ContractUpload} />
          <Stack.Screen name="ContractSummary" component={ContractSummary} />
          <Stack.Screen name="RiskAssessment" component={RiskAssessment} />
          <Stack.Screen name="LegalAssistant" component={LegalAssistant} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}


