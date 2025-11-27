import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    Divider,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0),
    marginTop: 'auto',
    borderTop: `1px solid ${theme.palette.divider}`,
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '40px',
        height: '3px',
        backgroundColor: theme.palette.primary.main,
        bottom: '-8px',
        left: 0,
    },
}));

const FooterLink = styled(Link)(({ theme }) => ({
    display: 'block',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
    },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    '& svg': {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.main,
        marginTop: theme.spacing(0.5),
    },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    marginRight: theme.spacing(1),
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}));

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <FooterContainer>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* About Us */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle variant="h6" color="textPrimary">
                            About Us
                        </FooterTitle>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            BookHaven is your one-stop destination for all your reading needs. We offer a wide range of books across various genres to satisfy every book lover's appetite.
                        </Typography>
                        <Box>
                            <SocialIcon size="small">
                                <FacebookIcon fontSize="small" />
                            </SocialIcon>
                            <SocialIcon size="small">
                                <TwitterIcon fontSize="small" />
                            </SocialIcon>
                            <SocialIcon size="small">
                                <InstagramIcon fontSize="small" />
                            </SocialIcon>
                            <SocialIcon size="small">
                                <LinkedInIcon fontSize="small" />
                            </SocialIcon>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle variant="h6" color="textPrimary">
                            Quick Links
                        </FooterTitle>
                        <FooterLink component={RouterLink} to="/about">
                            About Us
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/contact">
                            Contact Us
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/faq">
                            FAQs
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/privacy-policy">
                            Privacy Policy
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/terms">
                            Terms & Conditions
                        </FooterLink>
                    </Grid>

                    {/* Categories */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle variant="h6" color="textPrimary">
                            Categories
                        </FooterTitle>
                        <FooterLink component={RouterLink} to="/category/fiction">
                            Fiction
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/category/non-fiction">
                            Non-Fiction
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/category/science">
                            Science & Technology
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/category/biography">
                            Biography
                        </FooterLink>
                        <FooterLink component={RouterLink} to="/category/children">
                            Children's Books
                        </FooterLink>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FooterTitle variant="h6" color="textPrimary">
                            Contact Us
                        </FooterTitle>
                        <ContactInfo>
                            <LocationIcon fontSize="small" />
                            <Typography variant="body2">
                                123 Book Street, Knowledge City, 400001
                            </Typography>
                        </ContactInfo>
                        <ContactInfo>
                            <PhoneIcon fontSize="small" />
                            <Typography variant="body2">+91 98765 43210</Typography>
                        </ContactInfo>
                        <ContactInfo>
                            <EmailIcon fontSize="small" />
                            <Typography variant="body2">info@bookhaven.com</Typography>
                        </ContactInfo>
                        <Box mt={2}>
                            <Typography variant="body2" color="textSecondary">
                                Subscribe to our newsletter
                            </Typography>
                            <Box component="form" sx={{ mt: 1, display: 'flex' }}>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    style={{
                                        flex: 1,
                                        padding: '8px 12px',
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: '4px 0 0 4px',
                                        outline: 'none',
                                        fontSize: '0.875rem',
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: 'white',
                                        border: 'none',
                                        padding: '0 16px',
                                        borderRadius: '0 4px 4px 0',
                                        cursor: 'pointer',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark,
                                        },
                                    }}
                                >
                                    Go
                                </button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            © {new Date().getFullYear()} BookHaven. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box display="flex">
                            <FooterLink component={RouterLink} to="/sitemap" sx={{ ml: 2 }}>
                                Sitemap
                            </FooterLink>
                            <FooterLink component={RouterLink} to="/privacy" sx={{ ml: 2 }}>
                                Privacy Policy
                            </FooterLink>
                            <FooterLink component={RouterLink} to="/terms" sx={{ ml: 2 }}>
                                Terms of Use
                            </FooterLink>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </FooterContainer>
    );
};

export default Footer;
