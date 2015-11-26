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
