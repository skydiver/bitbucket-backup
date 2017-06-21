let rp = require('request-promise');
let exec = require('child_process').exec;
let fs = require('fs');

exports.clone = async (params) => {

    let {url, protocol, folder, user, pass} = params;

    let response = await rp({method: 'GET', url, auth: {user, pass}});

    let repos = JSON.parse(response).values;

    for (let repo of repos) {

        let repoName = repo.name.replace(/\s+/g, '-').toLowerCase();

        let command = (repo.scm === 'git') ? 'git' : 'hg';

        try {
            if (fs.statSync(folder + repoName)) {
                console.log('Fetching and pulling:', repo.name);
                exec('cd ' + folder + repoName + ' && ' + command + ' fetch --all && ' + command + ' pull --all && cd ../..', () => {
                    console.log('Finished:', repo.name)
                });
            }
        } catch (e) {
            console.log('Cloning:', repo.name);
            exec(command + ' clone ' + repo.links.clone[protocol].href + ' ' + folder + repoName, () => {
                console.log('Finished:', repo.name)
            });
        }

    }

    return "";

};