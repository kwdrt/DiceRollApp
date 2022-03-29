import { SettingsKey } from './SettingsData';

export interface DiceButtonProps {
    title: string;
    buttonFunction: () => void;
}

export interface DiceButtonData {
    props: DiceButtonProps;
    settingName: SettingsKey;
}
