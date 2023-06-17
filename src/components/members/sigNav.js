import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MemoryIcon from '@material-ui/icons/Memory';
import PublicIcon from '@material-ui/icons/Public';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
      <Tab label="Systems"  data-filter=".Systems" icon={<MemoryIcon />}  />
      <Tab label="GDSC"  data-filter=".GDSC" icon={<PublicIcon />}/>
      <Tab label="Intelligence"  data-filter=".Intelligence" icon={<FingerprintIcon />}/>
      <Tab label="Algorithms"  data-filter=".Algorithms" icon={<AccountTreeIcon />}/>
      </Tabs>
    </Paper>
  );
}

