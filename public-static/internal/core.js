/* Generated by GULP (src/gulpfile.js) */
/* DO NOT EDIT!! */

/* star.js */

;(function(){

/**
 * Gets favourites
 * @function star_Get
 * @param {Number} user to fetch
*/
window.star_Get = function(user) {
	return [];
}

})();

/* cache.js */

;(function(){
	


})();

/* html.js */

;(function(){

/*
TODO: Whenever you upgrade marked.js, change codespan to do this 

Renderer.prototype.codespan = function(text) {
  return '<span><code>' + text.replace('\n','') + '</code></span>';
};
*/

/**
 * Parse a block of markdown
 * @function html_Parse
*/
window.html_Parse = function(text) {
	var out = "";
	var block = text.split("```");
	
	for (var idx = 0, len = block.length; idx < len; ++idx ) {
		// Odd: Do syntax highlighting //
		if ( idx & 1 ) {
			// TODO: exctract first word (block[idx].split("\\s+",1)
			// then scan Prism.languages for a match.
			
			out += "<pre class='language-clike'><code class='language-clike'>";
			out += Prism.highlight(block[idx].trim(),Prism.languages.clike);
			out += "</code></pre>";
		}
		// Even: Do Markdown and Emoji //
		else {
			out += emojione.shortnameToImage(marked.parse(block[idx]));
		}
	}
	
	return out;
}

})();

