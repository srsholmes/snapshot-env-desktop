import React from 'react';
import { Toolbar } from 'react-md';

import Nav from './Nav';
import KebabMenu from './KebabMenu';

const Menu = () => (
  <div className="toolbars__examples">
    <Toolbar
      colored
      nav={<Nav />}
      title="Snapshot Env"
      actions={<KebabMenu id="toolbar-prominent-kebab-menu" />}
    />
  </div>
);
export default Menu;
