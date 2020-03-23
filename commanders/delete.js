const co = require('co');
const chalk = require('chalk');
const prompt = require('co-prompt');
const ora = require('ora');
const fs = require('fs');
const template = require('../template');

module.exports = () => {
    co(function *() {
        const tplName = yield prompt('模版名字：');

        if (!template.tpl[tplName]) {
            console.log(chalk.red('删除失败，模版不存在！'));
            process.exit();
        }

        template.tpl[tplName] = null;

        ora('开始删除').start();
        fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(template), 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }

            ora('\n 删除成功！').succeed();
            process.exit();
        });
    });
}