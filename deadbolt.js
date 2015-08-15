$.fn.deadbolt = (function() {
    var queue = [];
    var validators = {
        email: function() {
            return new RegExp(".+@.+\..+", "i");
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

    function deadbolt(options) {
        return new deadbolt.fn._init(this, options);
    }

	/* Internal Functions */
	/* _init: Initializes deadbolt - loads in form elements with corresponding varifications. / Returns: (deadbolt) */
	/* _tester: Tests an element with its varifications to see if it passes. / Returns: (True / False) */
    deadbolt.fn = deadbolt.prototype = {
        _init: function(form, options) {
            if(options !== undefined)
            {
                for(var key in options)
                    validators[key] = options[key];
            }

            $(form).find("[data-valid]").each(function() {
                var what = ($(this).data("valid").indexOf(",") > 0)? $(this).data("valid").split(",") : [$(this).data("valid")];
                var validation = [];

                for (var i = 0; i < what.length; i++) {
                    for (var key in validators) {
                        if (what[i].match(new RegExp(key, "i")))
                        {
                            validation.push(validators[key](what[i].split("=")[1]));
                        }
                    }
                }
                queue.push(new Array($(this), validation));
            });

            return deadbolt;
        },
        _tester: function(what, validator) {
            for (var i = 0; i < validator.length; i++) {
                if (!validator[i].test(what.val())) {
                    what.parent().addClass("has-error").removeClass("has-success");
                    return false;
                }
            }
            what.parent().removeClass("has-error").addClass("has-success");

            return true;
        },
        _addRule: function(rule) {

            return deadbolt;
        }
    };

	/* External Functions */
    deadbolt.isValid = deadbolt.prototype = function() {
        var tempBool = true;
        for (var i = 0; i < queue.length; i++) {
            if (deadbolt.fn._tester(queue[i][0], queue[i][1]) === false)
                tempBool = false;
        }

        return tempBool;
    }

    return deadbolt;
})(jQuery);
