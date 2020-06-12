import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  color: {
      backgroundColor: theme.palette.type === 'dark' ? '#323232': '#e0e0e0',
      color: theme.palette.text.primary
  },
  title: {
    flexGrow: 1,
  },
});

class MessageHeader extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.color}>
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            Chat Header
                        </Typography>

                        <IconButton >
                            <AttachFileOutlinedIcon />
                        </IconButton>

                        <IconButton >
                            <InfoTwoToneIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(useStyles)(MessageHeader);