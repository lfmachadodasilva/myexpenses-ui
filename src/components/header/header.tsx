import React, { memo, useState, useContext, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ListItemIcon, ListItemText, Divider, Container, MenuItem, Menu, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LabelIcon from '@material-ui/icons/Label';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';

import { userContext } from '../../contexts/userContext';
import { hasValue } from '../../helpers/utilHelper';
import { signOut } from '../../services/authService';
import { Routes } from '../../pages/routes';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 999,
        [theme.breakpoints.up('sm')]: {
            zIndex: theme.zIndex.drawer
        },
        position: 'static'
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer'
    },
    buttons: {
        color: 'inherit'
    },
    menu: {
        paper: {
            width: drawerWidth
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: 'auto'
    },
    container: {
        padding: 0
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

export interface HeaderProps {}

const HeaderComponent: React.FC<HeaderProps> = memo(() => {
    const { user } = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const [t] = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleOpen = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleGoToHome = useCallback(() => {
        setOpen(false);
        setAnchorEl(null);
        history.push(Routes.home);
    }, [history]);
    const handleGoToGroups = useCallback(() => {
        setOpen(false);
        setAnchorEl(null);
        history.push(Routes.groups);
    }, [history]);
    const handleGoToLabels = useCallback(() => {
        setOpen(false);
        setAnchorEl(null);
        if (hasValue(location.search)) {
            history.push({ pathname: Routes.labels, search: location.search });
        } else {
            history.push(Routes.labels);
        }
    }, [history, location]);
    const handleGoToExpenses = useCallback(() => {
        setOpen(false);
        setAnchorEl(null);
        if (hasValue(location.search)) {
            history.push({ pathname: Routes.expenses, search: location.search });
        } else {
            history.push(Routes.expenses);
        }
    }, [history, location]);
    const handleGoToSettings = useCallback(() => {
        setOpen(false);
        setAnchorEl(null);
        history.push(Routes.settings);
    }, [history]);
    const handleGoToAuth = useCallback(() => {
        setOpen(false);
        setAnchorEl(null);
        history.push(Routes.auth);
    }, [history]);
    const handleLogout = useCallback(async () => {
        setAnchorEl(null);
        setOpen(false);
        await signOut();
        setTimeout(() => history.push(Routes.home));
    }, [history]);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (hasValue(user)) {
            setAnchorEl(event.currentTarget);
            return;
        }
        setAnchorEl(null);
        handleGoToAuth();
    };

    const userEmail = user?.email ?? '';
    const userDisplayName = user?.displayName ?? '';
    const userPhotoURL = user?.photoURL ?? '';

    const avatarIcon = useMemo(() => {
        return hasValue(userPhotoURL) ? (
            <Avatar alt={userEmail} src={userPhotoURL} className={classes.small} />
        ) : (
            <AccountCircle />
        );
    }, [classes.small, userEmail, userPhotoURL]);

    const displayName = useMemo(() => {
        return hasValue(userDisplayName) ? userDisplayName.split(' ')[0] : userEmail;
    }, [userDisplayName, userEmail]);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Container maxWidth="md" className={classes.container}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            className={classes.sectionMobile}
                            onClick={handleOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} onClick={handleGoToHome}>
                            {t('HEADER.TITLE')}
                        </Typography>
                        <div className={classes.sectionDesktop}>
                            <Button
                                className={classes.buttons}
                                size="small"
                                onClick={handleGoToGroups}
                                startIcon={<GroupIcon />}
                            >
                                {t('HEADER.GROUPS')}
                            </Button>
                            <Button
                                className={classes.buttons}
                                size="small"
                                onClick={handleGoToLabels}
                                startIcon={<LabelIcon />}
                            >
                                {t('HEADER.LABELS')}
                            </Button>
                            <Button
                                className={classes.buttons}
                                size="small"
                                onClick={handleGoToExpenses}
                                startIcon={<AccountBalanceWalletIcon />}
                            >
                                {t('HEADER.EXPENSES')}
                            </Button>
                            <IconButton
                                data-testid="avatar-element"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {avatarIcon}
                            </IconButton>
                            <Menu
                                data-testid="avatar-menu-element"
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>{avatarIcon}</ListItemIcon>
                                    <ListItemText primary={displayName} />
                                </MenuItem>
                                <MenuItem onClick={handleGoToSettings}>
                                    <ListItemIcon>
                                        <SettingsIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('HEADER.SETTINGS')} />
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <ExitToAppIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={t('HEADER.LOGOUT')} />
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <SwipeableDrawer
                className={classes.drawer.concat(classes.sectionMobile)}
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button key="home">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Home'} onClick={handleGoToHome} />
                        </ListItem>
                        <Divider />
                        <ListItem button key="groups" onClick={handleGoToGroups}>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('HEADER.GROUPS')} />
                        </ListItem>
                        <ListItem button key="labels" onClick={handleGoToLabels}>
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('HEADER.LABELS')} />
                        </ListItem>
                        <ListItem button key="expenses" onClick={handleGoToExpenses}>
                            <ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('HEADER.EXPENSES')} />
                        </ListItem>
                    </List>
                    <Divider />
                    {hasValue(user) && (
                        <List>
                            <ListItem button key="user">
                                <ListItemIcon>{avatarIcon}</ListItemIcon>
                                <ListItemText primary={displayName} />
                            </ListItem>
                            <ListItem button key="logout" onClick={handleGoToSettings}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary={t('HEADER.SETTINGS')} />
                            </ListItem>
                            <ListItem button key="logout" onClick={handleLogout}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={t('HEADER.LOGOUT')} />
                            </ListItem>
                        </List>
                    )}
                    {!hasValue(user) && (
                        <List>
                            <ListItem button key="login" onClick={handleGoToAuth}>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                <ListItemText primary={t('HEADER.LOGIN_REGISTER')} />
                            </ListItem>
                        </List>
                    )}
                </div>
            </SwipeableDrawer>
        </div>
    );
});

export const Header = HeaderComponent;
