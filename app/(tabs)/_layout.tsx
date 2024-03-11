import { View, Text } from "react-native";
import React from "react";
import{Tabs} from 'expo-router'
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Layout = () => {
  return (
    
      <Tabs screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle:{
            fontFamily:'montserrat-sb',
        }
      }}>
        <Tabs.Screen name="index" 
        options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color ,size}) => (
                <MaterialCommunityIcons name="compass" size={size} color={color} />
              ),
    }}
    />
        <Tabs.Screen name="wishlist" 
        options={{
            tabBarLabel: 'Wishlist',
            tabBarIcon: ({ color ,size}) => (
                <MaterialCommunityIcons name="heart" size={size} color={color} />
              ),
    }}
    />
        <Tabs.Screen name="trips" 
        options={{
            tabBarLabel: 'Trips',
            tabBarIcon: ({ color ,size}) => (
                <MaterialCommunityIcons name="road-variant" size={size} color={color} />
              ),
    }}
    />
        <Tabs.Screen name="inbox" 
        options={{
            tabBarLabel: 'Inbox',
            tabBarIcon: ({ color ,size}) => (
                <MaterialCommunityIcons name="email" size={size} color={color} />
              ),
    }}
    />
        <Tabs.Screen name="profile" 
        options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color ,size}) => (
                <MaterialCommunityIcons name="account" size={size} color={color} />
              ),
    }}
    />
    </Tabs>
  );
}

export default Layout;