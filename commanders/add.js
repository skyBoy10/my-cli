const co = require('co');
const chalk = require('chalk');
const prompt = require('co-prompt');
const ora = require('ora');
const fs = require('fs');
const template = require('../template');

module.exports = () => {
    co(function *() {
        const tplName = yield prompt('模版名字：');
        const tplGitUrl = yield prompt('git路径：');
        const tplBranch = yield prompt('默认分支：');

        if (!template.tpl[tplName]) {
            template.tpl[tplName] = {};
            template.tpl[tplName]['url'] = tplGitUrl;
            template.tpl[tplName]['branch'] = tplBranch;
        } else {
            console.log(chalk.red('添加失败，模版名字已存在！'));
            process.exit();
        }

        ora('开始添加').start();
        fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(template), 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }

            console.log(chalk.green('\n 添加成功!'));
            process.exit();
        });
    });
}