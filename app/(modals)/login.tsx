import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}



const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const {startOAuthFlow:googleAuth} = useOAuth({strategy:'oauth_google'});
  const {startOAuthFlow:appleAuth} = useOAuth({strategy:'oauth_apple'});
  const {startOAuthFlow:facebookAuth} = useOAuth({strategy:'oauth_facebook'});

  const onSelectAuth = async (strategy: Strategy) => {
    const SelectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];
    try{
      const {createdSessionId,setActive} = await SelectedAuth();
      console.log(createdSessionId);
      if(createdSessionId){
        setActive!({session:createdSessionId});
        router.push('/(tabs)/');
      }
    }catch(e){
      console.error(e);
    }
  }; 

  

  return (
    
    <View style={styles.container}>
      <TextInput autoCapitalize="none" placeholder="Email" style={[defaultStyles.inputField,{marginBottom:30}]}/>
      <TouchableOpacity style={[defaultStyles.btn]}>
        <Text style={[defaultStyles.btnText]}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.sepratorView}>
        <View style ={{
          flex:1,
          borderBottomColor: '#000',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text style={styles.seprator}>or</Text>
      <View style ={{
          flex:1,
          borderBottomColor: '#000',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      </View>
      <View style={{gap:20,marginTop:20}}>
        <TouchableOpacity style={styles.btnOutline} onPress={()=>onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" size={24} style={[defaultStyles.btnIcon,]} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={()=>onSelectAuth(Strategy.Apple)}>
          <Ionicons name="logo-apple" size={24} style={[defaultStyles.btnIcon,]} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={()=>onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" size={24} style={[defaultStyles.btnIcon,]} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  sepratorView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 30,
  },
  seprator:{
    fontFamily: 'montserrat-sb',
    color: Colors.grey,
  },
  btnOutline:{ 
    backgroundColor: '#fff',
    borderColor: Colors.grey,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText:{
    fontFamily: 'montserrat-sb',
    color: '#000',
    fontSize: 16,
  },

});
export default Page;