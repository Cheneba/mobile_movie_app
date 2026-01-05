import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: '#030014' }}
    >
      <Text className="text-5xl text-dark-200 font-bold">Welcome!</Text>
      <Link href="/(tabs)">Onboarding</Link>
      <Link href="/movies/Avengers">Avengers Movie</Link>
    </View>
  );
}
