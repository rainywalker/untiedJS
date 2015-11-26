ut.immutable('I18N', (function(){
var I18N = 'data-i18n', DATA = {}, PREFIX, scaned = {}, id = 0,
	stack = [], parser, item;
sys.I18N = DATA;
return i18n = {
	scan:function(d, key){
		var r = {length:0}, group, i, j, k;
		d = Dom(d), stack.length = 0;
		do{
			i = d.length;
			while(i--){
				if(k = parser(d[i])) r[r.length++] = k;
				if((k = d[i].childNodes) && k.length) stack[stack.length] = k;
			}
		}while(d = stacks.pop())
		scaned[key || (++id)] = r;
		return key || id;
	}, 
	parser:parser = function(el){
		var r = {el:el}, i, j, k;
		if(k = el.getAttribute(I18N)){
			el.removeAttribute(I18N), k = k.trim();
			if(k.indexOf(':') > -1) k = k.split(':'), r.value = k[1].split(','), k = k[0];
			else r.value = [
				'INPUT,TEXTAREA,SELECT'.indexOf(i = el.tagName) > -1  ? '@value' : 
				i == 'img' ? '@src' : 'html'
			];
			r.key = k = k.split(','), i = k.length;
			if(i != r.value.length) return err('I18N.parser');
			while(i--) k[i] = k[i].split('.');
			return r;
		}
	}, 
	item:item = (function(){
		var el;
		return function(v){
			var key, data, i, k, l;
			if(!el) el = Dom(body);
			el[0] = v.el, i = v.key.length;
			while(i--){
				for(key = v.key[i], data = key[0].charAt(0) == '@' ? DATA : PREFIX, k = 0, l = key.length; k < l; k++) data = data[key[k]];
				el.S(v.value[i], data);
			}
		};
	})(),
	render:function(key){
		var t0 = scaned[key], i = t0.length;
		while(i--) item(t0[i]);
	},
	prefix:function(v){
		var i, j;
		if(v.indexOf('.') == NONE){
			if(!(PREFIX = DATA[v])) return err('I18N.prefix:0');
		}else for(PREFIX = DATA, v = v.split('.'), i = 0, j = v.length; i < j; i++){
			if(!(PREFIX = PREFIX[v[i]])) return err('I18N.prefix:1');
		}
	},
	data:function(a){
		var target, key, k, v, i, j, m, n;
		m = 0, n = arguments.length;
		if(n == 1 && a && typeof a == 'object'){
			if(a === null) DATA = {};
			else DATA = a;
		}else{
			while(m < n){
				target = DATA, key = 0;
				if(k = arguments[m++]){
					for(k = k.split('.'), i = 0, j = k.length - 1; i < j; i++) target = target[k[i]] || (target[k[i]] = {});
					key = k[j];
				}
				if(m == n) return key ? target[key] : target;
				v = arguments[m++];
				if(v === null) key ? (delete target[key]) : (DATA = {});
				key ? (target[key] = v) : (DATA = v);
			}
			return v;
		}
	}
};
})());
