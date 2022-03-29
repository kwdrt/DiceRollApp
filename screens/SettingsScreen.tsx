import React from 'react';
import { ScrollView } from 'react-native';
import SettingField from '../components/SettingField';
import { useGlobalState } from '../hooks/state';
import { SettingsAttribute } from '../interfaces/SettingsData';

export default function SettingsScreen() {
    const [settings, setSettings] = useGlobalState('settings');
    const settingsManip = { settings, setSettings };

    const settingsAttributes: SettingsAttribute[] = [
        { attr: 'showRollAll', text: 'Show "Roll all" button' },
        { attr: 'showRollSelected', text: 'Show "Roll selected dice" button' },
        { attr: 'showDiceAdd', text: 'Show "Add dice" button' },
        { attr: 'showDiceAddCustom', text: 'Show "Add custom dice" button' },
        { attr: 'showDiceRemove', text: 'Show "Remove last dice" button' },
        { attr: 'showDiceRemoveSelected', text: 'Show "Remove selected dice" button' },
        { attr: 'showAddToHistory', text: 'Show "Add to history" button' },
        { attr: 'showDetailedResults', text: 'Show detailed results' },
        { attr: 'showDice', text: 'Show dice' },
        { attr: 'showResult', text: 'Show roll result (sum)' },
    ];

    const settingsList = settingsAttributes.map(item => (
        <SettingField
            key={item.attr}
            settingAttributeName={item.attr}
            settingStringName={item.text}
            settingsManip={settingsManip}
        ></SettingField>
    ));
    return (
        <>
            <ScrollView>{settingsList}</ScrollView>
        </>
    );
}
