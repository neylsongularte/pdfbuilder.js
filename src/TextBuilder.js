
define(['underscore', 'Formatable', 'Alignable', 'Styleable', 'MarginConfigurable', 'TextRowBuilder'],
    function (_, Formatable, Alignable, Styleable, MarginConfigurable, TextRowBuilder) {


    function TextBuilder(pdfBuilderJS) {
        this.object = {
            stack: []
        };

        this.pdfBuilderJS = pdfBuilderJS;
        this.pdfBuilderJS.add(this.object);
    }

    _.extend(
        TextBuilder.prototype,
        Formatable.prototype,
        Alignable.prototype,
        Styleable.prototype,
        MarginConfigurable.prototype
    );

    TextBuilder.prototype.getStack = function () {
        return this.object.stack;
    };

    TextBuilder.prototype.pushStack = function (item) {
        this.getStack().push(item);
        return this;
    };

    TextBuilder.prototype.getLastItem = function () {
        return _.last(this.getStack());
    };

    TextBuilder.prototype.textRow = function (textOrCallback) {
        var textRowBuilder = new TextRowBuilder(this);

        if(_.isFunction(textOrCallback)) {
            textOrCallback(textRowBuilder);
            return this;
        }

        textRowBuilder.subText(textOrCallback);
        return textRowBuilder;
    };

    TextBuilder.prototype.html = function (text) {

        var buffer = '';
        var openTag = false;
        var closeTag = false;
        var tagname = '';
        var stylesInline = [];
        var type;

        _.each(text, function (char) {

            if(openTag && char == '/') {
                closeTag = true;
            } else if (openTag && char == '>') {
                type = this.pdfBuilderJS.docDefinition.styles[tagname].type;

                switch (type) {
                    case 'inline':
                        if(closeTag)
                            stylesInline.pop();
                        else
                            stylesInline.push(tagname);
                        break;

                    case 'stack-item':
                        if(closeTag) {
                            this.addStackItem();
                        } else {
                            var item = this.addStackItem();
                            item.style = tagname;
                        }
                        break;

                    default:
                        throw "style type is invalid";

                }

                tagname = '';
                openTag = false;
                closeTag = false;
            } else if (openTag) {
                tagname += char;
            } else if (char == '<') {
                openTag = true;

                if (buffer) {
                    var object = _.extend({}, this.pdfBuilderJS.mergeStyles(stylesInline));
                    object.text = buffer;

                    this.add(object);
                }
                buffer = '';
            } else {
                buffer += char;
            }

        }, this);

        this.add(buffer);
        // console.log(this.pdfBuilderJS.docDefinition);
        return this;
    };

    return TextBuilder;
});
