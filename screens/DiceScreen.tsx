import { StyleSheet, ScrollView } from 'react-native';

import DiceList from '../components/DiceList';

export default function DiceScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <DiceList></DiceList>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
