import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const TabIcon = ({ focused, icon }: { focused: boolean; icon: keyof typeof Ionicons.glyphMap }) => {
    if (focused) {
        return (
            <View style={styles.activeTabContainer}>
                <Ionicons name={icon} size={20} color="#151312" />
            </View>
        )
    }
    return (
        <View style={styles.inactiveTab}>
            <Ionicons name={icon} size={24} color="#A8A8A8" />
        </View>
    )
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                sceneStyle: { backgroundColor: '#030014' },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="home-outline" />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="search" />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="bookmark-outline" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="person-outline" />
                    ),
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#0F0D23',
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 36,
        paddingTop: 6,
        height: 52,
        position: 'absolute',
        borderTopWidth: 0,
        overflow: 'hidden',
    },
    activeTabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AB8BFF',
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    inactiveTab: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default _Layout
