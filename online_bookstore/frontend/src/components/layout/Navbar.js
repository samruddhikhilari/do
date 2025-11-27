import React, { Fragment, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Container,
    Box,
    Menu,
    MenuItem,
    Avatar,
    Divider,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    ShoppingCart,
    Person,
    ExitToApp,
    Bookmark,
    Dashboard,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AuthContext from '../../context/auth/authContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));

const Logo = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.5rem',
    marginRight: theme.spacing(4),
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        color: theme.palette.primary.dark,
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0, 1),
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.dark,
    },
}));

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isAuthenticated, user, logout } = authContext;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const onLogout = () => {
        handleMenuClose();
        logout();
        navigate('/');
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                component={RouterLink}
                to="/profile"
                onClick={handleMenuClose}
            >
                <Person sx={{ mr: 1 }} /> My Profile
            </MenuItem>
            {user && user.role === 'admin' && (
                <MenuItem
                    component={RouterLink}
                    to="/admin/dashboard"
                    onClick={handleMenuClose}
                >
                    <Dashboard sx={{ mr: 1 }} /> Admin Dashboard
                </MenuItem>
            )}
            <Divider />
            <MenuItem onClick={onLogout}>
                <ExitToApp sx={{ mr: 1 }} /> Logout
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem component={RouterLink} to="/catalog" onClick={handleMobileMenuClose}>
                <Typography>Browse Books</Typography>
            </MenuItem>
            <MenuItem component={RouterLink} to="/categories" onClick={handleMobileMenuClose}>
                <Typography>Categories</Typography>
            </MenuItem>
            {isAuthenticated ? (
                [
                    <MenuItem key="wishlist" component={RouterLink} to="/wishlist" onClick={handleMobileMenuClose}>
                        <Bookmark sx={{ mr: 1 }} /> Wishlist
                    </MenuItem>,
                    <MenuItem key="cart" component={RouterLink} to="/cart" onClick={handleMobileMenuClose}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ShoppingCart sx={{ mr: 1 }} />
                            <Typography>Cart</Typography>
                            <Badge badgeContent={0} color="secondary" sx={{ ml: 1 }} />
                        </Box>
                    </MenuItem>,
                    <MenuItem key="profile" onClick={handleProfileMenuOpen}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                                {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </Avatar>
                            <Typography>Profile</Typography>
                        </Box>
                    </MenuItem>
                ]
            ) : (
                [
                    <MenuItem key="login" component={RouterLink} to="/login" onClick={handleMobileMenuClose}>
                        <Typography color="primary">Login</Typography>
                    </MenuItem>,
                    <MenuItem key="register" component={RouterLink} to="/register" onClick={handleMobileMenuClose}>
                        <Typography color="primary">Register</Typography>
                    </MenuItem>
                ]
            )}
        </Menu>
    );

    return (
        <Fragment>
            <StyledAppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo */}
                        <Logo
                            variant="h6"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                textDecoration: 'none',
                            }}
                        >
                            BookHaven
                        </Logo>

                        {/* Mobile menu button */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Mobile logo */}
                        <Logo
                            variant="h6"
                            noWrap
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                textDecoration: 'none',
                            }}
                        >
                            BookHaven
                        </Logo>

                        {/* Desktop navigation */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
                            <NavButton
                                component={RouterLink}
                                to="/catalog"
                                color="inherit"
                            >
                                Browse Books
                            </NavButton>
                            <NavButton
                                component={RouterLink}
                                to="/categories"
                                color="inherit"
                            >
                                Categories
                            </NavButton>
                            <NavButton
                                component={RouterLink}
                                to="/new-releases"
                                color="inherit"
                            >
                                New Releases
                            </NavButton>
                        </Box>

                        {/* Desktop right side icons */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            {isAuthenticated ? (
                                <>
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        component={RouterLink}
                                        to="/wishlist"
                                        sx={{ mx: 1 }}
                                    >
                                        <Bookmark />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        component={RouterLink}
                                        to="/cart"
                                        sx={{ mx: 1 }}
                                    >
                                        <Badge badgeContent={0} color="secondary">
                                            <ShoppingCart />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        sx={{ ml: 1 }}
                                    >
                                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                            {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </Avatar>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Button
                                        component={RouterLink}
                                        to="/login"
                                        color="inherit"
                                        sx={{ mx: 1 }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={RouterLink}
                                        to="/register"
                                        sx={{ ml: 1, textTransform: 'none' }}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </StyledAppBar>
            {renderMobileMenu}
            {renderMenu}
        </Fragment>
    );
};

export default Navbar;
