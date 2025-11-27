import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const HeroSection = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: theme.spacing(8, 0),
    marginBottom: theme.spacing(6),
    textAlign: 'center',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
}));

const HeroContent = styled(Container)({
    position: 'relative',
    zIndex: 2,
});

const SectionTitle = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(4, 0, 2),
    position: 'relative',
    display: 'inline-block',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '50px',
        height: '4px',
        backgroundColor: theme.palette.primary.main,
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '2px',
    },
}));

const StyledButton = styled(Button)({
    marginTop: '1rem',
    padding: '10px 30px',
    borderRadius: '30px',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
});

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Sample featured books data (replace with API call)
    const featuredBooks = [
        {
            id: 1,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 12.99,
            coverImage: 'https://via.placeholder.com/200x300?text=Book+Cover',
        },
        {
            id: 2,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            price: 10.99,
            coverImage: 'https://via.placeholder.com/200x300?text=Book+Cover',
        },
        {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            price: 9.99,
            coverImage: 'https://via.placeholder.com/200x300?text=Book+Cover',
        },
    ];

    return (
        <>
            <HeroSection>
                <HeroContent maxWidth="md">
                    <Typography
                        variant={isMobile ? 'h4' : 'h2'}
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        Welcome to Book Haven
                    </Typography>
                    <Typography variant={isMobile ? 'h6' : 'h5'} paragraph sx={{ mb: 4 }}>
                        Discover your next favorite book from our vast collection
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/catalog"
                            size={isMobile ? 'medium' : 'large'}
                        >
                            Browse Books
                        </StyledButton>
                        <StyledButton
                            variant="outlined"
                            color="inherit"
                            component={Link}
                            to="/register"
                            size={isMobile ? 'medium' : 'large'}
                            sx={{ color: 'white', borderColor: 'white' }}
                        >
                            Join Now
                        </StyledButton>
                    </Box>
                </HeroContent>
            </HeroSection>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <SectionTitle variant="h4" component="h2" align="center">
                    Featured Books
                </SectionTitle>
                <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
                    Explore our handpicked selection of must-read titles
                </Typography>

                <Grid container spacing={4} sx={{ mt: 2, mb: 6 }}>
                    {featuredBooks.map((book) => (
                        <Grid item key={book.id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={book.coverImage}
                                    alt={book.title}
                                />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography gutterBottom variant="h6" component="h3">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" paragraph>
                                        by {book.author}
                                    </Typography>
                                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h6" color="primary">
                                            ${book.price.toFixed(2)}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            component={Link}
                                            to={`/book/${book.id}`}
                                        >
                                            View Details
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{
                    backgroundColor: 'grey.100',
                    p: 6,
                    borderRadius: 2,
                    textAlign: 'center',
                    mb: 6
                }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                        Join Our Community of Book Lovers
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Create an account to save your favorite books, track your reading, and get personalized recommendations.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to="/register"
                        sx={{ mt: 2 }}
                    >
                        Sign Up Free
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default Home;
