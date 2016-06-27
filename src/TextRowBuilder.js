define(['underscore', 'Formatable', 'Styleable', 'Alignable', 'MarginConfigurable', 'SubText'],
function (_, Formatable, Styleable, Alignable, MarginConfigurable, SubText) {
    'use strict';

    function TextRowBuilder(textBuilder) {
        this.object = {
            text: []
        };
        this.textBuilder = textBuilder;
        this.textBuilder.pushStack(this.object);
    }

    _.extend(
        TextRowBuilder.prototype,
        Formatable.prototype,
        Styleable.prototype,
        Alignable.prototype,
        MarginConfigurable.prototype
    );

    TextRowBuilder.prototype.push = function (objeto) {
        this.object.text.push(objeto);
    };

    TextRowBuilder.prototype.subText = function (text) {
        var subText = new SubText(this, text);

        return subText;
    };

    TextRowBuilder.prototype.indent = function () {
        var spaces = '\b\b\b\b\b\b\b\b';
        this.object.text.splice(0, 0, spaces);

        return this;
    };


    return TextRowBuilder;
});
