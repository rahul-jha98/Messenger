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
  },
  color: {
      backgroundColor: theme.palette.type === 'dark' ? '#323232': '#e0e0e0',
      color: theme.palette.text.primary,
      paddingLeft: 8
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
                <AppBar position="static" className={classes.color} disableGutters={true}>
                    <Toolbar variant="dense" disableGutters={true}>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            {this.props.chat ? this.props.chat.name : 'Chat Name'}
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