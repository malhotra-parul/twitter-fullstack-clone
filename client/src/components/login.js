import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import image from "../assets/loginImage.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
}));

const Login = () => {
  const classes = useStyle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        color="primary.customText"
        className={classes.typo}
      >
        Already have an account?
      </Typography>
      <Grid container justify="center" xs={12}>
        <Grid item xs={12}>
          <img src={image} alt="twitter-people" className={classes.image} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            See what’s happening in the world right now!
          </Typography>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            color="primary"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
          >
            Login
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default Login;
