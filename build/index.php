<?php
function _read( $path ){
	$result = '';
	$f = fopen( $path, "r" );
	while( $t0 = fread( $f, 4096 ) ) $result .= $t0;
	fclose($f);
	return $result;
}
function _write( $path, $v ){
	$f = fopen( $path, "w+" );
	flock( $f, LOCK_EX );
	fwrite( $f, $v );
	flock( $f, LOCK_UN );
	fclose($f);
}
$header = _read(realpath('./..').'/src/000_header.js')."\n";
$footer = _read(realpath('./..').'/src/999_footer.js')."\n";
$path = realpath('./..').'/src/';
$js = '';
foreach(array(
	1=>'base',
	5=>'detect',
	10=>'polyfill',
	15=>'cls',
	20=>'math',
	25=>'date',
	30=>'util',
	35=>'local',
	40=>'network',
	45=>'style',
	50=>'css',
	55=>'key',
	60=>'event',
	70=>'win',
	80=>'query',
	90=>'dom',
	100=>'template',
	110=>'i18n',
	120=>'vali',
	130=>'ani',
	140=>'img',
	150=>'ga',
	900=>'boot'
) as $k=>$v ) $js .= _read( $path.substr( '0'.$k, -3 ).'_'.$v.'.js', "r" )."\n";
_write( realpath('').'/build.js', $header.$js.$footer );
require_once dirname(__FILE__).'/JSMin.php';
$min = JavaScriptMinifier::minify($js);
_write( realpath('').'/min.js', $header.$min.$footer );

$root = isset($_GET['root']) && $_GET['root'] == 'true' ? TRUE : FALSE;
switch( isset($_GET['live']) ? $_GET['live'] : 'full' ){
case'min': _write( realpath('./..').'/index.js', $header.$min.$footer ); $live = 'min'; if( $root ) _write( realpath('./../..').'/index.js', $header.$min.$footer ); break;
case'full': _write( realpath('./..').'/index.js', $header.$js.$footer ); $live = 'full'; if( $root ) _write( realpath('./../..').'/index.js', $header.$js.$footer ); break;
default: $live = 'none';
}

echo 'full:<a href="build.js" target="_blank">build.js</a><br>minify:<a href="min.js" target="_blank">min.js</a>'.
	'<br>lived('.$live.'):<a href="http://js.bsapi.co/2/" target="_blank">http://js.bsapi.co/2/</a>';
if( $root ) echo '<br>root changed:<a href="http://js.bsapi.co/2/" target="_blank">http://js.bsapi.co/</a>';
?>
