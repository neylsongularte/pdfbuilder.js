
// dependencies pdfmake and underscore.js

define(['underscore', 'pdfmake', 'TextBuilder'], function (_, pdfMake, TextBuilder) {

    function PdfBuilderJS() {
        this.docDefinition = null;

        this.init();
    }

    PdfBuilderJS.DEFAULTS = {
        downloadName: 'download.pdf'
    };

    PdfBuilderJS.prototype.init = function () {
        this.docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [20, 20, 20, 20],
            content: [],
            styles: {
                p: {
                    margin: [0, 0, 0, 5]
                },
                b: {
                    bold: true
                },
                i: {
                    italics: true
                },
                h1: {
                    fontSize: 32,
                    bold: true,
                    margin: [0, 15]
                },
                h2: {
                    fontSize: 24,
                    bold: true,
                    margin: [0, 10]
                },
                h3: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 10]
                },
                h4: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 5]
                },
            }
        };
    };

    PdfBuilderJS.prototype.pageOrientation = function (pageOrientation) {
        this.docDefinition.pageOrientation = pageOrientation;

        return this;
    };

    PdfBuilderJS.prototype.addStyle = function (name, styleObject) {
        this.docDefinition.styles[name] = styleObject;
        return this;
    };

    PdfBuilderJS.prototype.make = function () {
        return pdfMake.createPdf(this.docDefinition);
    };

    PdfBuilderJS.prototype.open = function () {
        this.make().open();
        return this;
    };

    PdfBuilderJS.prototype.openPopup = function () {

        this.make().getDataUrl(function (dataUrl) {
            window.open(dataUrl, 'window', 'width=800, height=600, scrollbars=yes');
        });

        return this;
    };

    PdfBuilderJS.prototype.getDataUrl = function (callback) {
        this.make().getDataUrl(callback);
    };

    PdfBuilderJS.prototype.print = function () {
        this.make().print();
        return this;
    };

    PdfBuilderJS.prototype.download = function (filename) {
        filename = filename || PdfBuilderJS.DEFAULTS.downloadName;

        this.make().download(filename);
        return this;
    };

    PdfBuilderJS.prototype.breakPage = function () {
        this.docDefinition.content.push({
            text: '',
            pageBreak: 'before'
        });

        return this;
    };

    PdfBuilderJS.prototype.mergeStyles = function (styles) {
        var merged = {};

        _.each(styles, function (style) {
            _.extend(merged, this.docDefinition.styles[style]);
        }, this);

        return merged;
    };

    PdfBuilderJS.prototype.add = function (object) {
        this.docDefinition.content.push(object);

        return this;
    };

    // PdfBuilderJS.prototype.row = function (cb) {
    //     var row = new RowBuilder();
    //     this.add(row.object);
    //
    //     cb(row);
    //
    //     return this;
    // };

    PdfBuilderJS.prototype.text = function (textOrCallback) {
        var textBuilder = new TextBuilder(this);

        if(_.isFunction(textOrCallback)) {
            textOrCallback(textBuilder);
            return this;
        }

        return textBuilder.textRow(textOrCallback);
    };

    PdfBuilderJS.prototype.html = function (text) {
        var builder = new TextBuilder(this, text);
        this.add(builder.object);

        return builder;
    };

    return PdfBuilderJS;
});
