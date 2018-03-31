// @flow
import React, { Component } from 'react';
import styles from './Footer.css';

export default class Footer extends Component<Props> {
  handleChange = type => e => {
    console.log({ type, e });
  };
  render() {
    const { runSnapshot } = this.props.actions;
    const { project: { path, config } } = this.props;

    if (!path) return null;
    const { build, output } = config;
    return (
      <div className={styles.footer}>
        <div className={styles.controls}>
          {/*<TextInput*/}
            {/*value={build}*/}
            {/*placeholder="Build:"*/}
            {/*defaultValue=""*/}
            {/*onChange={this.handleChange('build')}*/}
          {/*/>*/}
          {/*<TextInput*/}
            {/*value={output}*/}
            {/*placeholder="Output:"*/}
            {/*defaultValue=""*/}
            {/*onChange={this.handleChange('output')}*/}
          {/*/>*/}
        </div>
        <div className={styles.buttonsWrapper}>
          <Button color="blue" onClick={() => runSnapshot()}>
            Run snapshot
          </Button>
        </div>
      </div>
    );
  }
}
