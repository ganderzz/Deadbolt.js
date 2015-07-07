var isValid = (function() {
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

