/**
 * Bitbucket backup script
 * Helps you backup all your Bitbucket repositories to a local folder
 *
 * Usage: node app --user=bbUser --pass=bbPass --owner=companyOrUserName --folder=./backup --auth=ssh
 *
 * --folder is optional. It defaults to ./bitbucket-repo-backups
 * --auth is optional. It defaults to using https authentication
 */

let path = require('path');
let argv = require('named-argv');
let repos = require('./repos');

// Check the incoming params
if (!argv.opts || !argv.opts.owner || !argv.opts.user || !argv.opts.pass) {
    console.log('You must pass --owner, --user and --pass options. Exiting.');
    process.exit(1);
}

/* PARAMETERS */
let params = {
    url: 'https://api.bitbucket.org/2.0/repositories/' + argv.opts.owner,
    protocol: argv.opts.auth == 'ssh' ? 1 : 0,
    folder: path.normalize(argv.opts.folder || './bitbucket-repo-backups' + '/'),
    user: argv.opts.user,
    pass: argv.opts.pass
};

/* CLONE REPOS */
repos.clone(params)
    .catch(console.log);