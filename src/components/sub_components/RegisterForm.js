import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { signUp } from "../../authFunctions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const classes = {
  root: {
    flexGrow: 1,
  },
  item: {
    marginTop: "1rem",
  },
  submit: {
    marginTop: "1rem",

    display: "flex",
    justifyContent: "center",
  },
  text: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
  },
  input: {
    width: "100%",
  },
  container: {
    marginTop: "10rem",
  },
};

class RegisterForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      role: "Student",
      password: "",
      track: "Beginner",
      loading: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { name, email, role, password, track } = this.state;
    this.setState({ loading: true });
    signUp({ name, email, role, password, track })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { errors } = this.props;
    return (
      <div>
        <form>
          <Grid style={classes.container} container justify="center">
            <Grid container item xs={10} sm={8} md={3} justify="center">
              <Grid style={classes.item} item xs={12}>
                <TextField
                  style={classes.input}
                  label="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                {errors.name ? (
                  <div className="auth_error">{errors.name}</div>
                ) : null}
              </Grid>
              <Grid style={classes.item} item xs={12}>
                <TextField
                  style={classes.input}
                  label="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {errors.email ? (
                  <div className="auth_error">{errors.email}</div>
                ) : null}
              </Grid>
              <Grid style={classes.item} item xs={12}>
                <TextField
                  select
                  style={classes.input}
                  label="Role"
                  name="role"
                  value={this.state.role}
                  onChange={this.handleChange}
                >
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Instructor"}>Instructor</MenuItem>
                </TextField>
              </Grid>
              {this.state.role !== "Instructor" ? (
                <Grid style={classes.item} item xs={12}>
                  <TextField
                    select
                    style={classes.input}
                    label="Track"
                    name="track"
                    value={this.state.track}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={"Beginner"}>Beginner</MenuItem>
                    <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                    <MenuItem value={"Advanced"}>Advanced</MenuItem>
                  </TextField>
                </Grid>
              ) : null}
              <Grid style={classes.item} item xs={12}>
                <TextField
                  style={classes.input}
                  label="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password ? (
                  <div className="auth_error">{errors.password}</div>
                ) : null}
              </Grid>
              <Grid justify="center" style={classes.submit} item xs={12}>
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  {this.state.loading ? "⚪⚪⚪" : "Sign Up"}
                </Button>
              </Grid>
              <Grid item style={classes.text} xs={12}>
                <p className="link_text">
                  Already have an account?
                  <Link to="/login">
                    {" "}
                    <span>Sign In</span>
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.validation.signUpErrors,
});

export default connect(mapStateToProps)(RegisterForm);
