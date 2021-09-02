<template>
  <div>
    <div id='barcodeField'>
      <h1>読み取られたバーコード: {{ barcode }}</h1>
    </div>
    <description-part></description-part>
    <CameraPart @response='getResponse' v-bind:loadedFlag='this.loaded' />
    <HealthScorePart v-bind:healthData='this.responseObj' />
  </div>
</template>

<script>
import CameraPart from './components/CameraPart.vue'
import HealthScorePart from './components/HealthScorePart.vue'
import Quagga from 'quagga';
import DescriptionPart from './components/DescriptionPart.vue';

export default {
  name: 'App',
  components: {
    CameraPart,
    DescriptionPart,
    HealthScorePart
  },
  data: function() {
    return {
      responseObj: '',
      // cameraWidth: 640,
      cameraWidth: 320,
      // cameraHeight: 480,
      cameraHeight: 220,
      constrains: {
        decodeBarCodeRate: 3,
        successTimeout: 500,
        codeRepetition: true,
        tryVertical: true,
        frameRate: 15,
        width: this.cameraWidth,
        height: this.cameraHeight,
        facingMode: "environment"
      },
      loadCameraConstrains: {
        audio: false,
        // video: true
          video: {
            // width: 640,
            width: 320,
            // height: 480,
            height: 220,
          }
      },
      loaded: false
    };
  },
  computed: {
    video: function() {
      return document.querySelector('#cameraDemo');
    }
  },
  watch: {
    barcodeWatcher: function(eve) {
      console.log(eve);
    }
  },
  mounted: function() {
    this.startCamera();
    this.loadCamera();
  },
  methods: {
    startCamera: function() {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#cameraDemo'),
          constrains:  {
            decodeBarCodeRate: 3,
            successTimeout: 500,
            codeRepetition: true,
            tryVertical: true,
            frameRate: 15,
            width: 480,
            height: 220,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: ['ean_reader']
        }
      },
      function(err) {
        if (err) {
          console.log(err);
          return
        }
        console.log('Initialize was completed.');
        Quagga.start();
      })

      Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            result.boxes.filter(function (box) {
                return box !== result.box;
            }).forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
            });
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
          }
        }
      });

      Quagga.onDetected(function(result) {
        console.log(result.codeResult);
        if (result.codeResult) {
          console.log(result.codeResult.code);
          var barcodeFiled = document.querySelector('#barcodeField');
          barcodeFiled.innerHTML = `<h1>読み取られたコード: ${result.codeResult.code}</h1>`;
        }
      });

    },
    loadCamera: function() {
      let camera = document.getElementsByTagName('video')[0];
      const setting = {
        audio: false,
        // video: true
          video: {
            // width: 640,
            width: 320,
            // height: 480,
            height: 220,
          }
      }
      navigator.mediaDevices.getUserMedia(setting)
        .then(((stream)=>{
          camera.srcObject = stream;
          onloadedmetadata = () => { camera.play };
        })).catch(((err)=>{ console.log(err) }))
      this.loaded = true;
      console.log(this.loaded);
    },
    resizeToCameraWidth: function() {
    },
    getResponse: function(response) {
      this.responseObj = response;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#cameraDemo > video {
  position: relative;
  /* width: 640px; */
  width: 320px;
  /* height: 480px; */
  height: 240px;
}
.drawingBuffer {
  position: absolute;
  margin-left: -320px;
  /* width: 640px; */
  width: 320px;
  /* height: 480px; */
  height: 240px;
}
#canvas {
  border: solid black 1px;
  /* width: 640px; */
  /* width: 320px; */
  /* height: 480px; */
  /* height: 240px; */
}
@media screen and (max-width: 480px) {
  .drawingBuffer {
  }
}
</style>
