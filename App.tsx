import { StatusBar } from "expo-status-bar";
import "./gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { FontAwesome } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/GlobalStyles";
import SingleProductScreen from "./screens/SingleProductScreen";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const EasyMartOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: GlobalStyles.colors.primary,
      }}
    >
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Easy Mart",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{
          title: "Products",
          tabBarLabel: "Products",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="inbox" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "About",
          tabBarLabel: "About",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="lightbulb-o" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: "Contact",
          tabBarLabel: "Contact",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="phone" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="OverviewScreen"
            component={EasyMartOverview}
          />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen
            name="SingleProductScreen"
            component={SingleProductScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
