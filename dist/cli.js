#!/usr/bin/env node
'use strict';

var meow = require('meow');
var compare = require('./');
var log = require('./log');

var IMAGE_FILES = '/**/*.+(tiff|jpeg|jpg|gif|png|bmp)';

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
  log.fail('please specify actual, expected and diff images directory.');
  log.fail('e.g.: $ reg-cli /path/to/actual-dir /path/to/expected-dir /path/to/diff-dir');
  process.exit(1);
}

var cli = meow('\n  Usage\n    $ reg-cli /path/to/actual-dir /path/to/expected-dir /path/to/diff-dir\n  Options\n    -U, --update Update expected images.(Copy `actual images` to `expected images`).\n    -J, --json Specified json report path. If omitted ./reg.json.\n    -I, --ignoreChange If true, error will not be thrown when image change detected.\n    -R, --report Output html report to specified directory.\n    -P, --urlPrefix Add prefix to all image src.\n    -T, --threshold Threshold for detecting change. Value can range from 0.00 (no difference) to 1.00 (every pixel is different)\n  Examples\n    $ reg-cli /path/to/actual-dir /path/to/expected-dir /path/to/diff-dir -U -D ./reg.json\n', {
  alias: {
    U: 'update',
    J: 'json',
    I: 'ignoreChange',
    R: 'report',
    P: 'urlPrefix',
    T: 'threshold'
  }
});

var json = cli.flags.json ? cli.flags.json.toString() : './reg.json'; // default output path

var urlPrefix = typeof cli.flags.urlPrefix === 'string' ? cli.flags.urlPrefix : './';

var report = typeof cli.flags.report === 'string' ? cli.flags.report : !!cli.flags.report && './report.html';

var threshold = Number(cli.flags.threshold) || 0;

compare({
  actualDir: process.argv[2],
  expectedDir: process.argv[3],
  diffDir: process.argv[4],
  update: !!cli.flags.update,
  ignoreChange: !!cli.flags.ignoreChange,
  report: report,
  json: json,
  urlPrefix: urlPrefix,
  threshold: threshold
}).then(function () {
  return process.exit(0);
}).catch(function () {
  return process.exit(1);
});