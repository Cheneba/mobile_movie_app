import { StyleSheet, Text, View } from 'react-native';

const Saved = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Saved</Text>
        </View>
    );
};

export default Saved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#030014',
    },
    text: {
        color: '#FFFFFF',
    },
});
