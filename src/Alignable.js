
define([], function () {
    'use strict';

    function Alignable() {
    }

    Alignable.prototype.justify = function () {
        this.object.alignment = 'justify';
        return this;
    };

    Alignable.prototype.center = function () {
        this.object.alignment = 'center';
        return this;
    };

    Alignable.prototype.left = function () {
        this.object.alignment = 'left';
        return this;
    };

    Alignable.prototype.right = function () {
        this.object.alignment = 'right';
        return this;
    };

    return Alignable;
});
