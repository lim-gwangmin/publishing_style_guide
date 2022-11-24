$(function() {
   var FILE_ARG = 'file_arg';
   var $inputFile = $('input[type=file]');

/* ===========================================================================================
 file upload
=========================================================================================== */
   $inputFile.on('change', function(e) {
      var $target = $(e.target);
      var files = e.target.files;
      var dataSet = $target.attr('data-fileInput');
      var maxLength = $target.attr('data-fileLength');
      var $fileNameDOM = $('.file_name[data-fileInput='+dataSet+']');
      var multiple = true;

      if(!files.length) return;

      $fileNameDOM.children('.' + FILE_ARG).remove();

      Array.prototype.forEach.call(files, function(arg, index) {
         if( maxLength !== undefined && maxLength < index + 1) {
            multiple = false;
            return;
         };

         var fileDom = '<span class="'+ FILE_ARG +'">'+ arg.name +'</span>';

         $fileNameDOM.append(fileDom);
      });
      
      if(!multiple) {
         alert('파일업로드 갯수는' + maxLength + '까지 입니다.');
      }
   });
});


/* ===========================================================================================
   debounce
=========================================================================================== */
function debounce(callback, limit = 100) {
   var timeout = null;
   return function(args) {
       clearTimeout(timeout);
       timeout = setTimeout(function() {
           callback.apply(this, args)
       }, limit);
   };
};
/* ===========================================================================================
   throttle
=========================================================================================== */
function throttle(callback, limit = 100) {
    var waiting = false;
    return function() {
        if(!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(() => {
                waiting = false;
            }, limit);
        }
    }
}