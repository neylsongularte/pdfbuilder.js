

define([], function () {
    'use strict';
    

    function Styleable() {
    }

    Styleable.prototype.style = function (styleName) {
        this.object.style = styleName;
        return this;
    };

    return Styleable;
});
