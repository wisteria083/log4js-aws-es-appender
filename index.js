"use strict";

let Elasticsearch = require('elasticsearch');
let elasticsearch = null;
let function_name = null;
let index = null;

function esAppender(layout, timezoneOffset) {
  
  // let now = new Date();
//   let yyyymmdd = now.getFullYear()+ 
// 	( "0"+( now.getMonth()+1 ) ).slice(-2)+
// 	( "0"+now.getDate() ).slice(-2);
  
  return (loggingEvent) => {
    
    elasticsearch.index({
      index: index,
      type: 'log',
      body: {
        level: loggingEvent.level,
        timestamp : loggingEvent.startTime,
        function_name : function_name,
        data : layout(loggingEvent, timezoneOffset),
      }
    }, function(err, data) {
      if(err){
        throw err;
      }
    });
  };
}

function configure(config, layouts) {

  let layout = layouts.colouredLayout;

  elasticsearch = new Elasticsearch(config.es);
  function_name = config.function_name;
  index = config.index;
  
  if(!function_name){
    throw new Error("function_name is invalid");
  }
  
  if(!index){
    throw new Error("index is invalid");
  }

  if (config.layout) {
    layout = layouts.layout(config.layout.type, config.layout);
  }

  return esAppender(layout, config.timezoneOffset);

}

exports.configure = configure;