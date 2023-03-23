import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";

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

const KeyboardKey = (props) => {
    // Represents one keyboard key
    const {keyValue, keyColor} = props;
    const {backgroundColor} = keyColor;

    return (
        <Box sx={{
            width: keyboardConfig.widthOfABox,
            height: keyboardConfig.heightOfABox,
            border: 1,
            borderColor: 'black',
            backgroundColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {keyValue}
        </Box>
    )

}

const Keyboard = (props) => {
    const {keyboardClickHandler, keyboardRowOne ,keyboardRowTwo, keyboardRowThree} = props;
    // Change background color acording to a prop

    return (
        <Fragment>
            <Grid container columns={keyboardConfig.numBoxesPerRow[0]} //key={"KeyboardRow1"}
                sx = {{ // Set width of grid
                    width: keyboardConfig.numBoxesPerRow * keyboardConfig.widthOfABox + 
                            (keyboardConfig.numBoxesPerRow - 1) * keyboardConfig.gapBetweenBoxes
                }}
            >{
                keyboardRowOne.map((elementAttributes, idx) => 
                <Grid item
                      key={keyboardConfig.keyboardChars[idx]}
                      xs={1}
                      sx={{mb: 0.8}}
                      onClick={() => keyboardClickHandler(idx)}
                >
                    <KeyboardKey keyValue={keyboardConfig.keyboardChars[idx]} keyColor={elementAttributes} />
                </Grid>)}
            </Grid>

            <Grid container columns={keyboardConfig.numBoxesPerRow[0]} //key={"KeyboardRow2"}
                sx = {{ // Set width of grid
                    width: keyboardConfig.numBoxesPerRow * keyboardConfig.widthOfABox + 
                            (keyboardConfig.numBoxesPerRow - 1) * keyboardConfig.gapBetweenBoxes
                }}
            >{
                keyboardRowTwo.map((elementAttributes, idx) =>
                <Grid item
                    key={keyboardConfig.keyboardChars[idx + keyboardConfig.numBoxesPerRow[0]]}
                    xs={1}
                    sx={{mb: 0.8}}
                    onClick={() => keyboardClickHandler(idx + keyboardConfig.numBoxesPerRow[0], "gray")}
                >
                    <KeyboardKey keyValue={keyboardConfig.keyboardChars[idx + keyboardConfig.numBoxesPerRow[0]]} keyColor={elementAttributes} />
                </Grid>)}
            </Grid>

            <Grid container columns={keyboardConfig.numBoxesPerRow[0]} //key={"KeyboardRow3"}
                sx = {{ // Set width of grid
                    width: keyboardConfig.numBoxesPerRow * keyboardConfig.widthOfABox + 
                            (keyboardConfig.numBoxesPerRow - 1) * keyboardConfig.gapBetweenBoxes
                }}
            >{
                keyboardRowThree.map((elementAttributes, idx) =>
                <Grid item
                    key={keyboardConfig.keyboardChars[idx + keyboardConfig.numBoxesPerRow[0] + keyboardConfig.numBoxesPerRow[1]]}
                    xs={1}
                    sx={{mb: 0.8}}
                    onClick={() => keyboardClickHandler(idx + keyboardConfig.numBoxesPerRow[0] + keyboardConfig.numBoxesPerRow[1], "gray")}
                >
                    <KeyboardKey keyValue={keyboardConfig.keyboardChars[idx + keyboardConfig.numBoxesPerRow[0] + keyboardConfig.numBoxesPerRow[1]]} keyColor={elementAttributes} />
                </Grid>)}
            </Grid>
        </Fragment>
    )
}

export default Keyboard;