import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { CircularProgress } from 'material-ui/Progress';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import simpleGit from 'simple-git/promise';
import styled from 'styled-components';
import { openProjectWindow } from '../../utils/fileUtils';

const DRAWER_WIDTH = 270;
class ClippedDrawer extends React.Component {
  state = {
    loading: false,
  };

  fetchRepo = async () => {
    const { project } = this.props;
    this.setState({ loading: true });
    const repo = await simpleGit(project.path);
    const remote = await repo.listRemote();
    await repo.fetch(remote);
    // TODO: Set that in to the git state
    this.setState({ loading: false });
  };

  render() {
    const { className, classes, global, actions, project } = this.props;
    const { setProjectPath, setConfigInfo, getRepoInfo } = actions;
    const { drawer } = global;
    // console.log({ classes })
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
                {/*<ListItem button>*/}
                  {/*<ListItemIcon>*/}
                    {/*<FontAwesomeIcon size="lg" icon={['fal', 'code-branch']} />*/}
                  {/*</ListItemIcon>*/}
                  {/*<ListItemText primary="Clone Project" />*/}
                {/*</ListItem>*/}
                {/*{project.path && (*/}
                  {/*<ListItem button onClick={this.fetchRepo}>*/}
                    {/*<ListItemIcon>*/}
                      {/*{this.state.loading ? (*/}
                        {/*<CircularProgress size={25} />*/}
                      {/*) : (*/}
                        {/*<FontAwesomeIcon*/}
                          {/*size="lg"*/}
                          {/*icon={['fal', 'code-branch']}*/}
                        {/*/>*/}
                      {/*)}*/}
                    {/*</ListItemIcon>*/}
                    {/*<ListItemText primary="Fetch Current Project" />*/}
                  {/*</ListItem>*/}
                {/*)}*/}
                {/*<ListItem button>*/}
                  {/*<ListItemIcon>*/}
                    {/*<FontAwesomeIcon size="lg" icon={['fal', 'cog']} />*/}
                  {/*</ListItemIcon>*/}
                  {/*<ListItemText primary="Settings" />*/}
                {/*</ListItem>*/}
              </div>
            </List>
          </Drawer>
        </div>
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
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

// const Styled = styled(ClippedDrawer)(theme => ({
//   backgroundColor: theme.palette.background.paper,
// }));

const Styled = styled(ClippedDrawer)`
  flex-grow: 1;
  z-index: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  
  .paper {
    position:relative;
    width: 100%;
  }

  .drawerWrapper {
    width: 270px;
    transition: margin-left 0.3s ease-in-out;
  }

  .drawerPaper {
    position: relative;
    width: 100%;
  }
  .content {
    flex-grow: 1;
    min-width: 0;// So the Typography noWrap works
    //background-color: theme.palette.background.default,
    //padding: theme.spacing.unit * 3,
  },
`;

// export default Styled;
// export default withStyles(styles)(Styled);
export default withStyles(styles)(ClippedDrawer);
