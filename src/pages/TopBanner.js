import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{mt: 5, mb: 5}} >
            <Typography variant='h5'>
                Wordle
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;