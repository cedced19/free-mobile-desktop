!function(e,t,n){function r(e,t,r){if(s.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=f++),-1==t.firedElems.indexOf(e._id))){if(t.options.onceOnly){if(0!==t.firedElems.length)return;t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback)}t.firedElems.push(e._id),r.push({callback:t.callback,elem:e})}}function i(e,t,n){for(var o,c=0;o=e[c];c++)r(o,t,n),0<o.childNodes.length&&i(o.childNodes,t,n)}function o(e){for(var t,n=0;t=e[n];n++)t.callback.call(t.elem)}function c(e,t){e.forEach(function(e){var n=e.addedNodes,c=e.target,u=[];null!==n&&0<n.length?i(n,t,u):"attributes"===e.type&&r(c,t,u),o(u)})}function u(e,t){e.forEach(function(e){e=e.removedNodes;var n=[];null!==e&&0<e.length&&i(e,t,n),o(n)})}function l(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t}function a(){return{childList:!0,subtree:!0}}function d(e){e.arrive=b.bindEvent,s.addMethod(e,"unbindArrive",b.unbindEvent),s.addMethod(e,"unbindArrive",b.unbindEventWithSelectorOrCallback),s.addMethod(e,"unbindArrive",b.unbindEventWithSelectorAndCallback),e.leave=p.bindEvent,s.addMethod(e,"unbindLeave",p.unbindEvent),s.addMethod(e,"unbindLeave",p.unbindEventWithSelectorOrCallback),s.addMethod(e,"unbindLeave",p.unbindEventWithSelectorAndCallback)}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var f=0,s=function(){var e=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(t,n){return t instanceof HTMLElement&&e.call(t,n)},addMethod:function(e,t,n){var r=e[t];e[t]=function(){return n.length==arguments.length?n.apply(this,arguments):"function"==typeof r?r.apply(this,arguments):void 0}}}}(),v=function(){var e=function(){this._eventsBucket=[],this._beforeRemoving=this._beforeAdding=null};return e.prototype.addEvent=function(e,t,n,r){return e={target:e,selector:t,options:n,callback:r,firedElems:[]},this._beforeAdding&&this._beforeAdding(e),this._eventsBucket.push(e),e},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)e(t)&&(this._beforeRemoving&&this._beforeRemoving(t),this._eventsBucket.splice(n,1))},e.prototype.beforeAdding=function(e){this._beforeAdding=e},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e},e}(),h=function(t,n,r){function i(e){return"number"!=typeof e.length&&(e=[e]),e}var o=new v,c=this;return o.beforeAdding(function(n){var i,o=n.target;(o===e.document||o===e)&&(o=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n)});var u=t(n.options);i.observe(o,u),n.observer=i,n.me=c}),o.beforeRemoving(function(e){e.observer.disconnect()}),this.bindEvent=function(e,t,r){if("undefined"==typeof r)r=t,t=n;else{var c,u={};for(c in n)u[c]=n[c];for(c in t)u[c]=t[c];t=u}for(c=i(this),u=0;u<c.length;u++)o.addEvent(c[u],e,t,r)},this.unbindEvent=function(){var e=i(this);o.removeEvent(function(t){for(var n=0;n<e.length;n++)if(t.target===e[n])return!0;return!1})},this.unbindEventWithSelectorOrCallback=function(e){var t=i(this);o.removeEvent("function"==typeof e?function(n){for(var r=0;r<t.length;r++)if(n.target===t[r]&&n.callback===e)return!0;return!1}:function(n){for(var r=0;r<t.length;r++)if(n.target===t[r]&&n.selector===e)return!0;return!1})},this.unbindEventWithSelectorAndCallback=function(e,t){var n=i(this);o.removeEvent(function(r){for(var i=0;i<n.length;i++)if(r.target===n[i]&&r.selector===e&&r.callback===t)return!0;return!1})},this},b=new h(l,{fireOnAttributesModification:!1,onceOnly:!1},c),p=new h(a,{},u);t&&d(t.fn),d(HTMLElement.prototype),d(NodeList.prototype),d(HTMLCollection.prototype),d(HTMLDocument.prototype),d(Window.prototype)}}(this,"undefined"==typeof jQuery?null:jQuery,void 0);