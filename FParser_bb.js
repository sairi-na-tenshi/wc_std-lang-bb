with( FParser ){

	lang.bb_content= FParser( new function(){
		
		var simpleSyntax= function( codeName, langName ){
			if( codeName.source ) codeName= codeName.source
			var regexp= '(\\[' + codeName + '\\])([\\s\\S]*?)(\\[/' + codeName + '\\])'
			var handler= function( prefix, content, postfix ){
				prefix= lang.bb_ghost( prefix )
				content= lang[ langName ]( content )
				postfix= lang.bb_ghost( postfix )
				return [ prefix, content, postfix ]
			}
			return { regexp: regexp, handler: handler }
		}

		this.bold= simpleSyntax( /[bB]/, 'bb_bold' )
		this.italic= simpleSyntax( /[iI]/, 'bb_italic' )
		this.underline= simpleSyntax( /[uU]/, 'bb_underline' )
		this.code= simpleSyntax( /[cC][oO][dD][eE]/, 'bb_code' )
		this.quote= simpleSyntax( /[qQ][uU][oO][tT][eE]/, 'bb_quote' ) // добавить имя автора
		this.image= simpleSyntax( /[iI][mM][gG]/, 'bb_image' )
		// добавить [url]

	})

	lang.bb_ghost= FWrapper( 'std:lang-bb-ghost' )
	lang.bb_code= FWrapper( 'std:lang-bb-code' )
	lang.bb= FPipe( lang.bb_content, FWrapper( 'std:lang-bb' ) )
	lang.bb_bold= FPipe( lang.bb_content, FWrapper( 'std:lang-bb-bold' ) )
	lang.bb_italic= FPipe( lang.bb_content, FWrapper( 'std:lang-bb-italic' ) )
	lang.bb_underline= FPipe( lang.bb_content, FWrapper( 'std:lang-bb-underline' ) )
	lang.bb_quote= FPipe( lang.bb_content, FWrapper( 'std:lang-bb-quote' ) )
	lang.bb_image= FPipe( lang.bb_content, FWrapper( 'std:lang-bb-image' ) )

}
