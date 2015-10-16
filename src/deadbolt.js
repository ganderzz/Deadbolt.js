var deadbolt = (function() {
    var queue = [];
    var validators = {
        email: function() {
            return new RegExp("(.+)@(.+)\.(.+)", "i");
        },
        minLength: function(what) {
            return new RegExp("^(.+){" + what + ",}$", "i");
        },
        not: function(what) {
            return new RegExp("^((?!" + what + ").)*$", "i");
        },
        digit: function() {
            return new RegExp("^[0-9,\-]+$", "i");
        }
    };

    function deadbolt(elem, options) {
        return new deadbolt.fn._init(elem, options);
    }

	/* Internal Functions */
	/* _init: Initializes deadbolt - loads in form elements with corresponding varifications. / Returns: OBJECT:(deadbolt) */
	/* _tester: Tests an element with its varifications to see if it passes. / Returns: BOOLEAN:(True / False) */
    deadbolt.fn = deadbolt.prototype = {
        _init: function(elem, options) {
        	var i, qElem = document.querySelector(elem).querySelectorAll("[data-valid]");

            if(options !== undefined)
            {
                for(var key in options)
                    validators[key] = options[key];
            }

            console.log(qElem);

            // Search form for data-valid attributes, then create an array combining those rules with the DOM element
            for(i = 0; i < qElem.length; i++) {
                var validation = [],
                	tempElem = qElem[i], 
                	what = (tempElem.dataset.valid.indexOf(",") > 0)? tempElem.dataset.valid.split(",") : [tempElem.dataset.valid];

                for (var i = 0; i < what.length; i++) {
                    for (var key in validators) {
                        if (what[i].match(new RegExp(key, "i")))
                        {
                            validation.push(validators[key](what[i].split("=")[1]));
                        }
                    }
                }
                queue.push(new Array(tempElem, validation, false));
            }

            return deadbolt;
        },
        _tester: function(what, validator) {
        	console.log(what);
            for (var i = 0; i < validator.length; i++) {
                if (!validator[i].test(what.value)) {
                    what.parentNode.className = "has-error";
                    return false;
                }
            }

            return true;
        }
    };

	/* External Functions */
	/* */
    deadbolt.isValid = deadbolt.prototype = function() {
        var tempBool = true;
        console.log(queue);
        for (var i = 0; i < queue.length; i++) {
            if (deadbolt.fn._tester(queue[i][0], queue[i][1]) === false)
                tempBool = false;
        }

        return tempBool;
    }

    return deadbolt;
})(jQuery);
