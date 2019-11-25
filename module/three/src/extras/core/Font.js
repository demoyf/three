/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author mrdoob / http://mrdoob.com/
 */

import { ShapePath } from './ShapePath.js';


function Font( data ) {

	this.type = 'Font';

	this.data = data;

}

Object.assign( Font.prototype, {

	isFont: true,

	generateShapes: function ( text, size , lineHeight, letterSpacing) {

		if ( size === undefined ) size = 100;

		var shapes = [];
		var paths = createPaths( text, size, this.data , lineHeight, letterSpacing);

		for ( var p = 0, pl = paths.length; p < pl; p ++ ) {

			Array.prototype.push.apply( shapes, paths[ p ].toShapes() );

		}

		return shapes;

	}

} );

function createPaths(text, size, data , lineHeight, letterSpacing) {

	var chars = Array.from ? Array.from( text ) : String( text ).split( '' ); // see #13988
		var scale = size / data.resolution;
		var maxHeight = data.maxHeight ? data.maxHeight : (data.boundingBox.yMax - data.boundingBox.yMin);
		var line_height = ( maxHeight + data.underlineThickness ) * scale;
		line_height *= lineHeight;
		var paths = [];
		var offsetX = 0, offsetY = 0;
		// 加上默认字体的显示，不用 ？ 展示
		var glyphs = data.glyphs;
		var defaultGlyphs = data.defaultGlyphs;
		var lineIndex = 0;
		var lineWidth = [];
		var tmpCharWidth = 0;
		// 每一个字的宽度是由ha决定的，所以我们可以计算出单行最大的宽度，然后再根据当前行的实际宽度，去调整第一个字的offsetX。 这样就可以居中了
		for ( var i = 0; i < chars.length; i ++ ) {
			var char = chars[ i ];
			var tmpGlyphs = glyphs[char] || defaultGlyphs[char];
			if (tmpGlyphs) {
				var { ha, x_max, x_min } = tmpGlyphs;
				var charWidth = ha * scale;
				if (tmpCharWidth == 0) {
					tmpCharWidth = charWidth;
				}
				if (!lineWidth[lineIndex]) {
					lineWidth[lineIndex] = 0;
				}
				lineWidth[lineIndex] += charWidth + letterSpacing;
			}
			else if ( char === '\n' ) {
				if (lineWidth[lineIndex] === undefined) {
					lineWidth[lineIndex] = 0;
				}
				lineIndex ++;
			}
		}

		var maxWidth = Math.max(...lineWidth);
		lineIndex = 0;
		for ( var i = 0; i < chars.length; i ++ ) {
			var char = chars[ i ];
			if (i == 0) {
				offsetX = (maxWidth - lineWidth[lineIndex]) / 2;
			}
			if (char == ' ') {
				offsetX += tmpCharWidth / 3;
				continue;
			}
			if ( char === '\n' ) {
				lineIndex ++;
				offsetX = (maxWidth - lineWidth[lineIndex]) / 2;
				// 此处修改行高 --xyf
				offsetY -= line_height;
			} else {
				var ret = createPath( char, scale, offsetX, offsetY, data );
				// 是字距了 --xyf
				offsetX += ret.offsetX + letterSpacing;
				paths.push( ret.path );
			}
		}

		return paths;
}

function createPath( char, scale, offsetX, offsetY, data ) {

	var glyph = data.glyphs[ char ] || data.defaultGlyphs[ char ] || data.glyphs[ '?' ];

	if ( ! glyph ) {

		console.error( 'THREE.Font: character "' + char + '" does not exists in font family ' + data.familyName + '.' );

		return;

	}

	var path = new ShapePath();

	var x, y, cpx, cpy, cpx1, cpy1, cpx2, cpy2;

	if ( glyph.o ) {

		var outline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );

		for ( var i = 0, l = outline.length; i < l; ) {

			var action = outline[ i ++ ];

			switch ( action ) {

				case 'm': // moveTo

					x = outline[ i ++ ] * scale + offsetX;
					y = outline[ i ++ ] * scale + offsetY;

					path.moveTo( x, y );

					break;

				case 'l': // lineTo

					x = outline[ i ++ ] * scale + offsetX;
					y = outline[ i ++ ] * scale + offsetY;

					path.lineTo( x, y );

					break;

				case 'q': // quadraticCurveTo

					cpx = outline[ i ++ ] * scale + offsetX;
					cpy = outline[ i ++ ] * scale + offsetY;
					cpx1 = outline[ i ++ ] * scale + offsetX;
					cpy1 = outline[ i ++ ] * scale + offsetY;

					path.quadraticCurveTo( cpx1, cpy1, cpx, cpy );

					break;

				case 'b': // bezierCurveTo

					cpx = outline[ i ++ ] * scale + offsetX;
					cpy = outline[ i ++ ] * scale + offsetY;
					cpx1 = outline[ i ++ ] * scale + offsetX;
					cpy1 = outline[ i ++ ] * scale + offsetY;
					cpx2 = outline[ i ++ ] * scale + offsetX;
					cpy2 = outline[ i ++ ] * scale + offsetY;

					path.bezierCurveTo( cpx1, cpy1, cpx2, cpy2, cpx, cpy );

					break;

			}

		}

	}

	return { offsetX: glyph.ha * scale, path: path };

}

export { Font };
