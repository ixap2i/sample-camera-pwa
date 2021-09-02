<template>
  <div>
    <ul>
      <li>バーコード読み取り -> カメラ前にバーコードをかざす</li>
      <li>原材料読み取り -> 撮影</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CameraPart',
  computed: {
    targetSplite: function() {
      return document.querySelector('#appendField');
    },
    pasteImage: function() {
      return 'test';
    },
  },
  props: {
    msg: String,
    barcode: String,
    url: {
      type: String,
      default: function() {
        return 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD6zE1TyBncQGocEqknyy70oGUn7hmmxAY';
      }
    },
    headers: {
      type: Array,
      default: function() {
        return ['Content-Type', 'application/json'];
      }
    }
  },
  mounted: function() {
  },
  methods: {
    setImage: function() {
      // this.targetSplite = from_json2.raw_material_ocr_str;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
