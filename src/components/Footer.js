import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";

function Copyright() {
    return (
        <Typography style={{color: 'white'}} variant="body2" color="textPrimary" align="center">
            {`Copyright © Your Website ${new Date().getFullYear()}.`}
        </Typography>
    );
}

const Footer = props => (
    <Box component='footer' pt={2} pb={2} style={{backgroundColor: '#666'}}>
        <Copyright />
    </Box>
);

export default Footer;