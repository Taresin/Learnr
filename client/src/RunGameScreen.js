import React, { useState, useEffect } from "react";
import Mine from "./Mine";

export default function RunGameScreen() {
    const [count, setCount] = useState(0);
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);

    const Action = {
        UP: 0,
        DOWN: 1,
        LEFT: 2,
        RIGHT: 3,
    };

    const [qTable, setQTable] = useState(createQTable2(5, 5, 4));

    console.log(qTable);
    function createQTable(rows, cols, numActions) {
        // Initialize the Q-table as a 3D array
        const qTable = new Array(rows)
            .fill(null)
            .map(() =>
                new Array(cols)
                    .fill(null)
                    .map(() => new Array(numActions).fill(0))
            );

        // Set higher values for the DOWN action
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                qTable[row][col][Action.DOWN] = 1 + 10; // Higher values for DOWN
                qTable[row][col][Action.UP] = 1;
                qTable[row][col][Action.LEFT] = 1;
                qTable[row][col][Action.RIGHT] = 1;
            }
        }

        return qTable;
    }

    function createQTable2(rows, cols, numActions) {
        // Initialize the Q-table as a 3D array
        const qTable = new Array(rows)
            .fill(null)
            .map(() =>
                new Array(cols)
                    .fill(null)
                    .map(() => new Array(numActions).fill(0))
            );

        // Set higher values for the DOWN action
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (col === 3) {
                    qTable[row][col][Action.DOWN] = 1 + 30; // Higher values for DOWN
                } else {
                    qTable[row][col][Action.DOWN] = 1;
                }

                qTable[row][col][Action.UP] = 1;
                qTable[row][col][Action.LEFT] = 1;

                qTable[row][col][Action.RIGHT] = 1 + 10;
            }
        }

        console.log("QTable: ", qTable);
        return qTable;
    }

    function createQTable3(rows, cols, numActions) {
        // Initialize the Q-table as a 3D array
        const qTable = new Array(rows)
            .fill(null)
            .map(() =>
                new Array(cols)
                    .fill(null)
                    .map(() => new Array(numActions).fill(0))
            );

        // Set higher values for the DOWN action
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                qTable[row][col][Action.DOWN] = 1 + 10; // Higher values for DOWN
                qTable[row][col][Action.UP] = 1;
                qTable[row][col][Action.LEFT] = 1;
                qTable[row][col][Action.RIGHT] = 1 + 29;
            }
        }

        return qTable;
    }

    function getBestAction() {
        const actions = qTable[row][col];
        let bestAction = 0;
        let highestValue = actions[0];

        for (let action = 1; action < actions.length; action++) {
            if (actions[action] > highestValue) {
                highestValue = actions[action];
                bestAction = action;
            }
        }

        console.log("Actions: ", actions);
        console.log("Best Action: ", bestAction);
        return bestAction;
    }

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            const action = getBestAction();
            step(action);
            const output = JSON.stringify(qTable);
            console.log(output);
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);

    const step = (action) => {
        switch (action) {
            case Action.RIGHT:
                setCol((col) => Math.min(col + 1, 4));
                break;
            case Action.LEFT:
                setCol((col) => Math.max(col - 1, 0));
                break;
            case Action.DOWN:
                setRow((row) => Math.min(row + 1, 4));
                break;
            case Action.UP:
                setRow((row) => Math.max(row - 1, 0));
                break;
        }
    };

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
                <h1>{count}</h1>
                <Mine row={row} col={col} goal_row={4} goal_col={3} />
            </div>
        </div>
    );
}
