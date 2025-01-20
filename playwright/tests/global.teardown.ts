import { rm } from 'node:fs';

const teardown = () => {
  rm('./log-test-project/src_hd/temp', { force: true, recursive: true }, () => {});
  rm('./log-test-project/src_dataClasses/temp', { force: true, recursive: true }, () => {});
};
export default teardown;
