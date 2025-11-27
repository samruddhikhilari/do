import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
    Checkbox,
    FormControlLabel,
    FormHelperText,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/auth/authContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 600,
    margin: '0 auto',
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius * 2,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
        boxShadow: 'none',
    },
}));

const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    terms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('Required'),
});

const Register = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { register, isAuthenticated, error, clearErrors } = authContext;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error) {
            // Handle error (e.g., show error message)
            console.error(error);
            clearErrors();
        }
        // eslint-disable-next-line
    }, [isAuthenticated, error]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
        validationSchema,
        onSubmit: (values) => {
            const { name, email, password } = values;
            if (name && email && password) {
                register({ name, email, password });
            }
        },
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
            <StyledPaper elevation={isMobile ? 0 : 3}>
                <Box textAlign="center" mb={4}>
                    <Typography component="h1" variant="h4" fontWeight="bold" color="primary">
                        Create an Account
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={1}>
                        Join our community of book lovers
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    sx={{ width: '100%' }}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="name"
                                name="name"
                                label="Full Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="terms"
                                        name="terms"
                                        color="primary"
                                        checked={formik.values.terms}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        I agree to the{' '}
                                        <Link href="/terms" color="primary" underline="hover">
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" color="primary" underline="hover">
                                            Privacy Policy
                                        </Link>
                                    </Typography>
                                }
                            />
                            {formik.touched.terms && formik.errors.terms && (
                                <FormHelperText error>{formik.errors.terms}</FormHelperText>
                            )}
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
                        disabled={formik.isSubmitting}
                    >
                        Create Account
                    </Button>
                </Box>

                <Box width="100%" mt={2} mb={3}>
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
                            ALREADY HAVE AN ACCOUNT?
                        </Typography>
                    </Divider>
                </Box>

                <Box textAlign="center" mt={2}>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 500,
                        }}
                    >
                        Sign In
                    </Button>
                </Box>
            </StyledPaper>
        </Container>
    );
};

export default Register;
