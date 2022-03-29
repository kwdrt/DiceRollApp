import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { DiceButtonProps } from '../interfaces/DiceButtonData';

export default function DiceButton(props: DiceButtonProps) {
    return (
        <View style={styles.button}>
            <Button title={props.title} onPress={props.buttonFunction}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '50%',
        padding: 10,
    },
});
