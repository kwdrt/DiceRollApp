import { SettingsData } from './SettingsData';

export interface HistoryElement {
    id: number;
    rollResult: number;
    diceList: string;
}

export interface HistoryState {
    data: HistoryElement[];
    settings: SettingsData;
}

export interface HistoryDataSetter {
    (
        u: React.SetStateAction<
            {
                id: number;
                rollResult: number;
                diceList: string;
            }[]
        >
    ): void;
}
