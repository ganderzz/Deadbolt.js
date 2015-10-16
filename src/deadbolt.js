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
        	var qElem = document.querySelector(elem).querySelectorAll("[data-valid]");

        	// Check if any rules are passed into instantiation function. If so, add it to the global validators object.
            if(options !== undefined)
            {
                for(var key in options)
                    validators[key] = options[key];
            }

            // Search form for data-valid attributes, then create an array combining those rules with the DOM element
            for(var i = 0; i < qElem.length; i++) {
                var validation = [],
                	tempElem = qElem[i], 
                	what = (tempElem.dataset.valid.indexOf(",") > 0)? tempElem.dataset.valid.split(",") : [tempElem.dataset.valid];

                // Check all rules on a DOM element. 
                // If they match rules defined in the global validators, add the corresponding RegExp function to local validation array
                for (var t = 0; t < what.length; t++) {
                    for (var key in validators) {
                        if (what[t].match(new RegExp(key, "i")))
                            validation.push(validators[key](what[t].split("=")[1]));
                    }
                }
                queue.push(new Array(tempElem, validation, false));
            }

            return deadbolt;
        },
        _tester: function(input) {
        	var what = input[0], validator = input[1], hasError = input[2];

            for (var i = 0; i < validator.length; i++) {
                if (!validator[i].test(what.value)) {
                    hasError = true;

                    return false;
                }
                hasError = false;
            }

            return true;
        }
    };

	/* External Functions */
	/* isValid: Checks if all the queued elements match their rules, if so return true or false. / Returns: BOOLEAN(True / False) */
    deadbolt.isValid = deadbolt.prototype = function() {
        var tempBool = true;
        for (var i = 0; i < queue.length; i++) {
            if (deadbolt.fn._tester(queue[i]) === false)
                tempBool = false;
        }

        return tempBool;
    }

    return deadbolt;
})();
