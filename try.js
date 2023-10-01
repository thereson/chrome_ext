async function video() {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });

  let audio = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  });

  let mixedstream = new MediaStream([
    ...stream.getTracks(),
    ...audio.getTracks(),
  ]);
  let recorder = new MediaRecorder(mixedstream);
  recorder.start();
  let buffer = [];

  recorder.ondataavailable = (res) => {
    buffer.push(res.data);
  };

  recorder.onstop = (e) => {
    let f = new File(buffer, "file.mp4", { type: "video/mp4" });
    let blob = new Blob(buffer, {
      type: "video/mp4",
    });

    let form = new FormData();
    form.append("mfile", blob, "file.mp4");
    console.log(form);
    fetch("http://localhost:9000/api", { method: "POST", body: form })
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        console.log(res);
      });
  };

  setTimeout(() => {
    recorder.stop();
  }, 10000);
}

video();
