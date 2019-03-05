var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var soundClips = document.querySelector('.sound-clips');
const video = document.querySelector('video');

function hasGetUserMedia() {
  return !!(
    navigator.mediaDevices
    && navigator.mediaDevices.getUserMedia
  );
}

if (hasGetUserMedia()) {
  console.log('getUserMedia supported.');
  navigator.mediaDevices.getUserMedia ({audio: true, video: true})
    // Success callback
    .then(function(stream) {
      var mediaRecorder = new MediaRecorder(stream);

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
        var sendToYoutube = document.createElement('button');
                 
        clipContainer.classList.add('clip');
        video.setAttribute('controls', '');
        deleteButton.innerHTML = "Delete";
        sendToYoutube.innerHTML = "Send to Youtube";
        clipLabel.innerHTML = clipName;
      
        clipContainer.appendChild(video);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        clipContainer.appendChild(sendToYoutube);
        soundClips.appendChild(clipContainer);
      
        var blob = new Blob(chunks, {'type' : 'video/ogg; codecs=opus'});
        chunks = [];
        var videoURL = window.URL.createObjectURL(blob);
        console.log("videoURL:", videoURL);
        video.src = videoURL;
      
        deleteButton.onclick = function(e) {
          var evtTgt = e.target;
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        }

        sendToYoutube.onclick = function(e) {
          console.log("send to youtube clicked");
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

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// function hasGetUserMedia() {
//   return !!(navigator.mediaDevices &&
//     navigator.mediaDevices.getUserMedia);
// }

// if (hasGetUserMedia()) {
//   console.log("has getUserMedia");
// } else {
//   console.log("doesnt have getUserMedia");
// }

// const constraints = {
//   video: true,
//   audio: true
// };

// const video = document.querySelector('video');

// navigator.mediaDevices.getUserMedia(constraints).
//   then((stream) => {video.srcObject = stream});