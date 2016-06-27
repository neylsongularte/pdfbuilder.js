
define([], function () {
    'use strict';

    function RowBuilder() {
        this.object = {
            columns: [],
            margin: [0, 0, 0, 0]
        };
    }

    RowBuilder.prototype.column = function (cb) {
    };

    return RowBuilder;
});
