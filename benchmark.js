var b = require('b');
var re = require('./regexp.js');
var util = require('util');

/* Data for benchmarks taken from:
 * http://tusker.org/regex/regex_benchmark.html and
 * http://tusker.org/regex/20100713.html
 *
 * TODO: Also incorporate benchmarks from:
 * http://lh3lh3.users.sourceforge.net/reb.shtml
 *
 */

var REs = ["(([^:]+)://)?([^:/]+)(:([0-9]+))?(/.*)",
	   ".*(([^:]+)://)?([^:/]+)(:([0-9]+))?(/.*)",
	   ".*usd [+-]?[0-9]+.[0-9][0-9]"
	  ];
var texts = [ "http://www.linux.com/",
	      "http://www.thelinuxshow.com/main.php3true",
	      "usd 1234.00",
	      "he said she said he said no",
	      "same same same",
	      "{1: this is some more text - and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more this is some more text and some more and some more and even more at the end -}"
	    ];

REs.forEach(function(RE) {
    var REnfa = new re.RegExpNFA(RE);
    var nfa = REnfa.toNFA();
    texts.forEach(function(text, textIdx) {
	var niters = 100;
	// console.log("RE:", RE, "text:", text);
	var bmName = util.format('RE: %s matching string #%d',
				 RE, textIdx + 1);
	b(bmName).run(1, function(runId) {
	    for (var i = 0; i < niters; ++i) {
		re.search(text, nfa);
	    }
	});
    });
});