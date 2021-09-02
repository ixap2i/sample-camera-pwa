<template>
  <div>
    <div class='cameraSpace'>
      <div class='buttonGroup'>
        <button type="button" class="btn btn-default" id='shutter' v-on:click='snapCamera()'>
          Cheese!
        </button>
        <button type="button" class="btn btn-default" v-on:click='refreshPage()'>
          Refresh
        </button>
      </div>

      <div id='cameraDemo'></div>
      <video id='video' autoplay muted playsinline></video>

      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraPart',
  props: {
    msg: String,
    barcode: String,
    cloudVisionUrl: {
      type: String,
      default: function() {
        return 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD6zE1TyBncQGocEqknyy70oGUn7hmmxAY';
      }
    },
    coronaLabUrl: {
      type: String,
      default: function() {
        return 'https://dev.lahmu-cdn-web.food-score.tech/api/v1/temporary_scores';
      }
    },
    headers: {
      type: Array,
      default: function() {
        return ['Content-Type', 'application/json'];
      }
    },
    loadedFlag: Boolean
  },
  mounted: function() {
  },
  methods: {
    snapCamera: function() {
      console.log(this.loadedFlag);
      if(this.loadedFlag) {
        const camera = document.getElementsByTagName('video')[0]
        const canvas = document.querySelector('#canvas')

        const ctx = canvas.getContext('2d');

        camera.pause();
        setTimeout(() => {
          camera.play();
        }, 500)

        ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);

        this.sendImage(canvas);
      }
    },
    sendImage: function(canvas) {
      //画像をBase64に変換する
      var sendImage = this.pasteSnappedImage(canvas);

      let body = {
        requests: [
          {image: {content: sendImage}, features: [{type: 'TEXT_DETECTION'}]}
        ]
      };
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.cloudVisionUrl, true);

      xhr.onreadystatechange = () => {

        const from_json = JSON.parse(xhr.responseText);
        const analizedText = from_json.responses[0].fullTextAnnotation.text ? from_json.responses[0].fullTextAnnotation.text : '';

        if (analizedText == '') {
          // 例外処理orエラーメッセージ
          // this.response = {
          //   additive_substances: []
          //   created_at: "2021-09-02T19:31:05.057+09:00"
          //   health_rank: "A"
          //   health_score: 80
          //   id: 8893
          //   raw_material: ""
          //   raw_material_ocr_str: "(純幹は\n"
          //   tagged_raw_material_str: "(純幹は"
          //   updated_at: "2021-09-02T19:31:05.057+09:00"
          // };
          // this.$emit('response', from_json2);
          return;
        }
        //---------------------------
        //CoronaLab 仮の健康度を算出 API実行
        let xhr2 = new XMLHttpRequest();
        xhr2.open('POST', this.coronaLabUrl, true);
        xhr2.setRequestHeader(...this.headers);

        let json = JSON.stringify({
          raw_material: "",
          raw_material_ocr_str: analizedText
        });

        xhr2.onreadystatechange = () => {
          const from_json2 = JSON.parse(xhr2.responseText);

          console.log(from_json2);

          this.response = from_json2;
          this.$emit('response', from_json2);
        };
        xhr2.send( json );
      };
      xhr.send( JSON.stringify(body) );
    },
    pasteSnappedImage: function(canvas) {
      var dataRaw = canvas.toDataURL("image/jpeg");
      var dataArray = dataRaw.split( ',' );
      var base64string = dataArray[ 1 ];
      return base64string;
    },
    refreshPage: function() {
      location.reload();
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttonGroup {
  display: flex;
  justify-content: space-evenly;
  margin: 1.33em 0;
}
.cameraSpace {
  display: flex;
  justify-content: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
@media screen and (max-width: 480px) {
  .cameraSpace { display: initial; }
}
</style>
