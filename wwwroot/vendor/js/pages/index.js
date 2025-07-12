/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/pages/index.js":
/*!*******************************!*\
  !*** ./src/js/pages/index.js ***!
  \*******************************/
/***/ (() => {

eval("function _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nvar map;\nfunction initMap() {\n  // const jakarta = { lat: 0.5, lng: 110 };\n  var jakarta = {\n    lat: -3.8004,\n    lng: 102.2655\n  };\n\n  // Inisialisasi peta\n  map = new google.maps.Map(document.getElementById(\"map\"), {\n    zoom: 8,\n    center: jakarta,\n    gestureHandling: 'greedy',\n    // Mengizinkan zoom menggunakan scroll\n    // mapTypeId: google.maps.MapTypeId.HYBRID,\n    mapTypeId: google.maps.MapTypeId.ROADMAP,\n    mapTypeControlOptions: {\n      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,\n      position: google.maps.ControlPosition.BOTTOM_LEFT // Pindahkan ke bawah kiri\n    },\n    styles: [{\n      featureType: \"administrative.locality\",\n      // Nama kota\n      elementType: \"labels\",\n      stylers: [{\n        visibility: \"off\"\n      }]\n    }, {\n      featureType: \"administrative.neighborhood\",\n      // Nama kelurahan\n      elementType: \"labels\",\n      stylers: [{\n        visibility: \"off\"\n      }]\n    }, {\n      featureType: \"poi\",\n      // Tempat umum\n      elementType: \"labels\",\n      stylers: [{\n        visibility: \"off\"\n      }]\n    }, {\n      featureType: \"road\",\n      elementType: \"labels\",\n      stylers: [{\n        visibility: \"off\"\n      }]\n    }, {\n      featureType: \"transit\",\n      elementType: \"labels\",\n      stylers: [{\n        visibility: \"off\"\n      }]\n    }, {\n      featureType: \"administrative.province\",\n      // Nama provinsi\n      elementType: \"labels\",\n      stylers: [{\n        visibility: \"on\"\n      }]\n    }]\n  });\n  var geocoder = new google.maps.Geocoder();\n  geocoder.geocode({\n    location: jakarta\n  }, function (results, status) {\n    if (status === \"OK\" && results[0]) {\n      var province = '';\n      var _iterator = _createForOfIteratorHelper(results[0].address_components),\n        _step;\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var component = _step.value;\n          if (component.types.includes(\"administrative_area_level_1\")) {\n            province = component.long_name;\n            break;\n          }\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n      var infowindow = new google.maps.InfoWindow({\n        content: \"<strong>\".concat(province, \"</strong>\")\n      });\n      infowindow.open(map);\n    }\n  });\n}\n\n//# sourceURL=webpack://sneat-bootstrap-html-aspnet-core-mvc-admin-template-free/./src/js/pages/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/pages/index.js"]();
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});