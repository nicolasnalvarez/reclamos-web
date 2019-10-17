import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@material-ui/core/Icon";
import {Link} from "react-router-dom";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
        maxHeight: '76px',
        width: '250px',
        display: 'flex'
    },
}))(MenuItem);

export default function CustomizedMenus({menuOptions}) {
    // const renderLink = to => React.useMemo(
    //     () =>
    //         React.forwardRef((itemProps, ref) => (
    //             // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
    //             // See https://github.com/ReactTraining/react-router/issues/6056
    //             <Link to={to} {...itemProps} ref={ref} />
    //         )),
    //     [to],
    // );

    const renderLink = to => {
        return <Link to={to}/>
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                style={{opacity: '0.7', backgroundColor: 'black', color: '#fff', marginRight: '10px', width: '160px', boxShadow: '0px 1px 5px 0px rgba(249, 249, 249, 0.2), 0px 2px 2px 0px rgba(255, 253, 253, 0.14), 0px 3px 1px -2px rgba(255, 255, 255, 0.12)'}}
                onClick={handleClick}
                // onMouseEnter={event => {
                //     const currentEvent = {currentTarget: event.currentTarget};
                //     event.persist();
                //     setTimeout(event => handleClick(currentEvent), 300);
                // }}
            >
                <span style={{opacity: '1'}}>Menu</span>
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
            {
                menuOptions.map(menuOption =>
                    <StyledMenuItem
                        key={menuOption.iconName}
                        component={
                            React.forwardRef((itemProps, ref) => (
                                        <Link to={menuOption.pathTo} {...itemProps} ref={ref} />
                                    ))
                        }
                        style={{whiteSpace: 'normal'}}
                    >
                        <ListItemIcon>
                            <Icon>{menuOption.iconName}</Icon>
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{variant: 'subtitle2'}}
                            primary={menuOption.text}
                        />
                    </StyledMenuItem>
                )
            }
            </StyledMenu>
        </div>
    );
}