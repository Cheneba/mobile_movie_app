import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { SavedMoviesProvider } from "@/context/SavedMoviesContext";

export default function RootLayout() {
  return (
    <SavedMoviesProvider>
      <View style={{ flex: 1, backgroundColor: '#030014' }}>
        <StatusBar style="light" backgroundColor="#030014" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#030014' },
            animation: 'fade',
            animationDuration: 200,
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="movies/[id]" />
          <Stack.Screen name="index" />
        </Stack>
      </View>
    </SavedMoviesProvider>
  )
}
