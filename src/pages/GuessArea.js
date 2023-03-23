import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";

const config = {
    numBoxesPerRow: 5,
    numRows: 6,
    widthOfABox: 50,
    heightOfABox: 50,
    gapBetweenBoxes: 10,
    initialBackgroundColor: 'white'
};

const LetterBox = (props) => {
    // Represent a box into which a letter may be displayed.
    // In this version, we display the value of "index"
    // in the box.

    const {value, character} = props;
    const { backgroundColor } = value;
    return (
        <Box sx={{
            width: config.widthOfABox,
            height: config.heightOfABox,
            border: 1,
            borderColor: 'black',
            backgroundColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {character}
        </Box>
    )
}

const GuessArea = (props) => {

    const {completedRows, activeRow, remainingRows} = props;
    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

    return (
        <Fragment>
            <Grid  container columns={config.numBoxesPerRow}
                sx={{
                    width: config.numBoxesPerRow * config.widthOfABox +
                            (config.numBoxesPerRow - 1) * config.gapBetweenBoxes,
                }}
            >
            {
                allBoxes.map((elementAttributes, idx) =>
                    <Grid item
                          key={idx}
                          xs={1}
                          sx={{mb: 0.8}}
                    >
                        <LetterBox character = {allBoxes[idx].character} value={elementAttributes} />
                    </Grid>
                )
            }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;