import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import axios from 'axios';
import APIRoutes from '../../routes';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {'Copyright © '}
      <a color="inherit">
        Cloudiy
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const history = useNavigate ();

  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  async function getTokenAsync(e) { 
    e.preventDefault();
    setErrorUsername({userName: ""});
    setErrorEmail({email: ""});
    setErrorPassword({password: ""});
    let regUserName = new RegExp(/^[A-Za-z]\w{3,15}$/g).test(userName);
    let regEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g).test(email);
    let regPassword = new RegExp(/^[A-Za-z0-9]\w{6,}$/g).test(password);

    if (!regUserName) {
      setErrorUsername({ userName: "First name must contains at least 3 characters" });
    }
    if (!regEmail) {
      setErrorEmail({ email: "Wrong Email" });
    }
    if (!regPassword) {
      setErrorPassword({ password: "Password must contains at least 6 characters " });
    }
    if ( regUserName &&  regEmail && regPassword){
      var formd = {
        "emailAddress": email,
        "name": userName,
        "password": password
      }

      await axios.post(APIRoutes.SignUp,formd).then(function(resp){
        if(resp.status === 200){
           history("/")
        }
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={getTokenAsync} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  error={Boolean(errorUsername?.userName)}
                  helperText={errorUsername?.userName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="off"
                  fullWidth
                  name="email"
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errorEmail?.email)}
                  helperText={errorEmail?.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errorPassword?.password  )}
                  helperText={errorPassword?.password}
                />
              </Grid>
              
            </Grid>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="right">
              <Grid item>
                <Link to="/">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}