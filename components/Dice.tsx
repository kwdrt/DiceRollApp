import { useEffect, useRef } from 'react';
import { Text, StyleSheet, Easing } from 'react-native';
import { Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface DiceProps {
    value: number;
    min?: number;
    max?: number;
    running: boolean;
}

export const useRotateAnimation = (running: boolean = true) => {
    const val = useRef(new Animated.Value(0));
    const anim = useRef(
        Animated.loop(
            Animated.timing(val.current, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        )
    ).current;

    const spin = val.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        if (running) {
            anim.start();
        } else {
            anim.stop();
            val.current.setValue(0);
        }

        return () => anim.stop();
    }, [running, anim]);
    return [spin] as const;
};

export function Dice(props: DiceProps) {
    //const [running, setRunning] = useState(false);
    const [spin] = useRotateAnimation(props.running);
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    //const changeRunning = () => (props.running ? setRunning(false) : setRunning(true));

    return (
        //<AnimatedTouchable>
        <Animated.View style={{ ...styles.background, transform: [{ rotate: spin }] }}>
            <Text
                style={[
                    styles.text,
                    props.value == props.max && styles.goodRoll,
                    props.value == props.min && styles.badRoll,
                ]}
            >
                {' '}
                {props.value}{' '}
            </Text>
            <Text style={styles.label}>
                {props.min}-{props.max}
            </Text>
        </Animated.View>
        //</AnimatedTouchable>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        width: 50,
        height: 50,
        margin: 5,
        zIndex: 400,
    },
    text: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'black',
    },

    label: {
        fontSize: 8,
        position: 'absolute',
        bottom: 0,
    },

    goodRoll: {
        color: 'green',
    },

    badRoll: {
        color: 'red',
    },
});
