(self.webpackChunkdev_blog=self.webpackChunkdev_blog||[]).push([[230],{2269:function(e,t,u){var n="[object Symbol]",f=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,r=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,o="\\u2700-\\u27bf",a="a-z\\xdf-\\xf6\\xf8-\\xff",l="A-Z\\xc0-\\xd6\\xd8-\\xde",c="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",i="['’]",d="["+c+"]",x="[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]",s="\\d+",g="[\\u2700-\\u27bf]",b="["+a+"]",p="[^\\ud800-\\udfff"+c+s+o+a+l+"]",E="(?:\\ud83c[\\udde6-\\uddff]){2}",m="[\\ud800-\\udbff][\\udc00-\\udfff]",y="["+l+"]",j="(?:"+b+"|"+p+")",v="(?:"+y+"|"+p+")",A="(?:['’](?:d|ll|m|re|s|t|ve))?",O="(?:['’](?:D|LL|M|RE|S|T|VE))?",h="(?:[\\u0300-\\u036f\\ufe20-\\ufe23\\u20d0-\\u20f0]|\\ud83c[\\udffb-\\udfff])?",U="[\\ufe0e\\ufe0f]?",I=U+h+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",E,m].join("|")+")"+U+h+")*"),S="(?:"+[g,E,m].join("|")+")"+I,z=RegExp(i,"g"),C=RegExp(x,"g"),Z=RegExp([y+"?"+b+"+"+A+"(?="+[d,y,"$"].join("|")+")",v+"+"+O+"(?="+[d,y+j,"$"].join("|")+")",y+"?"+j+"+"+A,y+"+"+O,s,S].join("|"),"g"),L=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,k="object"==typeof u.g&&u.g&&u.g.Object===Object&&u.g,R="object"==typeof self&&self&&self.Object===Object&&self,N=k||R||Function("return this")();var T,w=(T={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"ss"},function(e){return null==T?void 0:T[e]});var D=Object.prototype.toString,G=N.Symbol,M=G?G.prototype:void 0,Y=M?M.toString:void 0;function F(e){if("string"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&D.call(e)==n}(e))return Y?Y.call(e):"";var t=e+"";return"0"==t&&1/e==-Infinity?"-0":t}function H(e){return null==e?"":F(e)}var J,$=(J=function(e,t,u){return e+(u?"-":"")+t.toLowerCase()},function(e){return function(e,t,u,n){var f=-1,r=e?e.length:0;for(n&&r&&(u=e[++f]);++f<r;)u=t(u,e[f],f,e);return u}(function(e,t,u){return e=H(e),void 0===(t=u?void 0:t)?function(e){return L.test(e)}(e)?function(e){return e.match(Z)||[]}(e):function(e){return e.match(f)||[]}(e):e.match(t)||[]}(function(e){return(e=H(e))&&e.replace(r,w).replace(C,"")}(e).replace(z,"")),J,"")});e.exports=$},610:function(e,t,u){"use strict";u.r(t);var n=u(7294),f=u(1597),r=u(2269),o=u.n(r);t.default=function(e){var t=e.data;return n.createElement(n.Fragment,null,n.createElement("ul",{style:{display:"flex",justifyContent:"flex-end"}},t.allMdx.tags.map((function(e){var t=e.tag;return n.createElement("li",{style:{margin:8,listStyle:"none"}},n.createElement(f.rU,{to:"/tags/"+o()(t)},t))}))),t.allMdx.nodes.map((function(e){return n.createElement("article",{key:e.id},n.createElement("h2",null,n.createElement(f.rU,{to:"/"+e.slug},e.frontmatter.title)),n.createElement("p",null,"Posted: ",e.frontmatter.date),n.createElement("p",null,e.slug))})))}}}]);
//# sourceMappingURL=component---src-pages-index-jsx-350e7da14a42a46a67ad.js.map