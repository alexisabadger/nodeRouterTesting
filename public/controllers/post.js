wikiApp.controller("postController", function($scope, $http, $routeParams) {
  // Controller for post view

  // CKEditor
  ClassicEditor.create(document.querySelector('#editor'), {
    toolbar: {
      items: ['heading', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', 'todoList', '|', 'outdent', 'indent', 'alignment', '|', 'blockQuote', 'insertTable', 'imageInsert', 'mediaEmbed', 'undo', 'redo', '|', 'code', 'codeBlock', 'htmlEmbed', 'MathType', 'ChemType', 'strikethrough', 'subscript', 'superscript', 'horizontalLine'],
      shouldNotGroupWhenFull: true
    },
    mediaEmbed: {
      previewsInData: true
    },
    language: 'en',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
    },
    licenseKey: '',
  })
  .then(editor => {
    window.editor = editor;
    editorReady();
  })
  .catch( error => {
    console.error('Oops, something went wrong!');
    console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
    console.warn('Build id: bojh7pnw6nnm-dfpekd22znn5');
    console.error(error);
  });

  // This function is called when the editor is ready (Your GET logic should go here)
  function editorReady(editor) {

    $scope.save = function() {
        $http.get('/api/getdummy', {
              content: $scope.test
              }).success(function() {
                 alert('Saved');
               });
        }

    window.editor.setData("NA");
  }

  // This function returns the HTML contents of the editor (Call this during your POST/PUT operations)
  function getHtml() {

    return window.editor.getData();
  }

// *** End Controller ***
});