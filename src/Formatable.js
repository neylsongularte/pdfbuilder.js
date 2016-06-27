
define([], function () {
    'use strict';

    function Formatable() {
    }

    Formatable.prototype.fontSize = function (fontSize) {
        this.object.fontSize = fontSize;
        return this;
    };

    Formatable.prototype.bold = function () {
        this.object.bold = true;
        return this;
    };

    Formatable.prototype.italics = function () {
        this.object.italics = true;
        return this;
    };

    return Formatable;
});
