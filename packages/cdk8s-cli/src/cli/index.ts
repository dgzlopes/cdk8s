import * as colors from 'colors';
import * as yargs from 'yargs';
import { latestVersion } from '../upgrades';

async function main() {
  const v = latestVersion();
  if (v) {
    console.error('------------------------------------------------------------------------------------------------');
    console.error(colors.yellow(`A new version ${v.latest} of cdk8s-cli is available (current ${v.current}).`));
    console.error(colors.yellow('Run "npm install -g cdk8s-cli" to install the latest version on your system.'));
    console.error('------------------------------------------------------------------------------------------------');
  }

  const ya = yargs
    .commandDir('cmds')
    .recommendCommands()
    .wrap(yargs.terminalWidth())
    .showHelpOnFail(false)
    .env('CDK8S')
    .epilogue('Options can be specified via environment variables with the "CDK8S_" prefix (e.g. "CDK8S_OUTPUT")')
    .help();

  const args = ya.argv;
  if (args._.length === 0) {
    yargs.showHelp();
  }
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});