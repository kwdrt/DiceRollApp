import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../components/Themed';
import { useGlobalState } from '../hooks/state';
import { HistoryDataSetter } from '../interfaces/HistoryData';

interface HistoryElementManipulation {
    setData: HistoryDataSetter;
}

function removeFromHistory(id: number, historyManip: HistoryElementManipulation) {
    historyManip.setData(data => data.filter(item => item.id !== id));
}

export default function HistoryScreen() {
    const [data, setData] = useGlobalState('data');
    const historyManip = { setData };

    const historyItems = data.map(item => (
        <View key={item.id} style={historyStyles.historyItem}>
            <View style={historyStyles.historyTopRow}>
                <Text style={historyStyles.historyDiceList}>{item.diceList}</Text>
                <TouchableOpacity
                    style={historyStyles.historyRemoveButton}
                    onPress={() => {
                        removeFromHistory(item.id, historyManip);
                    }}
                >
                    <Text style={historyStyles.historyRemoveText}>REMOVE</Text>
                </TouchableOpacity>
            </View>

            <Text style={historyStyles.historyResult}>{item.rollResult}</Text>
        </View>
    ));

    return (
        <>
            <ScrollView>{historyItems}</ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

const historyStyles = StyleSheet.create({
    historyItem: {
        display: 'flex',
        width: '90%',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        borderWidth: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
        margin: 5,
    },

    historyTopRow: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },

    historyResult: {
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 50,
        marginRight: 10,
    },

    historyRemoveButton: {
        textAlign: 'center',
        width: '20%',
        marginTop: 0,
        marginBottom: 'auto',
        backgroundColor: 'red',
    },

    historyDiceList: {
        width: '60%',
    },

    historyRemoveText: {
        color: 'white',
        textAlign: 'center',
        padding: 5,
    },
});
