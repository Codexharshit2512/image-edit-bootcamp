import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { signIn } from "../../authFunctions";

const classes = {
  root: {
    flexGrow: 1,
  },
  item: {
    marginTop: "1rem",
  },
  input: {
    width: "100%",
  },
  submit: {
    marginTop: "2rem",

    display: "flex",
    justifyContent: "center",
  },
  text: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    marginTop: "10rem",
  },
};

class LoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    signIn({ email, password })
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
              <Grid item style={classes.submit} xs={12}>
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  {this.state.loading ? "⚪⚪⚪" : "Sign In"}
                </Button>
              </Grid>
              <Grid item style={classes.text} xs={12}>
                <p className="link_text">
                  Don't have an account?
                  <Link to="/register">
                    {" "}
                    <span>Sign Up</span>
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
  errors: state.validation.signInErrors,
});

export default connect(mapStateToProps)(LoginForm);
