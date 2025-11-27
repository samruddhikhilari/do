import React, { useState, useEffect } from 'react';
import api from './api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
// API Configuration

// Request interceptor
api.interceptors.request.use(
  config => {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      data: config.data
    });
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    const errorInfo = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    };
    console.error('API Error:', errorInfo);
    return Promise.reject(error);
  }
);

// Default student data for testing
const DEFAULT_STUDENT = {
  name: '',
  regNo: '',
  department: '',
  sub1Mse: '',
  sub1Ese: '',
  sub2Mse: '',
  sub2Ese: '',
  sub3Mse: '',
  sub3Ese: '',
  sub4Mse: '',
  sub4Ese: ''
};

// Add some global styles for better form appearance
const formStyles = {
  card: {
    p: 3,
    mb: 4,
    borderRadius: 2,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    '&:hover': {
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
    }
  },
  submitButton: {
    mt: 2,
    py: 1.5,
    fontWeight: 'bold',
    textTransform: 'none',
    letterSpacing: 0.5,
    '&:hover': {
      transform: 'translateY(-2px)'
    },
    transition: 'all 0.2s ease-in-out'
  },
  resetButton: {
    mt: 2,
    ml: 2,
    py: 1.5,
    fontWeight: 'medium',
    textTransform: 'none',
    color: 'text.secondary',
    '&:hover': {
      backgroundColor: 'action.hover',
      color: 'text.primary'
    }
  }
};

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ ...DEFAULT_STUDENT });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      console.log('Fetching students from:', '/api/students');
      const response = await api.get('/api/students');
      console.log('Fetched students:', response.data);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      // Initialize with empty array if the request fails
      setStudents([]);
    }
  };

  const validateMarks = (mse, ese) => {
    return mse >= 30 && mse <= 100 && ese >= 70 && ese <= 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate marks before submission
    const marks = [
      { mse: parseFloat(formData.sub1Mse) || 0, ese: parseFloat(formData.sub1Ese) || 0 },
      { mse: parseFloat(formData.sub2Mse) || 0, ese: parseFloat(formData.sub2Ese) || 0 },
      { mse: parseFloat(formData.sub3Mse) || 0, ese: parseFloat(formData.sub3Ese) || 0 },
      { mse: parseFloat(formData.sub4Mse) || 0, ese: parseFloat(formData.sub4Ese) || 0 }
    ];

    const invalidMarks = marks.some((mark, index) => !validateMarks(mark.mse, mark.ese));

    if (invalidMarks) {
      alert('Please ensure all subjects have valid marks (MSE ≥ 30%, ESE ≥ 70%)');
      return;
    }

    try {
      console.log('Form data before submission:', formData);

      // Convert string values to numbers before sending to the backend
      const submissionData = {
        name: formData.name,
        regNo: formData.regNo,
        department: formData.department,
        sub1Mse: marks[0].mse,
        sub1Ese: marks[0].ese,
        sub2Mse: marks[1].mse,
        sub2Ese: marks[1].ese,
        sub3Mse: marks[2].mse,
        sub3Ese: marks[2].ese,
        sub4Mse: marks[3].mse,
        sub4Ese: marks[3].ese
      };

      console.log('Sending data to backend:', submissionData);

      // Use the api instance which has our interceptors
      const response = await api.post('/api/students', submissionData);
      console.log('Backend response:', response.data);

      // Refresh the student list
      await fetchStudents();

      // Reset form to default values
      setFormData({ ...DEFAULT_STUDENT });

      // Show success message
      alert('Student result added successfully!');
    } catch (error) {
      // The error will be caught by our interceptor, but we can add additional handling here
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        console.error(`Request failed with status ${status}:`, data);
        alert(`Error (${status}): ${data.message || 'Unknown error occurred'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('No response from server. Is the backend running?');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleReset = () => {
    setFormData({ ...DEFAULT_STUDENT });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const renderSubjectFields = (subjectNumber) => {
    const mseValue = parseFloat(formData[`sub${subjectNumber}Mse`]) || 0;
    const eseValue = parseFloat(formData[`sub${subjectNumber}Ese`]) || 0;
    const isMseValid = mseValue >= 30 && mseValue <= 100;
    const isEseValid = eseValue >= 70 && eseValue <= 100;

    return (
      <Grid container spacing={2} key={subjectNumber} sx={{ mb: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Subject {subjectNumber}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name={`sub${subjectNumber}Mse`}
            label={`MSE Marks (Min 30%)`}
            type="number"
            value={formData[`sub${subjectNumber}Mse`] || ''}
            onChange={handleChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 0.01,
              'aria-label': `Subject ${subjectNumber} MSE Marks`
            }}
            error={mseValue > 0 && !isMseValid}
            helperText={mseValue > 0 && !isMseValid ? 'MSE must be ≥ 30%' : ''}
            required
            margin="normal"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name={`sub${subjectNumber}Ese`}
            label={`ESE Marks (Min 70%)`}
            type="number"
            value={formData[`sub${subjectNumber}Ese`] || ''}
            onChange={handleChange}
            inputProps={{
              min: 0,
              max: 100,
              step: 0.01,
              'aria-label': `Subject ${subjectNumber} ESE Marks`
            }}
            error={eseValue > 0 && !isEseValid}
            helperText={eseValue > 0 && !isEseValid ? 'ESE must be ≥ 70%' : ''}
            required
            margin="normal"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{
            p: 1,
            bgcolor: isMseValid && isEseValid ? '#e8f5e9' : '#fff8e1',
            borderRadius: 1,
            borderLeft: `4px solid ${isMseValid && isEseValid ? '#4caf50' : '#ffa000'}`
          }}>
            <Typography variant="caption" color="text.secondary">
              {isMseValid && isEseValid
                ? '✓ Marks meet minimum requirements'
                : 'ℹ️ Minimum requirements: MSE ≥ 30%, ESE ≥ 70%'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VIT Student Result System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Add Student Form */}
          <Grid item xs={12} md={5} lg={4}>
            <Card elevation={3} sx={formStyles.card}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
                  📝 Add Student Result
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Student Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        margin="normal"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="regNo"
                        label="Registration Number"
                        value={formData.regNo}
                        onChange={handleChange}
                        required
                        margin="normal"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="department"
                        label="Department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        margin="normal"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3, mb: 2 }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                      Enter Marks (Out of 100)
                    </Typography>
                    {[1, 2, 3, 4].map(renderSubjectFields)}
                  </Box>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleReset}
                      sx={formStyles.resetButton}
                    >
                      Clear Form
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={formStyles.submitButton}
                    >
                      Save Student Result
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Student Results Table */}
          <Grid item xs={12} md={7} lg={8}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Student Results</Typography>
                <Divider sx={{ mb: 3 }} />
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Reg No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Dept</TableCell>
                        <TableCell align="center">Total %</TableCell>
                        <TableCell align="center">Grade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.length > 0 ? (
                        students.map((student) => (
                          <TableRow key={student.id} hover>
                            <TableCell>{student.regNo}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell align="center">
                              {student.totalMarks ? student.totalMarks.toFixed(2) : 'N/A'}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontWeight: 'bold',
                                color: student.grade === 'F' ? 'error.main' : 'success.main'
                              }}
                            >
                              {student.grade || 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No student records found. Add some results to get started.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} VIT Student Result System
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default App;
