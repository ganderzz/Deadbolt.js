 /** @namespace */
(function(name, func) {
    if (typeof module != "undefined") module.exports = func();
    else if (typeof define == "function" && typeof define.amd == "object") define(func);
    else this[name] = func();
})("deadbolt", function() {
    var queue = [];
    var validators = {
        email: function() {
            return new RegExp("^(.+?)\@(.+?)(\.[a-zA-Z.]{2,})+$", "i");
        },
        phone: function() {
        	return new RegExp("((\\d)?\\(?(\\d){3}\\)?)?(\\s|-)?(\\d){3}(\\s|-)?(\\d){4}");
        },
        minLength: function(val) {
            return new RegExp("^(.+){" + val + ",}$", "i");
        },
        not: function(val) {
            return new RegExp("^((?!" + val + ").)*$", "i");
        },
        digit: function() {
            return new RegExp("^[0-9]+$", "i");
        }
    };

    /** @constructor */
    function deadbolt(elem, options) {
        return new deadbolt.fn._init(elem, options);
    }

    deadbolt.fn = deadbolt.prototype = {
        _init: function(elem, options) {
        	var qElem = elem.querySelectorAll("[data-valid]");

            if(options !== undefined) {
                for(var key in options) {
                    validators[key] = options[key];
                }
            }
            for(var i = 0; i < qElem.length; i++) {
                var validation = [],
                	tempElem = qElem[i], 
                	what = (tempElem.dataset.valid.indexOf(",") > 0)? tempElem.dataset.valid.split(",") : [tempElem.dataset.valid];

                for (var t = 0; t < what.length; t++) {
                    for (var key in validators) {
                        if (what[t].match(new RegExp(key, "i"))) {
                            validation.push(validators[key](what[t].split("=")[1]));
                        }
                    }
                }
                queue.push(new Array(tempElem, validation, false));
            }

            return deadbolt;
        },
        _tester: function(input) {
        	var what = input[0], validator = input[1];

            for (var i = 0; i < validator.length; i++) {
                if (!validator[i].test(what.value)) {
                    input[2] = true;
                    return false;
                }
            }
            input[2] = false;

            return true;
        }
    };

	/**
	 * Checks if elements in the queue are valid based on the rules provided.
	 * @param {function} callback - Call a function once isValid() is complete.
	 * @memberOf deadbolt
	 * @function

	 * @returns {boolean}
	 */
    deadbolt.isValid = deadbolt.prototype = function(callback) {
        var tempBool = true;
        for (var i = 0; i < queue.length; i++) {
            if (deadbolt.fn._tester(queue[i]) === false) {
                tempBool = false;
            }
        }
        if(typeof callback === "function") {
            callback(deadbolt);
        }

        return tempBool;
    }

	/**
	 * Applies class names to input element's parent node if the input is valid or not.
	 * @memberOf deadbolt
	 * @function

	 * @returns {deadbolt}
	 */
    deadbolt.applyClass = deadbolt.prototype = function() {
    	for (var i = 0; i < queue.length; i++) {
    		var elem = queue[i][0].parentNode;

    		if(queue[i][2] === true) {
    			elem.classList.remove("has-success");
    			elem.classList.add("has-error");
    		}
    		else {
    			elem.classList.remove("has-error");
    			elem.classList.add("has-success");
    		}
    	}

    	return deadbolt;
    }

    return deadbolt;
});
