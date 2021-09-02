<template>
  <div>
    <div class="card" style="width: 20rem;">
      <div class="card-body">
        <h4 class="card-title">健康ランク: <span>{{this.healthData.health_rank}}</span></h4>
        <h4 class="card-title">健康度: <span>{{this.healthData.health_score}}</span></h4>
        <div class="card-text">
          <h4 class="card-title">原材料名:</h4>
          <span>{{this.healthData.tagged_raw_material_str}}</span>
        </div>
        <div class="card-text">
          <h4 class="card-title">読み取った文字列:</h4>
          <span>{{this.healthData.raw_material_ocr_str}}</span>
        </div>
        <div class="card-text">
          <h4 class="card-title">添加物:</h4>
          <span>{{this.healthData.additive_substances}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CameraPart',
  props: {
    healthData: Object
  },
  mounted: function() {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
