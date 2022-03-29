export interface SettingsData {
    showRollAll: boolean;
    showRollSelected: boolean;
    showDiceAdd: boolean;
    showDiceAddCustom: boolean;
    showDiceRemove: boolean;
    showDiceRemoveSelected: boolean;
    showAddToHistory: boolean;
    showDetailedResults: boolean;
    showDice: boolean;
    showResult: boolean;
}

export interface SettingsManipulation {
    settings: SettingsData;
    setSettings: SettingsDataSetter;
}

export interface SettingsDataSetter {
    (
        u: React.SetStateAction<{
            showRollAll: boolean;
            showRollSelected: boolean;
            showDiceAdd: boolean;
            showDiceAddCustom: boolean;
            showDiceRemove: boolean;
            showDiceRemoveSelected: boolean;
            showAddToHistory: boolean;
            showDetailedResults: boolean;
            showDice: boolean;
            showResult: boolean;
        }>
    ): void;
}

export type SettingsKey = keyof SettingsData;

export interface SettingsProps {
    settingAttributeName: SettingsKey;
    settingStringName: string;
    settingsManip: SettingsManipulation;
}

export interface SettingsAttribute {
    attr: SettingsKey;
    text: string;
}
