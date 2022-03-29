import { createGlobalState } from 'react-hooks-global-state';

export const { useGlobalState } = createGlobalState({
    data: [
        {
            id: 0,
            rollResult: 6,
            diceList: '1+2+3',
        },
    ],
    settings: {
        showRollAll: true,
        showRollSelected: true,
        showDiceAdd: true,
        showDiceAddCustom: true,
        showDiceRemove: true,
        showDiceRemoveSelected: true,
        showAddToHistory: true,
        showDetailedResults: true,
        showDice: true,
        showResult: true,
    },
});
