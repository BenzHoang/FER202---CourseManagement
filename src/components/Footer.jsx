import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="Footer" sx={{mt:'auto', p:2, backgroundColor: '#808080' , color: '#fff'}}>
            <Typography align='center'>© Tháng 6 2024 - Course Managerment</Typography>
        </Box>
    );
};

export default Footer;