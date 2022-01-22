import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from "react"
React.useLayoutEffect = React.useEffect

/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  }
}