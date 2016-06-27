
define(['underscore', 'Formatable', 'Styleable'], function (_, Formatable, Styleable) {


    function SubText(textRowBuilder, text) {
        this.object = {
            text: String(text)
        };

        textRowBuilder.push(this.object);
    }

    _.extend(
        SubText.prototype,
        Formatable.prototype,
        Styleable.prototype
    );

    return SubText;
});
