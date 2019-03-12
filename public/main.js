var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var soundClips = document.querySelector('.sound-clips');

function hasGetUserMedia() {
  return !!(
    navigator.mediaDevices
    && navigator.mediaDevices.getUserMedia
  );
}

if (hasGetUserMedia()) {
  console.log('getUserMedia supported.');
  navigator.mediaDevices.getUserMedia ({
    video: true,
    audio: true
  })
    // Success callback
    .then(function(stream) {
      var options = {mimeType: 'video/webm; codecs=vp9'};
      var mediaRecorder = new MediaRecorder(stream, options);
      let blob;

      record.onclick = function() {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        record.style.background = "red";
        record.style.color = "black";
      }

      stop.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        record.style.background = "";
        record.style.color = "";
      }

      var chunks = [];
      
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
        console.log("chunks:", chunks);
      }

      mediaRecorder.onstop = function(e) {
        console.log("recorder stopped");
      
        var clipName = prompt('Enter a name for your sound clip');
      
        var clipContainer = document.createElement('article');
        var clipLabel = document.createElement('p');
        var video = document.createElement('video');
        var deleteButton = document.createElement('button');
        var sendToVimeo = document.createElement('button');
        var sendToYoutube = document.createElement('button');
                 
        clipContainer.classList.add('clip');
        video.setAttribute('controls', '');
        deleteButton.innerHTML = "Delete";
        sendToVimeo.innerHTML = "Send to Vimeo";
        sendToYoutube.innerHTML = "Send to Youtube";
        clipLabel.innerHTML = clipName;
      
        clipContainer.appendChild(video);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        clipContainer.appendChild(sendToVimeo);
        soundClips.appendChild(clipContainer);
      
        blob = new Blob(chunks, {type: 'video/webm'});
        chunks = [];
        video.src = window.URL.createObjectURL(blob);
        video.width = "640";
        console.log("video:", video);
      
        deleteButton.onclick = function(e) {
          var evtTgt = e.target;
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        }

        sendToVimeo.onclick = function(e) {
          var uploader = new VimeoUpload({
            file: blob,
            token: "0000"
          });

          console.log("uploader:", uploader);
          console.log("uploader.upload:", uploader.upload);
          
          uploader.upload();
        }

        sendToYoutube.onclick = function(e) {

        }
      }
    })

     // Error callback
    .catch(function(err) {
      console.log('The following getUserMedia error occured: ' + err);
    }
  );
} else {
  console.log('getUserMedia not supported on your browser!');
}
