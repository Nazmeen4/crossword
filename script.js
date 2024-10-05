// script.js

// Corrected crossword puzzle data with proper numbering
const crosswordData = {
    grid: [
        ['C', '', '', '', '', 'B', 'A', 'T'], // "CAT" starts at (0,0), "BAT" starts at (0,5)
        ['A', 'P', 'P', 'L', 'E', '', '', ''], // "APPLE" starts at (1,0), "PEAR" down at (1,3)
        ['T', '', 'G', '', 'A', 'N', 'T', ''], // "PIG" starts at (2,2), "ANT" down at (2,4)
        ['', '', 'R', '', '', '', '', ''],     // Continuation of "PIG", "ANT"
        ['', 'H', 'O', 'R', 'S', 'E', '', ''], // "HORSE" starts at (4,1)
        ['P', '', 'G', '', '', 'T', 'O', 'W'], // "OWL" starts at (5,6)
        ['I', 'G', 'E', 'N', 'T', '', 'L', ''], // "AGENT" starts at (6,1)
        ['G', '', '', '', '', '', '', '']      // Empty row
    ],
    clues: {
        across: [
            { number: 5, clue: "Flying mammal", row: 0, col: 5, length: 3 }, // BAT
            { number: 2, clue: "Fruit", row: 1, col: 0, length: 5 }, // APPLE
            { number: 3, clue: "Farm animal", row: 4, col: 1, length: 5 }, // HORSE
            { number: 4, clue: "Spy", row: 6, col: 1, length: 5 }, // AGENT
        ],
        down: [
            { number: 1, clue: "Meow", row: 0, col: 0, length: 3 }, // CAT
            { number: 6, clue: "Red fruit", row: 1, col: 3, length: 4 }, // PEAR
            { number: 7, clue: "Big animal", row: 2, col: 2, length: 3 }, // PIG
            { number: 8, clue: "Toy brick", row: 2, col: 4, length: 3 }, // ANT
            { number: 9, clue: "Fast bird", row: 5, col: 6, length: 3 }, // OWL
        ]
    }
};

// Generate the crossword grid with numbers
function createGrid() {
    const gridTable = document.getElementById('crossword-grid');
    const numbersMap = createNumbering(); // Get the numbering map for cells

    for (let i = 0; i < crosswordData.grid.length; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < crosswordData.grid[i].length; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;

            // If there's a number assigned to the cell, show it in the corner
            if (numbersMap[i] && numbersMap[i][j]) {
                const numberSpan = document.createElement('span');
                numberSpan.textContent = numbersMap[i][j];
                numberSpan.classList.add('cell-number');
                cell.appendChild(numberSpan);
            }

            if (crosswordData.grid[i][j] === '') {
                input.disabled = true; // Disable unused cells
                cell.style.backgroundColor = '#ccc'; // Grey out unused cells
            }
            cell.appendChild(input);
            row.appendChild(cell);
        }
        gridTable.appendChild(row);
    }
}

// Function to generate a map of clue numbers on the grid
function createNumbering() {
    const numbersMap = {};
    let clueNumber = 1;

    function addNumber(row, col) {
        if (!numbersMap[row]) numbersMap[row] = {};
        numbersMap[row][col] = clueNumber;
        clueNumber++;
    }

    crosswordData.clues.across.forEach((clue) => {
        addNumber(clue.row, clue.col);
    });

    crosswordData.clues.down.forEach((clue) => {
        if (!numbersMap[clue.row] || !numbersMap[clue.row][clue.col]) {
            addNumber(clue.row, clue.col); // Avoid duplicate numbering for overlapping across/down
        }
    });

    return numbersMap;
}

// Generate clues with numbers
function createClues() {
    const cluesList = document.getElementById('clues-list');
    const acrossClues = document.createElement('div');
    const downClues = document.createElement('div');

    acrossClues.innerHTML = '<h3>Across</h3>';
    downClues.innerHTML = '<h3>Down</h3>';

    crosswordData.clues.across.forEach((clue) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${clue.number}. ${clue.clue}`;
        acrossClues.appendChild(listItem);
    });

    crosswordData.clues.down.forEach((clue) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${clue.number}. ${clue.clue}`;
        downClues.appendChild(listItem);
    });

    cluesList.appendChild(acrossClues);
    cluesList.appendChild(downClues);
}

// Check answers
function checkAnswers() {
    let correct = true;
    const grid = crosswordData.grid;
    const gridTable = document.getElementById('crossword-grid');

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const input = gridTable.rows[i].cells[j].querySelector('input');
            if (!input.disabled && input.value.toUpperCase() !== grid[i][j]) {
                input.style.backgroundColor = '#f8d7da'; // Highlight wrong answers
                correct = false;
            } else if (!input.disabled) {
                input.style.backgroundColor = '#d4edda'; // Highlight correct answers
            }
        }
    }

    const result = document.getElementById('result');
    if (correct) {
        result.textContent = "Great job! You solved it!";
    } else {
        result.textContent = "Some answers are incorrect. Keep trying!";
    }
}

document.getElementById('check-answers').addEventListener('click', checkAnswers);

// Initialize the game
createGrid();
createClues();
