math:
(function(){
    var mk = function(m){
			var t = {};
			return m = Math[m], function(r){return t[r] || t[r] === 0 ? 0 : (t[r] = m(r));};
		},
		rc = 0, rand = {};
    ut.immutable(
		'rand', function(a, b){return parseInt((rand[rc = (++rc) % 2000] || (rand[rc] = Math.random())) * (b - a + 1)) + a;},
		'randf', function(a, b){return (rand[rc = (++rc) % 2000] || (rand[rc] = Math.random())) * (b - a) + a;},
		'sin', mk('sin'), 'cos', mk('cos'), 'tan', mk('tan'), 'atan', mk('atan'),
		'toradian', Math.PI / 180, 'toangle', 180 / Math.PI
	);
})();
date:
(function(){
	var zone = (new Date()).getTimezoneOffset() * 1000,
	_get = function(isUTC, date){
		var i, t0, h, m, s;
		if(typeof date == STR){
			i = date.split('-');
			if(i[2] && i[2].indexOf( ' ' ) > -1){
				t0 = i[2].split(' '), i[2] = t0[0], t0 = t0[1].split(':'),
				h = parseInt(t0[0], 10), m = parseInt(t0[1], 10), s = parseInt(t0[2], 10);
			}else h = m = s = 0;
			i = new Date(parseInt(i[0], 10), parseInt(i[1], 10) - 1, parseInt(i[2], 10), h, m, s);
		}else i = date instanceof Date ? date : new Date;
		if(isUTC) i.setTime(i.getTime() + zone);
		return i;
	},
	_leapYear = function(v){return (v % 4 == 0 && v % 100 != 0) || v % 400 == 0;},
	_ln = detect.language,
	_date = function(part, date){
		var i;
		switch(part){
		case'Y':return date.getFullYear() + '';
		case'y':return i = _date('Y', date), i.substr(i.length - 2);
		case'm':return i = '00' + _date('n', date), i.substr(i.length - 2);
		case'n':return (date.getMonth() + 1) + '';
		case'd':return i = '00' + _date('j', date), i.substr(i.length - 2);
		case'j':return date.getDate() + '';
		case'H':return i = '00' + _date('G', date), i.substr(i.length - 2);
		case'h':return i = '00' + _date('g', date), i.substr(i.length - 2);
		case'G':return date.getHours() + '';
		case'g':return parseInt(date.getHours()) % 12 + '' || '0';
		case'i':return i = '00' + date.getMinutes(), i.substr(i.length - 2);
		case's':return i = '00' + date.getSeconds(), i.substr(i.length - 2);
		case'u':return date.getMilliseconds() + '';
		case'w':return _msg[_ln].day[date.getDay()];
		default:return part;
		}
	}, diff, part;
	ut.immutable('DATE', {
		diff:diff = function(interval, dateOld, dateNew, isUTC){
			var date1, date2, d1_year, d1_month, d1_date, d2_year, d2_month, d2_date, i, j, k, d, year, month, order, t0;
			date1 = _get(dateOld, isUTC), date2 = _get(dateNew, isUTC);
			switch(interval.toLowerCase()){
			case'y':return date2.getFullYear() - date1.getFullYear();
			case'm':return (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth();
			case'd':
				if(date2 > date1) order = 1;
				else order = -1, date1 = _get(dateNew, isUTC), date2 = _get(dateOld, isUTC);
				d1_year = date1.getFullYear(), d1_month = date1.getMonth(), d1_date = date1.getDate(),
				d2_year = date2.getFullYear(), d2_month = date2.getMonth(), d2_date = date2.getDate(),
				j = d2_year - d1_year, d = 0;
				if(j > 0){
					d += diff('d', new Date(d1_year , d1_month, d1_date), new Date(d1_year, 11, 31)),
					d += diff('d', new Date(d2_year , 0, 1), new Date(d2_year, d2_month, d2_date));
					for(year = d1_year + 1, i = 1; i < j; i++, year++) d += _leapYear(year) ? 366 : 365;
				}else{
					t0 = [31,28,31,30,31,30,31,31,30,31,30,31];
					if(_leapYear(d1_year)) t0[1]++;
					j = d2_month - d1_month;
					if(j > 0){
						d += diff('d', new Date(d1_year , d1_month, d1_date), new Date(d1_year , d1_month, t0[d1_month])) + 1,
						d += diff('d', new Date(d2_year , d2_month, 1), new Date(d2_year , d2_month, d2_date)),
						month = d1_month + 1;
						for(i = 1; i < j; i++) d += t0[month++];
					}else d += d2_date - d1_date;
				}
				return d * order;
			case'h':return parseInt((date2.getTime() - date1.getTime()) / 3600000);
			case'i':return parseInt((date2.getTime() - date1.getTime()) / 60000);
			case's':return parseInt((date2.getTime() - date1.getTime()) / 1000);
			case'ms':return date2.getTime() - date1.getTime();
			default:return null;
			}
		}, 
		part:part = function(part, date, isUTC){
			var part = part || 'Y-m-d H:i:s', i, j, r = '';
			for(date = _get(date, isUTC), i = 0, j = part.length; i < j; i++) r += _date(part.charAt(i), date);
			return r;
		},
		add:function(interval, number, date, isUTC){
			date = _get(isUTC, date);
			switch(interval.toLowerCase()){
			case'y':date.setFullYear(date.getFullYear() + number);break;
			case'm':date.setMonth(date.getMonth() + number);break;
			case'd':date.setDate(date.getDate() + number);break;
			case'h':date.setHours(date.getHours() + number);break;
			case'i':date.setMinutes(date.getMinutes() + number);break;
			case's':date.setSeconds(date.getSeconds() + number);break;
			case'ms':date.setMilliseconds(date.getMilliseconds() + number);break;
			default: return null;
			}
			return date;
		},
		ln:function(v){_ln = v;},
		i18n:(function(){
			var data;
			i18n.data('@utDATE', data = {'ko-KR':{
				day:['sun','mon','tue','wed','thu','fri','sat'],
				pretty:[
					'초 전', '분 전', '시간 전', '일 전', '개월 전', '년 전',
					'초 후', '분 후', '시간 후', '일 후', '개월 후', '년 후', '지금'
				]
			}});
			return function(ln, v){
				if(v.day && v.day.length == 7 && v.pretty && v.pretty.length == ) data[ln] = v;
				else err('DATA.i18n');
			};
		})(),
		pretty:function(targetDate, baseDate, isUTC){
			var t, m = _msg[_ln].pretty;
			baseDate = _get(baseDate, isUTC), targetDate = _get(targetDate, isUTC), 
			t = Math.round(+baseDate / 1000 - targetDate / 1000);
			if(t > 0){
				if(t < 60) return t + m[0];
				t = Math.round(t / 60);
				if(t < 60) return t + m[1];
				t = Math.round(t / 60);
				if(t < 24) return t + m[2];
				t = Math.round(t / 24);
				if(t < 30) return diff('d', targetDate, baseDate) + m[3];
				if(t < 365) return diff('m', targetDate, baseDate) + m[4];
				else return diff('y', targetDate, baseDate) + m[5];
			}else if(t < 0){
				t = -t;
				if(t < 60) return t + m[6];
				t = Math.round(t / 60);
				if(t < 60) return t + m[7];
				t = Math.round(t / 60);
				if(t < 24) return t + m[8];
				t = Math.round(t / 24);
				if(t < 30) return diff('d', baseDate, targetDate) + m[9];
				if(t < 365) return diff('m', baseDate, targetDate) + m[10];
				else return diff('y', baseDate, targetDate) + m[11];
			}else return m[12];
		}
	});
})();
(function(){
var lock = {}, mk = function(target){
	var cache = {};
	return function(v){
		var query = v || location[target].substr(1), t0, t1, i, j;
		if(!query) return;
		if(!cache[query]){
			t0 = query.split('&'), i = t0.length, t1 = {};
			while(i--) t0[i] = t0[i].split('='), t1[decode(t0[i][0])] = decode(t0[i][1]);
			cache[query] = t1;
		}
		return cache[query];
	};
};
ut.immutable(
//lock
'lock', function(){var i = arguments.length; while(i--) lock[arguments[i]] = 1;},
'unlock', function(){var i = arguments.length; while(i--) lock[arguments[i]] = 0;},
'isLock', function(){var i = arguments.length; while(i--) if(lock[arguments[i]]) return 1;},
'locker', function(k, f){
	return function(){
		if(lock[k]) return;
		return lock[k] = 1, f.apply(this, arguments);
	};
},
//http
'encode', encode, 'decode', decode,
'queryString', mk('search'),
'hash', mk('hash'),
'ck', function(key/*, val, expire, path*/){
	var t0, t1, t2, i, j, v;
	t0 = doc.cookie.split(';'), i = t0.length;
	if(arguments.length == 1){
		while(i--) if(t0[i].substring(0, j = t0[i].indexOf('=')).trim() == key) return decode(t0[i].substr(j + 1).trim());
		return null;
	}else{
		v = arguments[1], t1 = key + '=' + encode(v) + ';domain=' + doc.domain + ';path=' + (arguments[3] || '/');
		if(v === null) t0 = new Date, t0.setTime(t0.getTime() - 86400000), t1 += ';expires=' + t0.toUTCString();
		else if(arguments[2]) t0 = new Date, t0.setTime(t0.getTime() + arguments[2] * 86400000), t1 += ';expires=' + t0.toUTCString();
		return doc.cookie = t1, v;
	}
},
//xml
'xml', (function(){
	var filter = function(v){
		if(typeof v == 'string'){
			if(v.substr(0, 20).indexOf('<![CDATA[') > -1) v = v.substring(0, 20).replace('<![CDATA[', '') + v.substr(20);
			if(v.substr(v.length - 5).indexOf(']]>') > -1) v = v.substring(0, v.length - 5) + v.substr(v.length - 5).replace(']]>', '');
			return v.trim();
		}else return '';
	}, type,
	parse = W['DOMParser'] ? (function(){
		var worker = new DOMParser;
		type = 1;
		return function(v){return worker.parseFromString(v, "text/xml");};
	})() : (function(){
		var t0 = 'MSXML2.DOMDocument', i, j;
		t0 = ['Microsoft.XMLDOM', 'MSXML.DOMDocument', t0, t0+'.3.0', t0+'.4.0', t0+'.5.0', t0+'.6.0'], i = t0.length;
		while(i--){
			try{new ActiveXObject(j = t0[i]);}catch(e){continue;}
			break;
		}
		return function(v){
			var worker = new ActiveXObject(j);
			return worker.loadXML(v), worker;
		};
	})(),
	text = type ? 'textContent' : 'text',
	stack = [];
	return function(v, result){
		var node, attr, name, sub, prev, parent, i, j, k, l, n, m;
		if(!result || typeof result != 'object' || typeof result != 'function') result = {};
		stack.length = 0,
		v = {nodes:parse(filter(v)).childNodes,parent:result};
		do{
			for(i = 0, j = v.nodes.length; i < j; i++){
				sub = {}, node = type ? v.nodes[i] : v.nodes.nextNode(), name= node.nodeName;
				switch(node.nodeType){
				case 3:sub.value = node[text].trim(); break;
				case 4:sub.value = filter(node[text].trim()); break;
				case 1:
					if(attr = node.attributes){
						k = attr.length;
						while(k--) sub['$' + attr[k].name] = attr[k].value;
					}
					if(node.childNodes && (n = node.childNodes.length)) while(n--) if(node.childNodes[n].nodeType == 1){
						stacks[stacks.length] = {parent:sub, nodes:node.childNodes};
						break;
					}
					parent = stack.parent;
					if(prev = parent[name]){
						if(prev.length === undefined) parent[name] = {length:2, 0:prev, 1:sub};
						else parent[name][prev.length++] = sub;
					}else parent[name] = sub;
				}
			}
		}while(v = stacks.pop())
		return result;
	};
})()
);
