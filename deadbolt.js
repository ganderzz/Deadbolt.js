var isValid = (function() {

	/*
		The MIT License (MIT)

		Copyright (c) 2015 Dylan Paulus

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in
		all copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
		THE SOFTWARE.
	*/

	var queue = [];

	function isValid(form) {
		return new isValid.fn.init(form);
	}

	isValid.fn = isValid.prototype = {
		init: function(form) {
			$(form).find("[data-valid]").each(function() {
				var what = ($(this).data("valid").indexOf(",") > 0)? $(this).data("valid").split(",") : [$(this).data("valid")];
				var validation = [];

				for(var i = 0; i < what.length; i++)
				{
					if(what[i].match(/email/i))
						validation.push(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

					if(what[i].match(/minLength/i))
						validation.push(new RegExp("^(.+){"+what[i].split("=")[1]+",}$", "i"));

					if(what[i].match(/not/i))
						validation.push(new RegExp("^((?!"+what[i].split("=")[1]+").)*$", "i"));

					if(what[i].match(/digit/i))
						validation.push(new RegExp("^[0-9,\-]+$", "i"));

				}
				queue.push(new Array($(this), validation));
			});

			return isValid;
		},
		tester: function(what, validator) {
				for(var i = 0; i < validator.length; i++)
				{
					if(!validator[i].test( what.val()) )
					{
						what.parent().addClass("has-error").removeClass("has-success");
						return false;
					}
				}
				what.parent().removeClass("has-error").addClass("has-success");

				return true;
			}
		};

		isValid.checkAll = isValid.prototype = function() {
			var temp = true;
				for(var i = 0; i < queue.length; i++)
				{
					if(isValid.fn.tester(queue[i][0], queue[i][1]) === false)
						temp = false;
				}

			return temp;
		}

	return isValid;
})(jQuery);
