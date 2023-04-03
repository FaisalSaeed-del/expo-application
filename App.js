import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen"
import SignupScreen from "./src/screens/SignupScreen"
import ProfileUSer from "./src/screens/ProfileUser";



const Stack =createNativeStackNavigator();
export default function App() {
  return (
    
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen  name="Login" component={LoginScreen}  />
    <Stack.Screen  name="Signup" component={SignupScreen}  />
    <Stack.Screen  name="Profile" component={ProfileUSer}  />
  </Stack.Navigator>
</NavigationContainer>
  );
}


