#! /usr/bin/env node

const program = require('commander');

program
.version('0.0.1')
.usage('<command>')

/**
 * 增加模版指令
 */
program
.command('add')
.description('添加新模版')
.alias('ad')
.action(() => {
    require('./commanders/add')();
});

/**
 * 模版列表指令
 */
program
.command('list')
.description('查看所有模版')
.alias('li')
.action(() => {
    require('./commanders/list')();
});

/**
 * 删除模版指令
 */
program
.command('delete')
.description('删除指定模版')
.alias('de')
.action(() => {
    require('./commanders/delete')();
});

/**
 * 初始化指令
 */
program
.command('init')
.description('初始化项目')
.alias('in')
.action(() => {
    require('./commanders/init')();
});

program.parse(process.argv);
if (!program.args.length) {
    program.help();
}