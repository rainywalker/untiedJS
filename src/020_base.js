ut = function(v){
	var a, i, j;
	if(v && typeof v == OBJ) for(i in v) data.app[i] = v[i];
	else{
		a = arguments, i = 0, j = a.length;
		while(i < j) data.app[a[i++]] = a[i++];
	}
};

err = (function(){
	var isDebug;
	debug = function(v){isDebug = v;};
	return function(){
		console.log(num, msg);
		if(isDebug) throw new Error(arguments.join(','));
	};
})();

ex = (function(){
	var r = /\[([^\]]+)\]/gi,
		re = function(_0, _1){return (new Function('bs', 'return (' + _1 + ');')).call(self, bs);},
		self;
	return function(s, v){
		if(v.indexOf('[') == NONE) return v;
		self = s;
		return v.replace(r, re);
	};
})();
