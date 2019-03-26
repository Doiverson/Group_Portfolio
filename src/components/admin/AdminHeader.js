import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route,} from "react-router-dom";

const styles = {
  root: {
    width: 500,
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className='AdminHeader'>
        <h2>ADMIN PAGE</h2>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction component={Link} to="/" label="Home" value="home" icon={<Icon>folder</Icon>} className={classes.content}/>
          <BottomNavigationAction component={Link} to="/Mv" label="Company's info" value="Mv" icon={<Icon>folder</Icon>} className={classes.content}/>
          <BottomNavigationAction component={Link} to="/AdminBalanceList" label="Balance" value="Balance" icon={<Icon>folder</Icon>} className={classes.content}/>
          <BottomNavigationAction component={Link} to="/Settings" label="Settings" value="Settings" icon={<Icon>folder</Icon>} className={classes.content}/>
        </BottomNavigation>
      </div>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);


