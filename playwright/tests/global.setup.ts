import { server } from './page-objects/LogView';

const setup = async () => {
  if (!process.env.BASE_URL) {
    return;
  }
  await fetch(`${server}api/web-ide/workspaces`, {
    method: 'GET',
    headers: {
      'X-Requested-By': 'log-view-tests',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from('Developer:Developer').toString('base64')
    }
  });
};

export default setup;
