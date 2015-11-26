//빌드시 미니파이하지 않는다.
var ut = (function(W){
"use strict"
var NONE = -1,
	STR = 'string', OBJ = 'object', FUN = 'function', 

	doc = document,
	docel = document.documentElement,
	body = doc.createElement('body'),
	head = doc.getElementsByTagName('head')[0],
	
	err, ex, debug, json, log, detect,
	
	
	DATA = {app:{}, sys:{}},
	ut;	
