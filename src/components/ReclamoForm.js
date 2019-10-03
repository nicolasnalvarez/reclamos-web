import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class ReclamoForm extends React.Component {

  state = {
    selected: null,
    hasError: false
  };

  handleChange(value) {
    this.setState({ selected: value });
  }

  handleClick() {
    this.setState({ hasError: false });
    if (!this.state.selected) {
      this.setState({ hasError: true });
    }
  }

  render() {
    const { classes } = this.props;
    const { selected, hasError } = this.state;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl} error={hasError}>
          <InputLabel htmlFor="userType">Tipo de usuario</InputLabel>
          <Select
            name="userType"
            value={selected}
            onChange={event => this.handleChange(event.target.value)}
            input={<Input id="userType" />}
          >
            <MenuItem value="duenio">Duenio</MenuItem>
            <MenuItem value="inquilino">Inquilino</MenuItem>
          </Select>
          {hasError && <FormHelperText>Campo requerido!</FormHelperText>}
        </FormControl>
        <h3>Ingrese su DNI</h3>
        <TextField
            id="outlined-dense"
            label="Titulo"
            margin="dense"
            variant="outlined"
        />
        <button type="button" onClick={() => this.handleClick()}>
          Submit
        </button>
      </form>
    );
  }
}

ReclamoForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReclamoForm);