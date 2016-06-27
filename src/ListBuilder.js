
define([], function () {
    'use strict';


    function ListBuilder(type) {
        this.object = {};
        this.object[type] = [];
        this.type = type;
    }

    ListBuilder.prototype.addText = function (text) {
        this.object[this.type].push({
            text: text + ''
        });

        return this;
    };

    ListBuilder.prototype.addList = function (type, callback) {
        var listBuilder = new ListBuilder(type);
        this.object[this.type].push(listBuilder.object);

        callback(listBuilder);

        return this;
    };

    return ListBuilder;
});
