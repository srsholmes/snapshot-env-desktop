import { remote } from 'electron';

const { dialog } = remote;
const openProjectWindow = fns => {
  dialog.showOpenDialog(
    { BrowserWindow: true, properties: ['openFile', 'openDirectory'] },
    ([path]) => {
      [...fns].forEach(x => x(path));
    }
  );
};

export { openProjectWindow };
