import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try{
      return SecureStore.getItemAsync(key);
    }catch(e){
      console.log(e);
    }
  },
  async saveToken(key: string, value: string) {
    try{
      return SecureStore.setItemAsync(key,value);
    }catch(e){
      console.log(e);
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'montserrat-r': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-b': require('@/assets/fonts/Montserrat-Bold.ttf'),
    'montserrat-sb':require('@/assets/fonts/Montserrat-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}> 
  <RootLayoutNav />
  </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
 const {isLoaded,isSignedIn} = useAuth();

 useEffect(() => {
  if (isLoaded && !isSignedIn) {
    router.push('/(modals)/login');
  }
 }, [isLoaded]);

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/login" 
        options={{
          title: 'Login/Signup',
          headerTitleStyle: {
            fontFamily: 'montserrat-sb',
          },
          presentation: 'modal',
        }}  
      />
        <Stack.Screen name='listing/[id]' options={{ headerTitle: ''}} />
        <Stack.Screen name="(modals)/booking" 
        options={{
          title: 'Booking',
          headerTitleStyle: {
            fontFamily: 'montserrat-sb',
          },
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
