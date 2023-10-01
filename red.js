navigator.mediaDevices
  .getDisplayMedia({
    video: true,
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: true,
    },
  })
  .then((data) => {
    let buffer = [];
    let recorder = new MediaRecorder(data);
    recorder.start();

    recorder.ondataavailable = (stream) => {
      console.log(stream);
      buffer.push(stream.data);
    };

    recorder.onstop = (e) => {
      let f = new File(buffer, "file.mp4", { type: "video/mp4" });
      let blob = new Blob(buffer, {
        type: "video/mp4",
      });

      let form = new FormData();
      form.append("mfile", blob, "file.mp4");
      console.log(form);
      fetch("http://localhost:9000/api", { method: "POST", body: form }).then(
        (resp) => {
          return resp.json();
        }
      );
    };
  });
