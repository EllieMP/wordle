import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
//import random from Math;


import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard";
import MessageCenter from "./pages/MessageCenter";
import TopBanner from "./pages/TopBanner";
import wordOptions from "./fiveLetterWords.json";
//import { act } from '@testing-library/react';

const config = {
    numBoxesPerRow: 5,
    numBoxRows: 6,
    widthOfABox: 50,
    heightOfABox: 50,
    gapBetweenBoxes: 10,
    initialBackgroundColor: 'white'
};
const keyboardConfig = {
    numBoxesPerRow: [10, 9, 9],
    numRows: 3,
    widthOfABox: 40,
    heightOfABox: 40,
    gapBetweenBoxes: 5,
    initialBackgroundColor: 'white',
    keyboardChars: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d",
                     "f", "g", "h", "j", "k", "l", "Enter", "z", "x", "c", "v", "b", 
                     "n", "m", "<-"]
};

function App() {

    // Choose a random element from an array
    function chooseRandomElement (options) {
        const word_idx = Math.floor(Math.random() * options.length);
        return(options[word_idx]);
    }

    // Choose a target word and turn it into an array of characters
    //const [correctWord, setCorrectWord] = useState(chooseRandomElement(wordOptions).split(''));
    const [correctWord] = useState(chooseRandomElement(wordOptions).split(''));
    const [activeRow, setActiveRow] = useState(new Array(config.numBoxesPerRow).fill({
        backgroundColor: config.initialBackgroundColor,
        character: ''
    }));
    const [allBoxes] = useState([...activeRow, ...new Array(config.numBoxesPerRow * config.numBoxRows - config.numBoxesPerRow).fill({
        backgroundColor: config.initialBackgroundColor,
        character: ''
    })]);

    const [remainingRows, setRemainingRows] = useState([...allBoxes.slice(config.numBoxesPerRow, config.numBoxesPerRow * config.numBoxRows)]);

    const [completedRows, setCompletedRows] = useState([]);

    // useState hooks for each keyboard row
    const [keyboardRowOne, setActiveKeyboardRowOne] = useState(new Array(keyboardConfig.numBoxesPerRow[0]).fill({
        backgroundColor: keyboardConfig.initialBackgroundColor
    }));

    const [keyboardRowTwo, setActiveKeyboardRowTwo] = useState(new Array(keyboardConfig.numBoxesPerRow[1]).fill({
        backgroundColor: keyboardConfig.initialBackgroundColor
    }));

    const [keyboardRowThree, setActiveKeyboardRowThree] = useState(new Array(keyboardConfig.numBoxesPerRow[2]).fill({
        backgroundColor: keyboardConfig.initialBackgroundColor
    }));

    const [messageCenter, setMessageCenter] = useState('');



    const keyboardClickHandler = (idx) => {
        let wordSubmission = [];
        for (let element of activeRow) {
            if (keyboardConfig.keyboardChars.includes(element.character))
                wordSubmission.push(element.character);
        }
        console.log('word submission: ', wordSubmission);

        if (wordSubmission.length <= 5) {
            const appendChar = keyboardConfig.keyboardChars[idx];
            if (appendChar === "<-" && wordSubmission.length > 0) {
                wordSubmission.pop();
                // Update active row according to wordSubmission
                let newActiveRow = activeRow.slice();
                let iter = 0;
                for (let element of wordSubmission) {
                    if (iter < config.numBoxesPerRow)
                        newActiveRow[iter] = {
                            backgroundColor: newActiveRow[iter].backgroundColor,
                            character: element
                        };
                    iter++;
                }
                newActiveRow[iter] = {
                    backgroundColor: newActiveRow[iter].backgroundColor,
                    character: ''
                };
                setActiveRow(newActiveRow);
            }
            else if (wordSubmission.length < 5 && appendChar !== "Enter" && appendChar !== "<-") {
                wordSubmission.push(keyboardConfig.keyboardChars[idx]);
                // Update active row according to wordSubmission
                let newActiveRow = activeRow.slice();
                let iter = 0;
                for (let element of wordSubmission) {
                    if (iter < config.numBoxesPerRow)
                        newActiveRow[iter] = {
                            backgroundColor: newActiveRow[iter].backgroundColor,
                            character: element
                        };
                    iter++;
                }
                setActiveRow(newActiveRow);
            }
            else if (appendChar === "Enter" && wordSubmission.length === 5) {
                enterAnswer(wordSubmission);
            }
        }
    }


    const enterAnswer = (wordSubmission) => {
        if (JSON.stringify(wordSubmission) === JSON.stringify(correctWord)) {
            setMessageCenter('You found the word!');
        }
        else if (remainingRows.length === 0) {
            setMessageCenter('You did not find the word in 6 attempts. The word was '.concat(correctWord.join('')));
        }
        else {
            let idxArr = []
            let newActiveRow = activeRow.slice();
            for (let i = 0; i < config.numBoxesPerRow; i++) {
                if (!correctWord.includes(wordSubmission[i])) {
                    newActiveRow[i] = {
                        backgroundColor: "gray",
                        character: newActiveRow[i].character
                    }
                    for (let j = 0; j < keyboardConfig.keyboardChars.length; j++) {
                        if (wordSubmission[i] === keyboardConfig.keyboardChars[j])
                            idxArr.push(j);
                    }
                }
                else {
                    if (correctWord[i] === newActiveRow[i].character){
                        newActiveRow[i] = {
                            backgroundColor: "green",
                            character: newActiveRow[i].character
                        }
                    }
                    else {
                        newActiveRow[i] = {
                            backgroundColor: "yellow",
                            character: newActiveRow[i].character
                        }
                    }
                }
            }
            if (idxArr.length > 0)
                changeKeyboardColor(idxArr, "gray");

            setCompletedRows([...completedRows, ...newActiveRow]);
            setActiveRow(remainingRows.slice(0, config.numBoxesPerRow));
            setRemainingRows(remainingRows.slice(config.numBoxesPerRow, config.numBoxesPerRow.length));
        }
    }

    console.log(correctWord);
    function changeKeyboardColor (idxArr, color) {
        const newActiveRowOne = keyboardRowOne.slice();
        const newActiveRowTwo = keyboardRowTwo.slice();
        const newActiveRowThree = keyboardRowThree.slice();
        for (let idx of idxArr) {
            if ( idx < keyboardConfig.numBoxesPerRow[0]) {
                newActiveRowOne[idx] = {
                    backgroundColor: color
                }
            }
            else if (idx >= keyboardConfig.numBoxesPerRow[0] && 
                    idx < keyboardConfig.numBoxesPerRow[0] + keyboardConfig.numBoxesPerRow[1]) {
                newActiveRowTwo[idx - keyboardConfig.numBoxesPerRow[0]] = {
                    backgroundColor: color
                }
            }
            else if (idx >= keyboardConfig.numBoxesPerRow[0] + keyboardConfig.numBoxesPerRow[1] && 
                    idx < keyboardConfig.numBoxesPerRow[0] + keyboardConfig.numBoxesPerRow[1] + 
                    keyboardConfig.numBoxesPerRow[2]) {
                newActiveRowThree[idx - keyboardConfig.numBoxesPerRow[0] - keyboardConfig.numBoxesPerRow[1]] = {
                    backgroundColor: color
                }
            }
        }
        setActiveKeyboardRowOne(newActiveRowOne);
        setActiveKeyboardRowTwo(newActiveRowTwo);
        setActiveKeyboardRowThree(newActiveRowThree);
    }


    return (
      <Fragment>
          <Box margin='auto'
            sx={{
                height: 600,
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
          >
              <TopBanner />
              <GuessArea allBoxes = {allBoxes} 
                         completedRows = {completedRows}
                         activeRow = {activeRow}
                         remainingRows = {remainingRows}
                />
              <MessageCenter messageCenter = {messageCenter}
              />
              <Keyboard keyboardRowOne = {keyboardRowOne}
                        keyboardRowTwo = {keyboardRowTwo}
                        keyboardRowThree = {keyboardRowThree}
                        keyboardClickHandler = {keyboardClickHandler}
              />
          </Box>
      </Fragment>
  );
}

export default App;
