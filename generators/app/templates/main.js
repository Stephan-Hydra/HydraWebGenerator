/* jshint ignore:start */

var getCopy = function(lang) {

    // get language-specific xml
	return $.ajax({
        type: 'GET',
		url: 'lang/' + lang + '.xml',
		dataType: 'text',
        async: false,
        cache: false,
		contentType : 'application/xml',
		success: function(xml) {

            var xmlDoc;

            try {
                // modern Browsers
                xmlDoc = $.parseXML(xml);
            } catch(e) {
                // IE8
                xmlDoc = parseWitoutActiveX(xml);
            }

			$('[data-text]').each(function() {
				var theID = '#' + $(this).attr('data-text');
                if (theID != '#') {
				    var theText = $(xmlDoc).find(theID).text();
                    $(this).html(theText);
                }
			});
		},
        error: function(xmlReq, status, errorMsg){
            console.log('--- ERROR ---');
            console.log(xmlReq);
            console.log(status);
            console.log(errorMsg);
        }

	});

};



$(document).ready(function () {
    $('#main').html(Templates.helloworld());
    getCopy('de');
    console.log('Hello JQuery!');
});

/* jshint ignore:end */
