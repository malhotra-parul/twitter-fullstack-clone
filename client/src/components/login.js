import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import image from "../assets/loginImage.png";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loginUser } from "../redux/user/userActions";
import { Redirect, useHistory } from "react-router-dom";

const Login = ({
  loading,
  loginUser,
  isAuthenticated,
  errorRedux,
}) => {
  const classes = useStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const userData = { email, password };
  const history = useHistory();

  useEffect(() => {
    setErrors(errorRedux);
  }, [errorRedux]);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(userData, history);
  };
  if(loading){
    return <div className={classes.progress}><CircularProgress  size="2rem" /></div>
  }
  if (isAuthenticated) {
    return <Redirect to="/feed" />;
  } else {
    return (
      <Paper className={classes.paper}>
        <Grid
          container
          justify="center"
          spacing={2}
          direction="column"
          className={classes.grid}
        >
          <Grid item xs={12} sm={12}>
            <Typography
              component="h1"
              variant="h5"
              color="textPrimary"
              className={classes.typo}
            >
              Already have an account?
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <img src={image} alt="twitter-people" className={classes.image} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">
              See what’s happening in the world right now!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <form noValidate className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                autoFocus
                id="emailLogin"
                label="Email Address"
                color="primary"
                name="email"
                autoComplete="email"
                value={email}
                helperText={errors.email}
                error={errors.email ? true : false}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant="standard"
                margin="normal"
                color="primary"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="passwordLogin"
                helperText={errors.password}
                error={errors.password ? true : false}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.general && (
                <Typography variant="body2">
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
                disabled={loading}
              >
                {loading ? <CircularProgress size="2rem" /> : "Login"}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    );
  }
};

const useStyle = makeStyles((theme) => ({
  image: {
    height: `250px`,
    width: "250px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  progress: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paper: {
    margin: "0 auto",
    marginTop: "20px",
    textAlign: "center",
    padding: theme.spacing(2),
    height: "auto",
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
    width: "500px",
    [theme.breakpoints.down('sm')]: {
      width: '95vw',
    },
    backgroundColor: '#15202b'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typo: {
    fontWeight: "bold",
    paddingBottom: theme.spacing(1),
  },
  input: {
    color: "white",
  }
}));

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.authenticated,
  loading: state.ui.loading,
  errorRedux: state.ui.errors,
});

const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
