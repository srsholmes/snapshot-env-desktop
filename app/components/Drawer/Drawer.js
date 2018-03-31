import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import SettingsIcon from 'material-ui-icons/Settings';
import { openProjectWindow } from '../../utils/fileUtils';

const DRAWER_WIDTH = 270;
function ClippedDrawer(props) {
  const { classes, global, actions } = props;
  const { setProjectPath, setConfigInfo, getRepoInfo } = actions;
  const { drawer } = global;
  return (
    <div className={classes.root}>
      <div
        className={classes.drawerWrapper}
        style={{ marginLeft: drawer.open ? 0 : -DRAWER_WIDTH }}
      >
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <div>
              <ListItem
                button
                onClick={() =>
                  openProjectWindow([
                    setProjectPath,
                    setConfigInfo,
                    getRepoInfo,
                  ])
                }
              >
                <ListItemIcon>
                  <FontAwesomeIcon size="lg" icon={['fal', 'folder-open']} />
                </ListItemIcon>
                <ListItemText primary="Open Project" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FontAwesomeIcon size="lg" icon={['fal', 'code-branch']} />
                </ListItemIcon>
                <ListItemText primary="Clone Project" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FontAwesomeIcon size="lg" icon={['fal', 'code-branch']} />
                </ListItemIcon>
                <ListItemText primary="Fetch Project" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FontAwesomeIcon size="lg" icon={['fal', 'cog']} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </div>
          </List>
        </Drawer>
      </div>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  drawerWrapper: {
    width: DRAWER_WIDTH,
    transition: 'margin-left 0.3s ease-in-out',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles)(ClippedDrawer);
