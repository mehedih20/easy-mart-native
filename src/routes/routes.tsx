import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlobalStyles } from "../constants/GlobalStyles";
import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import AboutScreen from "../screens/AboutScreen";
import AccountScreen from "../screens/AccountScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SingleProductScreen from "../screens/SingleProductScreen";
import SearchScreen from "../screens/SearchScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import LoginScreen from "../screens/LoginScreen";

import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { getIdToken } from "@react-native-firebase/auth";
import { setUserInfo } from "../../redux/features/user/userSlice";
import auth from "@react-native-firebase/auth";

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

const RoutesComponent = () => {
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  function onAuthStateChanged(user: any) {
    if (user) {
      getIdToken(user).then((idToken) => {
        dispatch(setUserInfo({ email: user?.displayName, token: idToken }));
      });
    } else {
      dispatch(setUserInfo({ email: "", token: "" }));
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
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
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RoutesComponent;
