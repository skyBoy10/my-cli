const co = require('co');
const chalk = require('chalk');
const prompt = require('co-prompt');
const ora = require('ora');
const template = require('../template');

const defaultBranch = 'master';

module.exports = () => {
    co(function *() {
        const tplName = yield prompt('模版名字：');
        const proName = yield prompt('项目名称：');

        if (!template.tpl[tplName]) {
            console.log(chalk.red('模版不存在！'));
            process.exit();
        }

        const gitUrl = template.tpl[tplName]['url'];
        const gitBranch = template.tpl[tplName]['branch'] || defaultBranch;
        const proCmd = `git clone ${gitUrl} ${proName} && cd ${proName} && git checkout ${gitBranch}`;
        ora('开始初始化').start();

        exec(proCmd, (err, stout, sterr) => {
            if (err) {
                console.log(chalk.red(err));
                process.exit();
            }

            console.log(chalk.green('\n 初始化成功！'));
            process.exit();
        });
    });
}