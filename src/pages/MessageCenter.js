import React, {Fragment} from 'react';
import {Typography, Box} from '@mui/material';

const MessageCenter = (props) => {
    const {messageCenter} = props;
    return (
        <Fragment>
            <Box sx={{mt: 5, mb: 5}}>
                <Typography variant='h5'>
                    {messageCenter}
                </Typography>
            </Box>
        </Fragment>
    )
}

export default MessageCenter;