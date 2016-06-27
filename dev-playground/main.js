require.config({
    baseUrl : '../src',
    paths: {
        'underscore': '/bower_components/underscore/underscore-min',
        'PdfBuilderJS': 'PdfBuilderJS',
        'pdfmake' : '/bower_components/pdfmake/build/vfs_fonts',
        'pdfMakeLib' : '/bower_components/pdfmake/build/pdfmake.min'
    },
    shim: {
        pdfMakeLib: {
            exports: 'pdfMake'
        },
        pdfmake: {
            deps: ['pdfMakeLib'],
            exports: 'pdfMake'
        },
   }
});

require(['PdfBuilderJS'], function (PdfBuilderJS) {

    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        matchBrackets: true,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        theme: 'icecoder'
    });
    var run = document.getElementById('run');
    run.addEventListener('click', function (e) {
        gerarPdf();
    });

    gerarPdf();


    function gerarPdf() {
        var code = editor.getValue();

        eval(code);

        pdf.getDataUrl(function (dataUrl) {
            document.getElementById('viewer').setAttribute('data', dataUrl);
        });
    }
});
