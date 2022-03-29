import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useGlobalState } from '../hooks/state';
import { DiceButtonData } from '../interfaces/DiceButtonData';
import { HistoryDataSetter } from '../interfaces/HistoryData';
import { Dice } from './Dice';
import DiceButton from './DiceButton';
import NumericInput from 'react-native-numeric-input';
const DiceParams = (
    key: number,
    value: number,
    minVal: number,
    maxVal: number,
    selected: boolean
) => {
    return {
        key,
        value,
        minVal,
        maxVal,
        selected,
    };
};

interface DiceParams {
    key: number;
    value: number;
    minVal: number;
    maxVal: number;
    selected: boolean;
}

interface DiceManipulation {
    diceValues: DiceParams[];
    setDiceValues: React.Dispatch<React.SetStateAction<DiceParams[]>>;
}

interface IndexManipulation {
    currMaxIndex: number;
    setCurrMaxIndex: React.Dispatch<React.SetStateAction<number>>;
}

function getNewIndex(indexManip: IndexManipulation): number {
    indexManip.setCurrMaxIndex(currMaxIndex => currMaxIndex + 1);
    return indexManip.currMaxIndex;
}

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeDice(diceCount: number, diceManip: DiceManipulation): void {
    if (diceCount > 0) {
        diceManip.setDiceValues(diceValues => diceValues.slice(0, -1));
    }
}

function selectDice(key: number, diceManip: DiceManipulation) {
    diceManip.setDiceValues(diceValues =>
        diceValues.map(item =>
            item.key === key ? { ...item, selected: !item.selected } : item
        )
    );
}

function rollDice(diceManip: DiceManipulation) {
    diceManip.setDiceValues(diceValues =>
        diceValues.map(item =>
            DiceParams(
                item.key,
                getRandomIntInclusive(item.minVal, item.maxVal),
                item.minVal,
                item.maxVal,
                item.selected
            )
        )
    );
}

function addDice(
    minVal: number,
    maxVal: number,
    diceManip: DiceManipulation,
    indexManip: IndexManipulation
) {
    if (minVal <= maxVal) {
        diceManip.setDiceValues(diceValues =>
            diceValues.concat(
                DiceParams(
                    getNewIndex(indexManip),
                    getRandomIntInclusive(minVal, maxVal),
                    minVal,
                    maxVal,
                    false
                )
            )
        );
    }
}

function removeSelectedDice(diceManip: DiceManipulation) {
    diceManip.setDiceValues(diceValues => diceValues.filter(item => item.selected === false));
}

function rerollSelectedDice(diceManip: DiceManipulation) {
    diceManip.setDiceValues(diceValues =>
        diceValues.map((item: DiceParams) =>
            item.selected
                ? { ...item, value: getRandomIntInclusive(item.minVal, item.maxVal) }
                : item
        )
    );
}

function addToHistory(
    rollResult: number,
    diceList: string,
    setData: HistoryDataSetter,
    indexManip: IndexManipulation
) {
    setData(data => [...data, { id: getNewIndex(indexManip), rollResult, diceList }]);
}

export default function DiceList() {
    //{key: id, value: value}
    const [, setData] = useGlobalState('data');
    const [settings] = useGlobalState('settings');

    const [diceValues, setDiceValues] = useState([
        DiceParams(1, 1, 1, 6, false),
        DiceParams(2, 2, 1, 6, false),
        DiceParams(3, 3, 1, 6, false),
    ]);

    const [currMaxIndex, setCurrMaxIndex] = useState(diceValues.length + 1);
    const [minVal, setMinVal] = useState(1);
    const [maxVal, setMaxVal] = useState(6);
    const diceManip: DiceManipulation = { diceValues, setDiceValues };
    const indexManip: IndexManipulation = { currMaxIndex, setCurrMaxIndex };

    const dices = diceValues.map(item => (
        <TouchableOpacity
            style={styles.borderTest}
            key={item.key}
            onPress={() => selectDice(item.key, diceManip)}
        >
            <Dice
                key={item.key}
                value={item.value}
                min={item.minVal}
                max={item.maxVal}
                running={item.selected}
            ></Dice>
        </TouchableOpacity>
    ));

    const diceButtonsList: DiceButtonData[] = [
        {
            props: { title: 'reroll all', buttonFunction: () => rollDice(diceManip) },
            settingName: 'showRollAll',
        },
        {
            props: {
                title: 'reroll selected dice',
                buttonFunction: () => {
                    rerollSelectedDice(diceManip);
                },
            },
            settingName: 'showRollSelected',
        },
        {
            props: {
                title: 'add a die',
                buttonFunction: () => {
                    addDice(1, 6, diceManip, indexManip);
                },
            },
            settingName: 'showDiceAdd',
        },
        {
            props: {
                title: 'remove last die',
                buttonFunction: () => {
                    removeDice(diceValues.length, diceManip);
                },
            },
            settingName: 'showDiceRemove',
        },
        {
            props: {
                title: 'remove selected dice',
                buttonFunction: () => {
                    removeSelectedDice(diceManip);
                },
            },
            settingName: 'showDiceRemoveSelected',
        },
        {
            props: {
                title: 'add to roll history',
                buttonFunction: () => {
                    addToHistory(resultDisplay, resultString, setData, indexManip);
                },
            },
            settingName: 'showAddToHistory',
        },
    ];

    const diceButtons = diceButtonsList.map(item =>
        settings[item.settingName] ? (
            <DiceButton
                key={item.settingName}
                title={item.props.title}
                buttonFunction={item.props.buttonFunction}
            ></DiceButton>
        ) : null
    );

    const customDiceButton = (
        <View style={styles.customButtonContainer}>
            <View>
                <NumericInput
                    onChange={number => setMinVal(number)}
                    value={minVal}
                    minValue={1}
                ></NumericInput>

                <NumericInput
                    onChange={number => setMaxVal(number)}
                    value={maxVal}
                ></NumericInput>
            </View>
            <View>
                <DiceButton
                    title={'add a custom dice'}
                    buttonFunction={() => {
                        addDice(minVal, maxVal, diceManip, indexManip);
                    }}
                ></DiceButton>
            </View>
        </View>
    );
    const resultDisplay = diceValues.reduce((a, b) => {
        return a + b.value;
    }, 0);
    const resultString = diceValues
        .reduce((a, b) => {
            return a + b.value.toString() + '+';
        }, '')
        .slice(0, -1);

    return (
        <>
            <View style={styles.buttonCenter}>
                <View style={styles.buttonContainer}>{diceButtons}</View>
            </View>
            <>{settings.showDiceAddCustom && customDiceButton}</>
            <View style={styles.resultBox}>
                <Text style={styles.resultNumber}>{settings.showResult && resultDisplay}</Text>
                <Text style={styles.resultString}>
                    {settings.showDetailedResults && resultString}
                </Text>
                <Text style={styles.diceCount}>
                    {diceValues.length} {diceValues.length > 1 ? 'dice' : 'die'}
                </Text>
            </View>
            <View style={styles.diceContainer}>{settings.showDice && dices}</View>
        </>
    );
}

const styles = StyleSheet.create({
    diceContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        justifyContent: 'space-around',
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    button: {
        width: '50%',
        padding: 10,
    },

    buttonCenter: {
        padding: 20,
    },

    resultBox: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        alignItems: 'center',
        margin: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 30,
    },

    resultNumber: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        width: '100%',
    },

    resultString: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        width: '100%',
    },

    diceCount: {
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontStyle: 'italic',
    },

    borderTest: {
        padding: 6,
    },

    customButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
