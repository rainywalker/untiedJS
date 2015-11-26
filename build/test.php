<?php
function _read( $path ){
	$result = '';
	$f = fopen( $path, "r" );
	while( $t0 = fread( $f, 4096 ) ) $result .= $t0;
	fclose($f);
	return $result;
}
$header = _read(realpath('./..').'/src/header.js')."\n";
$footer = _read(realpath('./..').'/src/footer.js')."\n";
$path = realpath('./..').'/src/';
$js = '';
foreach( array(
	10=>'detect',
	20=>'es5',
	21=>'math',
	22=>'date',
	30=>'util',
	31=>'local',
	32=>'network',
	40=>'style',
	50=>'css',
	60=>'event',
	70=>'win',
	80=>'query',
	90=>'dom',
	91=>'template',
	92=>'i18n',
	100=>'ani',
	101=>'ga',
	102=>'vali',
	103=>'img',
	110=>'boot',
	120=>'auth'
) as $k=>$v ) $js .= _read( $path.substr( '0'.$k, -3 ).'_'.$v.'.js', "r" )."\n";
echo $header.$js.$footer;
