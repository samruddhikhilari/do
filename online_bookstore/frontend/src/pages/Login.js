import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Alert,
    Stack,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AuthContext from '../context/auth/authContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 500,
    margin: '0 auto',
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius * 2,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        boxShadow: 'none',
    },
}));

const SocialButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    padding: '10px 16px',
    margin: theme.spacing(1, 0),
    width: '100%',
    justifyContent: 'flex-start',
    '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1.5),
    },
}));

const Login = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useContext(AuthContext);
    const { login, isAuthenticated, error, clearErrors } = authContext;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const { email, password, showPassword } = formData;

    useEffect(() => {
        if (isAuthenticated) {
            const redirectTo = location.state?.from?.pathname || '/';
            navigate(redirectTo);
        }

        if (error) {
            // Handle error (e.g., show error message)
            console.error(error);
            clearErrors();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, error]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClickShowPassword = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            login({ email, password });
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google OAuth
        console.log('Google login');
    };

    const handleFacebookLogin = () => {
        // Implement Facebook OAuth
        console.log('Facebook login');
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
            <StyledPaper elevation={isMobile ? 0 : 3}>
                <Box textAlign="center" mb={4}>
                    <Typography component="h1" variant="h4" fontWeight="bold" color="primary">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                        Sign in to access your account
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            variant="body2"
                            color="primary"
                            underline="hover"
                        >
                            Forgot password?
                        </Link>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2, py: 1.5, fontSize: '1rem' }}
                    >
                        Sign In
                    </Button>
                </Box>

                <Box width="100%" mt={3} mb={2}>
                    <Divider sx={{ position: 'relative' }}>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'background.paper',
                                px: 2,
                            }}
                        >
                            OR CONTINUE WITH
                        </Typography>
                    </Divider>
                </Box>

                <Stack spacing={2} width="100%" mt={2} mb={3}>
                    <SocialButton
                        variant="outlined"
                        startIcon={<Google />}
                        onClick={handleGoogleLogin}
                        sx={{
                            borderColor: 'text.secondary',
                            '&:hover': {
                                borderColor: 'text.primary',
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        Sign in with Google
                    </SocialButton>
                    <SocialButton
                        variant="outlined"
                        startIcon={<Facebook color="primary" />}
                        onClick={handleFacebookLogin}
                        sx={{
                            borderColor: 'text.secondary',
                            '&:hover': {
                                borderColor: 'text.primary',
                                backgroundColor: 'action.hover',
                            },
                        }}
                    >
                        Sign in with Facebook
                    </SocialButton>
                </Stack>

                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" color="textSecondary">
                        Don't have an account?{' '}
                        <Link
                            component={RouterLink}
                            to="/register"
                            color="primary"
                            underline="hover"
                            fontWeight="medium"
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default Login;
