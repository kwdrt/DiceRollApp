import { View } from '../components/Themed';
import { Switch, Text, StyleSheet } from 'react-native';
import {
    SettingsDataSetter,
    SettingsManipulation,
    SettingsData,
    SettingsKey,
    SettingsProps,
} from '../interfaces/SettingsData';

function switchSettingValue(
    settingAttributeName: SettingsKey,
    settingsManip: SettingsManipulation
) {
    settingsManip.setSettings(settings => ({
        ...settings,
        [settingAttributeName]: !settings[settingAttributeName],
    }));
}

export default function SettingField(props: SettingsProps) {
    return (
        <View style={styles.settingField}>
            <Text style={styles.settingText}>{props.settingStringName}</Text>
            <Switch
                value={props.settingsManip.settings[props.settingAttributeName]}
                onValueChange={() =>
                    switchSettingValue(props.settingAttributeName, props.settingsManip)
                }
            ></Switch>
        </View>
    );
}

const styles = StyleSheet.create({
    settingField: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        borderWidth: 1,
    },
    settingText: {
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
});
