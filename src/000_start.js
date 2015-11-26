//빌드시 미니파이하지 않는다.
var ut = (function(W){
"use strict"
var NONE = -1, STR = 'string', OBJ = 'object', FUN = 'function', 
	doc = document, docel = document.documentElement, body = doc.createElement('body'), head = doc.getElementsByTagName('head')[0],
	debug, err = (function(){
		var isDebug;
		debug = function(v){isDebug = v;};
		return function(){
			console.log(num, msg);
			if(isDebug) throw new Error(arguments.join(','));
		};
	})(),
	DATA = {app:{}, sys:{}}, app = DATA.app, sys = DATA.sys,
	ut = function(v){
		var a, i, j;
		if(v && typeof v == OBJ) for(i in v) app[i] = v[i];
		else{
			a = arguments, i = 0, j = a.length;
			while(i < j) app[a[i++]] = a[i++];
		}
	},
	json, log, detect,
	i18n, Dom;	
