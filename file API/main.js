/**
 * Created by user on 24.10.16.
 */

// function handleFileSelect(evt) {
//     var files = evt.target.files;
//     var file = files[0];
//     var reader = new FileReader();
//     var img;
//     reader.onload = (function() {
//         return function(e) {
//             img = '<img class="thumb" src="' + e.target.result +'" />';
//             document.getElementById('list').innerHTML = img;
//         };
//     })(file);
//     reader.readAsDataURL(file);
// }
// document.getElementById('files').addEventListener('change', handleFileSelect, false);


// create with createObjectURL


//
// function handleFiles(file) {
//
//     var  fileList = document.getElementById("list");
//     for (var i = 0; i < file.length; i++) {
//
//         var img = document.createElement("img");
//         img.src = window.URL.createObjectURL(file[i]);
//         img.classList.add('thumb');
//         img.onload = function() {
//             window.URL.revokeObjectURL(this.src);
//         }
//         fileList.appendChild(img);
//     }
// }
// document.getElementById('files').addEventListener('change', handleFiles, false);



function handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = (function() {
        return function(e) {

            var dataUri = e.target.result,
                context = document.getElementById("myCanvas").getContext("2d"),

                img     = new Image();

            img.onload = function() {
                context.drawImage(img, 0, 0, 300, 150);

                var imageData = context.getImageData(0, 0, 300, 300),
                    imageDataFiltered = sepia(imageData);
                context.putImageData(imageDataFiltered, 0, 0);
            };
            img.src = dataUri;

        };
    })(file);
    var sepia = function (imageData) {
        var filtr = document.getElementById("fileSelect");
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            var grayscale = pixels[i ] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11;
            pixels[i ] = grayscale; // red
            pixels[i+1] = grayscale; // green
            pixels[i+2] = grayscale; // blue
        }
        return imageData;
    };

    reader.readAsDataURL(file);
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
