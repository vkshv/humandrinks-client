<template>
  <div class="reserve-view">
    <div class="top-spacer-footer"></div>
    <div class="title">как вас зовут?</div>
    <div class="preview"></div>
    <div class="field"></div>
    <div class="field"></div>
    <div class="price"></div>
    <div class="reserve">
      <ui-button
        class-name="button--primary"
        @click="reserve"
      >
        забронировать
      </ui-button>
    </div>

  </div>
</template>

<script setup lang="ts">
function reserve() {}
</script>

<style scoped>
</style>
