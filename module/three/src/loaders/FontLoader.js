import { Font } from '../extras/core/Font.js';
import { FileLoader } from './FileLoader.js';
import { Loader } from './Loader.js';
import * as opentype from '../opentype/opentype.src.js';


/**
 * @author mrdoob / http://mrdoob.com/
 */

const ThreeFontUtil = {};
(() => {
    ThreeFontUtil.covertFont = function(font){
        var scale = (1000 * 100) / ( (font.unitsPerEm || 2048) *72);
        var result = {};
        result.glyphs = {};
        result.maxHeight = 0;
        var restriction = {
            range : null,
            set : null
        };
        font.glyphs.forEach(function(glyph){
            if (glyph.unicodes.length > 1) {
                glyph.unicodes = glyph.unicodes.filter((item) => {
                    return item > 13000 && item < 60000;
                })
                glyph.unicode = glyph.unicodes[0];
            }
            if (glyph.unicode !== undefined) {
                var glyphCharacter = String.fromCharCode(glyph.unicode);
                var needToExport = true;
                if (restriction.range !== null) {
                    needToExport = (glyph.unicode >= restriction.range[0] && glyph.unicode <= restriction.range[1]);
                } else if (restriction.set !== null) {
                    needToExport = (restrictCharacterSetInput.value.indexOf (glyphCharacter) != -1);
                }
                if (needToExport) {
                    var token = {};
                    token.ha = Math.round(glyph.advanceWidth * scale);
                    token.x_min = Math.round(glyph.xMin * scale);
                    token.x_max = Math.round(glyph.xMax * scale);
                    // 这里我们需要计算一个单行最高的行高，作为行距的参照标准。
                    result.maxHeight = Math.max(result.maxHeight, (glyph.yMax- glyph.yMin) * scale);
                    token.o = ""
                    glyph.path.commands.forEach(function(command,i){
                        if (command.type.toLowerCase() === "c") {command.type = "b";}
                        token.o += command.type.toLowerCase();
                        token.o += " ";
                        if (command.x !== undefined && command.y !== undefined){
                            token.o += Math.round(command.x * scale);
                            token.o += " ";
                            token.o += Math.round(command.y * scale);
                            token.o += " ";
                        }
                        if (command.x1 !== undefined && command.y1 !== undefined){
                            token.o += Math.round(command.x1 * scale);
                            token.o += " ";
                            token.o += Math.round(command.y1 * scale);
                            token.o += " ";
                        }
                        if (command.x2 !== undefined && command.y2 !== undefined){
                            token.o += Math.round(command.x2 * scale);
                            token.o += " ";
                            token.o += Math.round(command.y2 * scale);
                            token.o += " ";
                        }
                    });
                    result.glyphs[String.fromCharCode(glyph.unicode)] = token;
                }
            };
        });
        result.familyName = font.familyName;
        result.ascender = Math.round(font.ascender * scale);
        result.descender = Math.round(font.descender * scale);
        result.underlinePosition = Math.round(font.tables.post.underlinePosition * scale);
        result.underlineThickness = Math.round(font.tables.post.underlineThickness * scale);
        result.boundingBox = {
            "yMin": Math.round(font.tables.head.yMin * scale),
            "xMin": Math.round(font.tables.head.xMin * scale),
            "yMax": Math.round(font.tables.head.yMax * scale),
            "xMax": Math.round(font.tables.head.xMax * scale)
        };
        result.resolution = 1000;
        result.original_font_information = font.tables.name;
        if (font.styleName.toLowerCase().indexOf("bold") > -1){
            result.cssFontWeight = "bold";
        } else {
            result.cssFontWeight = "normal";
        };
    
        if (font.styleName.toLowerCase().indexOf("italic") > -1){
            result.cssFontStyle = "italic";
        } else {
            result.cssFontStyle = "normal";
        };
    
        return JSON.stringify(result);
    };
})();

function FontLoader( manager ) {

	Loader.call( this, manager );

}

FontLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: FontLoader,

	load: function (url, data, onLoad, onProgress, onError) {

		var scope = this;

		var scope = this;
		// 改一下字体的加载方式，自己处理字体并且转成Three.js需要的格式。
		opentype.load(url, function(err, loadFont) {
			var json;
			try {
				var text = ThreeFontUtil.covertFont(loadFont);
				json = JSON.parse( text );
			} catch ( e ) {
				json = JSON.parse( text.substring( 65, text.length - 2 ) );
			}
			var font = scope.parse( json );
			if ( onLoad ) onLoad( font );
		}, data);

	},

	parse: function ( json ) {

		return new Font( json );

	}

} );


export { FontLoader };
