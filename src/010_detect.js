detect = (function(){
	var detect,
		navi = W['navigator'], agent = navi.userAgent.toLowerCase(), platform = navi.platform.toLowerCase(), app = navi.appVersion.toLowerCase(), 
		device = 'pc', browser, bv, os, osv, cssPrefix, stylePrefix, docMode, ie7mode,
		i, t0,
		edge = function(){
			if(agent.indexOf('Edge/') == NONE) return;
			return browser = 'edge', bv = parseInt(/Edge[\/]([0-9.]+)/.exec(agent)[1]);
		},
		ie = function(){
			if(agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0) return;
			if(agent.indexOf('iemobile') > -1) os = 'winMobile';
			return browser = 'ie', bv = agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ? (ie7mode = 1, -1) : agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
		},
		chrome = function(){
			if(agent.indexOf(i = 'chrome') < 0 && agent.indexOf(i = 'crios') < 0) return;
			return browser = 'chrome', bv = parseFloat((i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/).exec(agent)[1]);
		},
		firefox = function(){return agent.indexOf('firefox') < 0 ? 0 : (browser = 'firefox', bv = parseFloat(/firefox\/([\d]+)/.exec(agent)[1]));},
		safari = function(){return agent.indexOf('safari') < 0 ? 0 : (browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1]));},
		naver = function(){return agent.indexOf('naver') < 0 ? 0 : browser = 'naver';};
	if(agent.indexOf('android') > -1){
		browser = os = 'android', device = agent.indexOf('mobile') == -1 ? (browser += 'Tablet', 'tablet') : 'mobile',
		osv = (i = /android ([\d.]+)/.exec(agent)) ? (i = i[1].split('.'), parseFloat(i[0] + '.' + i[1])) : 0,
		naver() || chrome() || firefox() || (bv = i = /safari\/([\d.]+)/.exec(agent) ? parseFloat(i[1]) : 0);
	}else if(agent.indexOf(i = 'ipad') > -1 || agent.indexOf(i = 'iphone') > -1){
		device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i, osv = (i = /os ([\d_]+)/.exec(agent)) ? (i = i[1].split('_'), parseFloat(i[0] + '.' + i[1])) : 0,
		naver() || chrome() || firefox() || (bv = (i = /mobile\/([\S]+)/.exec(agent)) ? parseFloat(i[1]) : 0);
	}else if(platform.indexOf('win') > -1){
		for(i in t0 = {'5.1':'xp', '6.0':'vista','6.1':'7','6.2':'8','6.3':'8.1'}){
			if(agent.indexOf('windows nt ' + i) > -1){
				osv = t0[i];
				break;
			}
		}
		os = 'win', ie() || chrome() || firefox();
	}else if(platform.indexOf('mac') > -1) os = 'mac', i = /os x ([\d._]+)/.exec(agent)[1].replace('_', '.').split('.'), osv = parseFloat(i[0] + '.' + i[1]), chrome() || firefox() || safari();
	else os = app.indexOf('x11') > -1 ? 'unix' : app.indexOf('linux') > -1 ? 'linux' : 0, chrome() || firefox();

	switch(browser){
	case'ie':
		cssPrefix = '-ms-', stylePrefix = 'ms', docMode = doc['documentMode'] || 0;
		if(bv == 6) doc.execCommand('BackgroundImageCache', false, true), p[p.length] = function(){doc.body.style.position = 'relative';};
		else if(bv == -1) bv = !('getContext' in (t0 = doc.createElement('canvas'))) ? 8 : 
			!('msTransition' in body.style) && !('transition' in body.style) ? 9 : 
			t0.getContext('webgl') ? 11 : 10;
		break;
	case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz';break;
	case'edge':  cssPrefix = '-ms-', stylePrefix = 'ms';break;
	default: cssPrefix = '-webkit-', stylePrefix = 'webkit';
	}
	return {
		device:device, browser:browser, browserVer:bv, ie7mode:ie7mode, os:os, osVer:osv, sony:agent.indexOf('sony') > -1 ? 1 : 0,
		docMode:docMode, cssPrefix:cssPrefix, stylePrefix:stylePrefix, transform3d:browser != 'ie' || bv > 9,
		language:navigator.language || navigator.userLanguage
	};
})();
