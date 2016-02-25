var _L = (function () {
	"use strict";

	var slice = [].slice;

	return {

		/**
		 * Performs right to left function composition
		 * @method compose
		 * @return {Function}
		 */
		compose: function () {
			return this.pipe.apply(null, slice.call(arguments).reverse());
		},

		/**
		 * Create a curried function
		 * @method curry
		 * @return {Function}
		 */
		curry: function (func) {
			return function curried() {
				var args = slice.call(arguments);
				if (args.length < func.length) {
					return function () {
						return curried.apply(null, args.concat(slice.call(arguments)));
					};
				}
				return func.apply(null, args);
	    	};
		},

		/**
		 * Returns a function for performing a forking operation
		 * Also known as "converge"
		 * @method fork
		 * @return {Function}
		 */
		fork: function (lastly, func1, func2) {
			return this.partial(function (lastly, func1, func2, val) {
				return lastly(func1(val), func2(val));
			})(lastly, func1, func2);
		},

		/**
		 * Create a partially applied function
		 * @method partial
		 * @return {Function}
		 */
		partial: function (func) {
			return this.curry(func).apply(this, slice.call(arguments, 1));
		},

		/**
		 * Performs left to right function composition
		 * @method compose
		 * @return {Function}
		 */
		pipe: function () {
			var funcs = slice.call(arguments);
			return function() {
				var result,
					args = slice.call(arguments);
				funcs.forEach(function (func, i) {
					result = (i === 0) ? func.apply(null, args) : func.call(null, result);
				});
				return result;
			};
		},

		/**
		 * Returns the previous index in an array in a cyclic manner
		 * @method previousIndex
		 * @param {Array} arr
		 * @param {Number} index
		 * @return {Number}
		 */
		previousIndex: function (arr, index) {
			return (index + arr.length - 1) % arr.length;
		},

		/**
		 * Returns the next index in an array in a cyclic manner
		 * @method nextIndex
		 * @param {Array} arr
		 * @param {Number} index
		 * @return {Number}
		 */
		nextIndex: function (arr, index) {
			return (index + 1) % arr.length;
		},

		/**
		 * Returns the previous element in an array in a cyclic manner
		 * @method previous
		 * @param {Array} arr
		 * @param {Number} index
		 */
		previous: function (arr, index) {
			return arr[this.previousIndex(arr, index)];
		},

		/**
		 * Returns the next element in an array in a cyclic manner
		 * @method next
		 * @param {Array} arr
		 * @param {Number} index
		 */
		next: function (arr, index) {
			return arr[this.nextIndex(arr, index)];
		},

		/**
		 * Returns the last element in an array
		 * @method last
		 * @param {Array} arr
		 */
		last: function (arr, index) {
			return arr[arr.length - 1];
		}

	};

}());

module.exports = _L;