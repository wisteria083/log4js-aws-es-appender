## Example

```
// logger
// ---------------------------------------------
const log4js = require('log4js');
const log4js_extend = require('log4js-extend');

log4js.configure({
  appenders: {
    log4jsAwsEsAppender: {
      type: 'log4js-aws-es-appender',
      layout: { type: "basic" },
      function_name: "function_name",
      index: 'logstash',
      aws_es: CONFIG_AWS_ES
    },
    log4jsConsoleAppender: {
      type: 'log4js-console-appender',
      function_name: "function_name",
      layout: { type: "basic" },
    },
  },
  categories: {
    default: {
      appenders: ["log4jsConsoleAppender"],
      level: "DEBUG",
    },
    logger: {
      appenders: ["log4jsAwsEsAppender", "log4jsConsoleAppender"],
      level: "INFO",
    },
  }
});

log4js_extend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)"
});

const logger = log4js.getLogger("logger");
```
