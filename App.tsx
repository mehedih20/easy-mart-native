import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import AboutScreen from "./src/screens/AboutScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import SingleProductScreen from "./src/screens/SingleProductScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import AccountScreen from "./src/screens/AccountScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SearchButton from "./src/components/shared/SearchButton";

import { GlobalStyles } from "./src/constants/GlobalStyles";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./global.css";

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const EasyMartOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: GlobalStyles.colors.primary,
        // headerRight: () => <SearchButton />,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginHorizontal: 5,
          paddingBottom: 7,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          width: "100%",
        },
      }}
    >
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "EasyMart",
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
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="CartScreen"
        component={AboutScreen}
        options={{
          title: "Cart",
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
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

          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen
            name="SingleProductScreen"
            component={SingleProductScreen}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{
              title: "Search",
            }}
          />
          <Stack.Screen
            name="CategoriesScreen"
            component={CategoriesScreen}
            options={{
              title: "Categories",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
