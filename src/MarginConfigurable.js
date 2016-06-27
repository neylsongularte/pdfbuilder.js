

define(['underscore'], function (_) {
    'use strict';

    function MarginConfigurable() {
    }

    MarginConfigurable.prototype.setupMargin = function () {
        if(!_.isArray(this.object.margin)) {
            this.margin([0, 0, 0, 0]);
        }
        return this;
    };

    MarginConfigurable.prototype.margin = function (marginArray) {
        this.object.margin = marginArray;
        return this;
    };

    MarginConfigurable.prototype.marginLeft = function (marginLeft) {
        this.setupMargin().object.margin[0] = marginLeft;
        return this;
    };

    MarginConfigurable.prototype.marginTop = function (marginTop) {
        this.setupMargin().object.margin[1] = marginTop;
        return this;
    };

    MarginConfigurable.prototype.marginRight = function (marginRight) {
        this.setupMargin().object.margin[2] = marginRight;
        return this;
    };

    MarginConfigurable.prototype.marginBottom = function (marginBottom) {
        this.setupMargin().object.margin[3] = marginBottom;
        return this;
    };

    return MarginConfigurable;
});
