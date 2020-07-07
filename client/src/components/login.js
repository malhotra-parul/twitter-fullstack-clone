import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import image from "../assets/loginImage.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loginUser } from "../redux/user/userActions";
import { Redirect } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  image: {
    height: `250px`,
    width: "250px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
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
  },
  customError: {
    color: "red",
    fontSize: "1em",
  },
}));

const Login = ({ history, loading, loginUser, isAuthenticated }) => {
  const classes = useStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const userData = { email, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(userData, history);
  };

  if(isAuthenticated){
    return <Redirect to="/feed" />
  }
  else {
  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        color="textPrimary"
        className={classes.typo}
      >
        Already have an account?
      </Typography>
      <Grid container justify="center">
        <Grid item xs={12}>
          <img src={image} alt="twitter-people" className={classes.image} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            See what’s happening in the world right now!
          </Typography>
        </Grid>
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
            <Typography variant="body2" className={classes.customError}>
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
    </div>
  )};
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.authenticated,
  loading: state.ui.loading,
});

const mapActionsToProps = (dispatch) => {
  return {
    loginUser: (userData, history) => dispatch(loginUser(userData, history)),
  };
};

//alternative approach

// const mapActionsToProps = {
//   loginUser: loginUser
// };

export default connect(mapStateToProps, mapActionsToProps)(Login);
