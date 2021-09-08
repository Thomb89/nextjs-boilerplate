const shelljs = require('shelljs');

const waitForPostgres = async () => {
  const checkPostgres = () => shelljs.exec('docker container exec postgres /usr/local/bin/probe.sh');

  let result = undefined;
  do {
    result = checkPostgres();
  } while (result?.code !== 0);

  console.log('Postgres Database is ready to accept Connections!')
};

waitForPostgres();
