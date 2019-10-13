import React, {PureComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from "prop-types";
import CustomizedMenus from "./CustomizedMenus";

// const menuStyles = makeStyles({
//     paper: {
//         border: '1px solid #d3d4d5',
//     },
// });
//
// const StyledMenu = props => {
//     const classes = menuStyles()
//
//     return (
//         <Menu
//             className={classes.paper}
//             elevation={0}
//             getContentAnchorEl={null}
//             anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'center',
//             }}
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'center',
//             }}
//             {...props}
//         />
//     )
// };
//
// const menuItemStyles = makeStyles(theme => ({
//     root: {
//         '&:focus': {
//             backgroundColor: theme.palette.primary.main,
//             '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//                 color: theme.palette.common.white,
//             },
//         },
//     },
// }));
//
// const StyledMenuItem = props => {
//     const classes = menuItemStyles();
//
//     return (
//         <MenuItem className={classes.root}/>
//     )
// };
//
// class CustomizedMenus extends PureComponent {
//     state = {
//         anchorEl: null,
//     };
//
//     setAnchorEl = val => {
//         this.setState({anchorEl: val});
//     };
//
//     handleClick = event => {
//         this.setAnchorEl(event.currentTarget);
//     };
//
//     handleClose = () => {
//         this.setAnchorEl(null);
//     };
//
//     render () {
//         const {anchorEl} = this.state;
//
//         return (
//             <div>
//                 <Button
//                     aria-controls="customized-menu"
//                     aria-haspopup="true"
//                     variant="contained"
//                     color="primary"
//                     onClick={this.handleClick}
//                 >
//                     Open Menu
//                 </Button>
//                 <StyledMenu
//                     id="customized-menu"
//                     anchorEl={anchorEl}
//                     keepMounted
//                     open={!!anchorEl}
//                     onClose={this.handleClose}
//                 >
//                     <StyledMenuItem>
//                         <ListItemIcon>
//                             <SendIcon fontSize="small" />
//                         </ListItemIcon>
//                         <ListItemText primary="Sent mail" />
//                     </StyledMenuItem>
//                     <StyledMenuItem>
//                         <ListItemIcon>
//                             <DraftsIcon fontSize="small" />
//                         </ListItemIcon>
//                         <ListItemText primary="Drafts" />
//                     </StyledMenuItem>
//                     <StyledMenuItem>
//                         <ListItemIcon>
//                             <InboxIcon fontSize="small" />
//                         </ListItemIcon>
//                         <ListItemText primary="Inbox" />
//                     </StyledMenuItem>
//                 </StyledMenu>
//             </div>
//         );
//     }
// };

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

const Header = props => {
    const classes = useStyles();

    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <CustomizedMenus/>
                <Typography variant="h6" className={classes.title}>
                    Sistema de generación de reclamos
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </div>
)};

export default Header;