import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MemoryIcon from '@material-ui/icons/Memory';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import GroupIcon from '@material-ui/icons/Group';
import PublicIcon from '@material-ui/icons/Public';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="All" data-filter=".Current" icon={<GroupIcon />} {...a11yProps(0)} />
          <Tab label="Core" data-filter=".Core" icon={<PersonPinIcon />} {...a11yProps(1)} />
          <Tab label="Systems" data-filter=".Systems" icon={<MemoryIcon />} {...a11yProps(2)} />
          <Tab label="GDSC" data-filter=".GDSC" icon={<DeveloperModeIcon />} {...a11yProps(3)} />
          <Tab label="Intelligence" data-filter=".Intelligence" icon={<FingerprintIcon />} {...a11yProps(4)} />
          <Tab label="Algorithms" data-filter=".Algorithms" icon={<AccountTreeIcon />} {...a11yProps(5)} />
          <Tab label="Alumni" data-filter=".Alumni" icon={<PublicIcon />} {...a11yProps(6)} />
        </Tabs>
      </AppBar>
    </div>
  );
}
