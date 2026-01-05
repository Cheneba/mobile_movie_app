import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: keyof typeof Ionicons.glyphMap; title: string }) => {
    if (focused) {
        return (
            <View style={styles.activeTabContainer}>
                <Ionicons name={icon} size={15} color="#000" />
                <Text style={styles.activeLabel}>{title}</Text>
            </View>
        )
    }
    return (
        <View style={styles.inactiveTab}>
            <Ionicons name={icon} size={24} color="#A8B5DB" />
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
                        <TabIcon focused={focused} icon="home-outline" title="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="search-outline" title="Search" />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="bookmark-outline" title="Saved" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="person-outline" title="Profile" />
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
        height: 52,
        position: 'absolute',
        borderTopWidth: 0,
        overflow: 'hidden',
    },
    activeTabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#AB8BFF',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 50,
        gap: 6,
        height: 40,
    },
    activeLabel: {
        color: '#000',
        fontWeight: '600',
        fontSize: 12,
    },
    inactiveTab: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
})

export default _Layout
