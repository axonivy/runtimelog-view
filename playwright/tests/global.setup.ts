import { server, user } from './page-objects/log-view';

const setup = async () => {
  if (!process.env.BASE_URL) {
    return;
  }
  await fetch(`${server}api/web-ide/workspaces`, {
    method: 'GET',
    headers: {
      'X-Requested-By': 'dataclass-view-tests',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(user + ':' + user).toString('base64')
    }
  });
};

export default setup;
