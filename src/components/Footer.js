import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {`Copyright © Your Website ${new Date().getFullYear()}.`}
        </Typography>
    );
}

const Footer = (props) => (
    <>
        <Box mt={8}>
            <Copyright />
        </Box>
    </>
);

export default Footer;