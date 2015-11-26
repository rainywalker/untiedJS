(function(){ //ut prototype
	var es5 = Object.defineProperty ? 1 : 0, r = {}, fn = Object.prototype,
		imuutable = es5 ? function (){
			var a = arguments, i = 0, j = a.length;
			while(i < j) Object.defineProperty(this, a[i++], (r.value = a[i++], r));
		} : function(k, v){
			var a = arguments, i = 0, j = a.length;
			while(i < j) this[a[i++]] = a[i++];
		};
	if(es5) Object.defineProperty(fn, 'immutable', (r.value = imuutable, r));
	else fn.immutable = immutable;
	fn = Array.prototype;
	Object.prototype.immutable('slice', fn.slice, 'indexOf', fn.indexOf, 'join', fn.join);
	String.prototype.immutable(
		'isNumber', function(){return parseFloat(this) + '' == this;},
		'ex', (function(){
			var r = /\[([^\]]+)\]/gi,
				re = function(_0, _1){return (new Function('ut', 'return (' + _1 + ');')).call(self, ut);},
				self;
			return function(target){
				return this.indexOf('[') == NONE ? v : (self = target || null, this.replace(r, re));
			};
		})()
	);
})();
if(!String.prototype.trim) (function(){
	var trim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	String.prototype.immutable('trim', function(){return this.replace(trim, '');});
})();
(function(){
	var offset = +new Date, v, fn = Date.prototype;
	if(!fn.toISOString) fn.immutable(
		'toISOString', v = function(){
			var v;
			return this.getUTCFullYear() +
				'-' + (v = '0' + (this.getUTCMonth() + 1)).substr(v.length - 2) +
				'-' + (v = '0' + this.getUTCDate()).substr(v.length - 2) +
				'T' + (v = '0' + this.getUTCHours()).substr(v.length - 2) +
				':' + (v = '0' + this.getUTCMinutes()).substr(v.length - 2) +
				':' + (v = '0' + this.getUTCSeconds()).substr(v.length - 2) +
				'.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
				'Z';
		},
		'toJSON', v
	);
	if(!W['r' + v]){
		v = 'equestAnimationFrame',
		W['r' + v] = W['webkitR' + v] || W['mozR' + v] || W['msR' + v] || (Date.now ? function(v){
			return setTimeout(v.__raf__ || (v.__raf__ = function(){v(Date.now() - offset);}), 16.7);
		} : function(v){
			return setTimeout(v.__raf__ || (v.__raf__ = function(){v(+new Date - offset);}), 16.7);
		}),
		v = 'ancelAnimationFrame',
		W['c' + v] = W['webkitC' + v] || W['mozC' + v] || W['msC' + v] || clearTimeout;
	}
	if(!W['performance']) W.performance = {};
	if(!performance.now) performance.immutable('now',Date.now ? function(){return Date.now() - offset;} :
		function(){return +new Date - offset;}
	);
	if(!Date.now) Date.immutable('now', function(){return +new Date;});
})();
json = {
	parse:function(v){return (new Function('', 'return ' + v.trim()))();},
	stringify:(function(){
		var stack = [], r0 = /["]/g, Deter = function(v){this.v = v;}, Key = function(){},
			sep = new Deter(','), a0 = new Deter('['), a1 = new Deter(']'), o0 = new Deter('{'), o1 = new Deter('}'),
			pool = {length:0};
		return function(v){
			var r = '', i, k;
			stack.length = 0;
			do{
				if(v instanceof Deter) r += v.v;
				else if(v instanceof Key) r += '"' + v.v + '":', pool[pool.length++] = v;
				else switch(typeof v){
				case'string':r += '"' + (v.indexOf('"') == NONE ? v : v.replace(r0, '\\"')) + '"'; break;
				case'undefined':case'number':case'boolean':r += v + ''; break;
				case'function':r += '"function"'; break;
				case'object':
					if(!v) r += 'null';
					else if(v.toJSON) r += v.toJSON();
					else if(v instanceof Array){
						i = v.length, stack[stack.length] = a1;
						while(i--) stack.push(v[i], sep);
						stack[stack.length - 1] = a0;
					}else{
						stack[stack.length] = o1;
						for(i in v) if(v.hasOwnProperty(i)) k = pool.length ? pool[--pool.length] : new Key, k.v = i, stack.push(v[i], k, sep);
						stack[stack.length - 1] = o0;
					}
				}
			}while(v = stack.pop());
			return r;
		};
	})()
},
if(!W['JSON']) W['JSON'] = json;
if(doc){
	log = (function(){
		var div, r = /[<]/g, d = new Date, init = function(){
			if(doc.getElementById('bsConsole')) return;
			div = doc.createElement('div');
			div.innerHTML = '<style>'+
			'#bsConsole{font-family:arial;position:fixed;z-index:999999;background:#fff;bottom:0;left:0;right:0;height:200px}'+
			'#bsConsoleTab{background:#999;height:20px;color:#fff}'+
			'#bsConsoleTabConsole,#bsConsoleTabElement{font-size:11px;margin:0 10px;line-height:20px;float:left}'+
			'#bsConsoleView{font-size:10px;overflow-y:scroll;height:180px}'+
			'#bsConsoleViewElement{word-break:break-all;word-wrap:break-word}'+
			'.bsConsoleItem{font-size:11px;border:1px solid #000;padding:5px;margin:0 5px;float:left}'+
			'.bsConsoleTime{font-size:10px;padding:5px}'+
			'</style>'+
			'<div id="bsConsole">'+
				'<div id="bsConsoleTab">'+
					'<div id="bsConsoleTabConsole">Console</div><div id="bsConsoleTabElement">Element</div>'+
				'</div>'+
				'<div id="bsConsoleView">'+
					'<div id="bsConsoleViewConsole"></div><div id="bsConsoleViewElement" style="display:none"></div>'+
				'</div>'+
			'</div>';
			doc.body.appendChild(div.childNodes[0]),
			doc.body.appendChild(div.childNodes[0]),
			doc.getElementById('bsConsole').onclick = function(e){
				e = e.target;
				switch(e.id){
				case'bsConsoleTab':e.style.height = e.style.height == '200px' ? '20px' : '200px'; break;
				case'bsConsoleTabElement':
					doc.getElementById('bsConsoleViewConsole').style.display = 'none';
					doc.getElementById('bsConsoleViewElement').style.display = 'block';
					doc.getElementById('bsConsoleViewElement').innerHTML = '<pre>' + 
						('<html>\n' + doc.getElementsByTagName('html')[0].innerHTML + '\n</html>').replace(r, '&lt;') + 
						'</pre>';
					break;
				case'bsConsoleTabConsole':
					doc.getElementById('bsConsoleViewConsole').style.display = 'block';
					doc.getElementById('bsConsoleViewElement').style.display = 'none';
				}
			};
		};
		return function(){
			var a = arguments, i = 0, j = a.length, v, item = '<div style="clear:both"><div class="bsConsoleTime">' + (d.setTime(Date.now()), d.toJSON()) + '</div>';
			init();
			while(i < j){
				if((v = a[i++]) && typeof v == 'object') v = JSON.stringify(v); 
				item += '<div class="bsConsoleItem">' + v + '</div>';
			}
			div.innerHTML = item + '</div>';
			doc.getElementById('bsConsoleViewConsole').appendChild(div.childNodes[0]);
		};
	})();
	if(!W['console']) W.console = {log:log};
	(function(){
		var t = 'abbr,article,aside,audio,bdi,canvas,data,datalist,details,figcaption,figure,footer,header,hgroup,mark,meter,nav,output,progress,section,summary,time,video'.split(','),
			f = doc.createDocumentFragment(), i = t.length, j = 'createElement' in f;
		while(i--){
			doc.createElement(t[i]);
			if(j) f.createElement(t[i]);
		}
	})();
}
