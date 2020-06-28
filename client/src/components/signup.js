import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import image from "../assets/signup.svg";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles((theme) => ({
  image: {
    height: `150px`,
    width: "150px",
  },
  typo: {
    fontWeight: "bold",
    paddingBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyle();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        color="textPrimary"
        className={classes.typo}
      >
        Don't have an account?
      </Typography>
      <Grid container justify="center" >
        <Grid item xs={12}>
          <img src={image} alt="twitter-people" className={classes.image} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Signup to explore!</Typography>
        </Grid>
        <Grid item xs={12}>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="emailSignup"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="handle"
                  label="Handle"
                  name="handle"
                  autoComplete="handle"
                  value={handle}
                  onChange={(event) => setHandle(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="passwordSignup"
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  size="large"
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