/* lib.js */
;(function(){
	
/**
	Functions that extend the default JavaScript library.
	
	NOTE: This *may* be a bad idea (at least on older browsers).
	Reference: http://perfectionkills.com/whats-wrong-with-extending-the-dom/
*/

// Lets you remove elements by doing:
//   document.getElementById("my-element").remove();
//   document.getElementsByClassName("my-elements").remove();
// Source: http://stackoverflow.com/a/18120786
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = 
HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

// Convert an object in to an HTTP query string (i.e. GET and POST)
//   i.e. serialize({"data":10,"name":"bort"}) --> data=10&name=bort
// Source: http://stackoverflow.com/a/1714899
window.serialize = function(obj, prefix) {
	var str = [];
	for(var p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
			str.push(typeof v == "object" ?
			window.serialize(v, k) :
			encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
	}
	return str.join("&");
}

// Change " and ' characters in a string for use in Attributes (title, etc)
// http://stackoverflow.com/a/12562097
window.escapeAttribute = function(value) {
	return String(value).
        replace(/\\/g, '\\\\').			/* This MUST be the 1st replacement. */
        replace(/\t/g, '\\t').			/* These 2 replacements protect whitespaces. */
        replace(/\n/g, '\\n').
        replace(/\u00A0/g, '\\u00A0').	/* Useful but not absolutely necessary. */
		replace(/&/g, '&amp;').
		replace(/"/g, '&quot;').		//" // <- kill the weird quoting
		replace(/'/g, '&#39;').			//' // <- kill the weird quoting
		replace(/</g, '&lt;').
		replace(/>/g, '&gt;');
}

window.escapeString = function(value) {
	return String(value).
		replace(/&/g, '&amp;').
		replace(/"/g, '&quot;').		//" // <- kill the weird quoting
		replace(/'/g, '&#39;').			//' // <- kill the weird quoting
		replace(/</g, '&lt;').
		replace(/>/g, '&gt;');
}


window.dom_SetText = function(id,text) {
	document.getElementById(id).innerHTML = text;
}
window.dom_GetText = function(id,text) {
	return document.getElementById(id).innerHTML;
}
window.dom_SetAttribute = function(id,attr,value) {
	document.getElementById(id)[attr] = value;
}
window.dom_GetAttribute = function(id,attr) {
	return document.getElementById(id)[attr];
}


// Is supposed to work, but as far as I've seen does not //
window.dom_RestartAnimation = function(id,class_name) {
	element = document.getElementById(id);
	element.classList.remove(class_name);
	element.offsetWidth = element.offsetWidth;
	element.classList.add(class_name);
}
// More attempts at trying to fix the animation restart problem //
window.dom_ForceReflow = function(id) {
	element = document.getElementById(id);
	element.offsetWidth = element.offsetWidth;
	element.width = element.width;
}

window.dom_SetFocus = function(id) {
	return document.getElementById(id).focus();
}

// Source: http://stackoverflow.com/a/7557433
window.dom_InViewport = function(el) {
	var rect = el.getBoundingClientRect();
	
	return
		(rect.top >= 0) &&
		(rect.left >= 0) &&
		(rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) &&
		(rect.right <= (window.innerWidth || document.documentElement.clientWidth));
}


// Source: http://stackoverflow.com/a/196038
// Change all classes //
window.dom_SetClasses = function(id,class_names) {
	document.getElementById(id).className = class_names;
}
// Get all classes //
window.dom_GetClasses = function(id) {
	return document.getElementById(id).className;
}

// Add a class //
window.dom_AddClass = function(id,class_name) {
	document.getElementById(id).className += " "+class_name;
}
// Remove a class //
window.dom_RemoveClass = function(id,class_name) {
	document.getElementById(id).className =
		document.getElementById(id).className.replace(
			RegExp('(?:^|\\s)'+class_name+'(?!\\S)','g'),
			""
		);
}
// Does element have a certain class? //
window.dom_HasClass = function(id,class_name) {
	return Boolean(document.getElementById(id).className.match(
		RegExp('(?:^|\\s)'+class_name+'(?!\\S)','g')
	));
}
// Add, Remove, or Toggle class, if not already set //
window.dom_ToggleClass = function(id,class_name,value) {
	var action = value;
	var has = dom_HasClass(id,class_name);
	if ( typeof action !== "boolean" ) {
		action = !has;
	}
	
	if ( action ) {
		if ( !has )
			dom_AddClass(id,class_name);
	}
	else {
		if ( has )
			dom_RemoveClass(id,class_name);
	}
}


})();

/* locale.js */
;(function(){
	
/**
	Locale Library - Convert Date and Number types to locale appropriate English strings.
	
	NOTE: If using timestamps, convert them with 'new Date(MyTimestamp)' first.
*/

var DateSuffixTable = [
	"th","st","nd","rd","th","th","th","th","th","th",
	"th","th","th","th","th","th","th","th","th","th"
];
var DayOfTheWeekTable = [
	"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];
var MonthOfTheYearTable = [
	"January","February","March","April","May","June","July",
	"August","September","October","November","December"
];

var time_locale = navigator.language;

// Since official time standards don't necessarily match common use, remap time locales //
var LocaleRemapTable = {
	'en-GB':'en-US'
};
if ( LocaleRemapTable.hasOwnProperty(navigator.language) ) {
	time_locale = LocaleRemapTable[navigator.language];
}

// I don't see this being used much, but a way to get the internal locale //
window.getLocale = function() {
	return time_locale;
}

// Get the suffix you'd append on a numer (i.e. 10th, 31st, just the TH, RD, ST, ND part) //
window.getLocaleNumberSuffix = function( num ) {
	var Digit = Math.abs(num) % 100;
	if ( (Digit > 10) && (Digit < 20) )
		return "th";
	else
		return DateSuffixTable[Digit % 10];
}

// Time, as either 12 hour (i.e. 2:35 AM) or 24 hour (i.e. 02:30) form, depending on browser locale //
window.getLocaleTime = function( date ) {
	// Check toLocaleTimeString for 12 hour clock, or if language is English, assume 12 hour clock //				
	if ( ('toLocaleTimeString' in Date.prototype )
		&& (date.toLocaleTimeString(time_locale).indexOf('M') > -1)	// AM PM both have M's
		|| (time_locale.indexOf("en-") >= 0) ) 
	{
		var HalfDay = (date.getHours() - 12) >= 0;
		return (date.getHours() % 12) + ":" + 
			new String("00"+date.getMinutes()).slice(-2) + 
			(HalfDay?" PM":" AM");
	}
	else {
		return new String("00"+date.getHours()).slice(-2) + ":" + new String("00"+date.getMinutes()).slice(-2);
	}
}

// Day of the Week (i.e. Sunday to Saturday) //
window.getLocaleDay = function( date ) {
	return DayOfTheWeekTable[date.getDay()];
}

// Date (i.e. January 21st, 2015) //
window.getLocaleDate = function( date ) {
	return MonthOfTheYearTable[date.getMonth()] + " " + 
		date.getDate() + DateSuffixTable[EventDate.getDate() % 20] + ", " + 
		date.getFullYear();
}

// Time Zone, short abbreviated form (i.e. EST, CET) //
window.getLocaleTimeZone = function( date ) {
	// http://stackoverflow.com/a/12496442
	date = date.toString();
	date = date.replace("Argentina Standard Time","ART");
	date = date.replace("W. Europe Standard Time","CET");	// Microsoft
	var TZ = date.indexOf('(') > -1 ?
	date.match(/\([^\)]+\)/)[0].match(/[A-Z]/g).join('') :
	date.match(/[A-Z]{3,4}/)[0];
	if (TZ == "GMT" && /(GMT\W*\d{4})/.test(date)) TZ = RegExp.$1;
	return TZ;
}

})();

/* love.js */

;(function(){

/**
 * Gets all the love
 * @function love_Get
 * @param {Number} user to fetch all love from
*/
window.love_Get = function(user) {
	return [200,225];
}

})();

/* time.js */
;(function(){
	
/**
	Time Library - Various Time related functions.
	
	NOTE: For converting dates to nice strings, see "locale.js".
*/

// Given a time difference, convert to words until a deadline
window.getCountdownInWeeks = function( time, max_places, padded ) {
	var Seconds = time % 60;
	var Minutes = Math.floor(time / 60) % 60;
	var Hours = Math.floor(time / (60*60)) % 24;
	var Days = Math.floor(time / (60*60*24)) % 7;
	var Weeks = Math.floor(time / (60*60*24*7)) % 365;
	var Years = Math.floor(time / (60*60*24*7*365));
	
	var Places = 0;
	if ( !max_places )
		max_places = 10;
	
	var out = "";
	
	if ( (Places < max_places && Years > 0) || (Places && Places < max_places && padded) ) {
		Places++;

		if ( Years == 1 )
			out += Years+" year";
		else
			out += Years+" years";
	}
	
	if ( (Places < max_places && Weeks > 0) || (Places && Places < max_places && padded) ) {
		Places++;

		if ( out )
			out += ", ";
		
		if ( Weeks == 1 )
			out += Weeks+" week";
		else
			out += Weeks+" weeks";
	}

	if ( (Places < max_places && Days > 0) || (Places && Places < max_places && padded) ) {
		Places++;
		
		if ( out )
			out += ", ";
		
		if ( Days == 1 )
			out += Days+" day";
		else
			out += Days+" days";
	}

	if ( (Places < max_places && Hours > 0) || (Places && Places < max_places && padded) ) {
		Places++;
		
		if ( out )
			out += ", ";
			
		if ( Hours == 1 )
			out += Hours+" hour";
		else
			out += Hours+" hours";
	}

	if ( (Places < max_places && Minutes > 0) || (Places && Places < max_places && padded) ) {
		Places++;
		
		if ( out )
			out += ", ";
			
		if ( Minutes == 1 )
			out += Minutes+" minute";
		else
			out += Minutes+" minutes";
	}

	if ( (Places < max_places && Seconds > 0) || (Places && Places < max_places && padded) ) {
		Places++;
		
		if ( out )
			out += ", ";
			
		if ( Seconds == 1 )
			out += Seconds+" second";
		else
			out += Seconds+" seconds";
	}
	
	return out;
}

// Given a time difference (positive), get roughly how old something is //
window.getRoughAge = function( time ) {
	if ( time < 0 ) {
		return "in the future";
	}
	else if ( time < 1000*60*2 ) { 
		return "right now";
	}
	else if ( time < 1000*60*60 ) {
		return Math.floor(time/(1000*60)) + " minutes ago";
	}
	else if ( time < 1000*60*60*2 ) {
		if ( time < 1000*60*30*3 )
			return "an hour ago";
		else
			return "an hour and a half ago";
	}
	else if ( time < 1000*60*60*24 ) {
		return Math.floor(time/(1000*60*60)) + " hours ago";
	}
	else if ( time < 1000*60*60*24*2 ) {
		if ( time < 1000*60*60*12*3 )
			return "a day ago";
		else
			return "a day and a half ago";
	}
	else if ( time < 1000*60*60*24*7*2 ) {				// 2 weeks of days
		return Math.floor(time/(1000*60*60*24)) + " days ago";
	}
	else if ( time < 1000*60*60*24*((7*4*3)+7.5) ) {	// 12 weeks (briefly 13)
		return Math.floor(time/(1000*60*60*24*7)) + " weeks ago";
	}
	else if ( time < 1000*60*60*24*182*3 ) {
		return Math.floor(time/(1000*60*60*24*30.5)) + " months ago";
	}
	else if ( time < 1000*60*60*24*365*2 ) {
		return "a year and a half ago";
	}
	
	return Math.floor(time/(1000*60*60*24*365)) + " years ago";
}

})();

/* ui.js */
;(function(){
	
/**
	UI Functions
*/

window.ui_NewDialog1 = function(message, option_a, a_func) {
}
window.ui_NewDialog2 = function(message, option_a, option_b, a_func, b_func) {
}
window.ui_NewDialog3 = function(message, option_a, option_b, option_c, a_func, b_func, c_func) {
}

})();

/* xhr.js */
;(function(){

/*
function MyResponse( response, code ) {
}
*/

window.xhr_Get = function( url, func ) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET",url,true);
	xhr.onreadystatechange = function() {
		if ( (xhr.readyState == 4) ) {
			func( xhr.responseText, xhr.status );
		}
	}
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send();
}
window.xhr_Post = function( url, post_data, func ) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.onreadystatechange = function() {
		if ( (xhr.readyState == 4) ) {
			func( xhr.responseText, xhr.status );
		}
	}
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(post_data);
}

window.xhr_GetJSON = function( url, func ) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET",url,true);
	xhr.onreadystatechange = function() {
		if ( (xhr.readyState == 4) ) {
			// If the error code is above 500, then there was a server error //
			if ( xhr.status >= 500 ) {
				console.log( xhr.responseText );
				func( {}, xhr.status );
			}
			// If the response begins with a non JSON object/array character, assume the response is bad //
			else if ( (xhr.responseText[0] != '[') && (xhr.responseText[0] != '{') ) {
				console.error( "Malformed JSON XHR Response" );
				console.log( xhr.responseText );				
				func( {}, 500 );	// Fabricate a 500 (Server Error) response //
			}
			else {
				func( JSON.parse(xhr.responseText), xhr.status );
			}
		}
	}
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send();
}
window.xhr_PostJSON = function( url, post_data, func ) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.onreadystatechange = function() {
		if ( (xhr.readyState == 4) ) {
			// If the error code is above 500, then there was a server error //
			if ( xhr.status >= 500 ) {
				console.log( xhr.responseText );
				func( {}, xhr.status );
			}
			// If the response begins with a non JSON object/array character, assume the response is bad //
			else if ( (xhr.responseText[0] != '[') && (xhr.responseText[0] != '{') ) {
				console.error( "Malformed JSON XHR Response" );
				console.log( xhr.responseText );				
				func( {}, 500 );	// Fabricate a 500 (Server Error) response //
			}
			else {
				func( JSON.parse(xhr.responseText), xhr.status );
			}
		}
	}
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(post_data);
}

})();
