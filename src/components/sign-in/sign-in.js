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
import { Link } from 'react-router-dom';
import axios from 'axios'
import APIRoutes from '../../routes.js';
import { useNavigate  } from 'react-router-dom';
import Helper from '../../Helper.js';
import { useState } from 'react';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
        Cloudiy
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



export default function SignIn() {
  const history = useNavigate ();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  
  async function getTokenAsync(e) { 
    e.preventDefault();
    setErrorEmail({email: ""});
    setErrorPassword({password: ""});
    let regEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g).test(email);
    let regPassword = new RegExp(/^[A-Za-z0-9]\w{6,}$/g).test(password);

    if (!regEmail) {
      setErrorEmail({ email: "Wrong Email" });
    }
    if (!regPassword) {
      setErrorPassword({ password: "Password must contains at least 6 characters " });
    }
    if (regEmail && regPassword){
      var formd = {
        "emailAddress": email,
        "password": password,
      }

      await axios.post(APIRoutes.SignIn,formd).then(function(resp){
        
        Helper.setCookie('access_token', resp.data.access_token);
        var FolderID = resp.data.user.rootFolderId;
        var UserId = resp.data.user.id;

        if(resp.status === 200){
          Helper.setCookie('currentFolderID', FolderID);
          Helper.setCookie('userId', UserId);
          history('/Home');
        }
      }).catch(() => {
        setErrorEmail({email: "Wrong password or email"})
        setErrorPassword({password: "Wrong password or email"})
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={getTokenAsync}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errorEmail?.email)}
              helperText={errorEmail?.email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errorPassword?.password)}
              helperText={errorPassword?.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, boxShadow: 'none'}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
               <Link to="/SignUp">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 7, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}