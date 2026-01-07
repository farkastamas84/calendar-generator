<script setup lang="ts">
import { computed } from 'vue';
import type LengthUnit from '@/types/LengthUnit';

const props = defineProps<{
  lengthUnit: LengthUnit
  padding: number
  contentWidth: number
  contentHeight: number
  pageInnerWidth: number
  pageInnerHeight: number
  rows: number
  columns: number
  showPages: boolean
}>()

const padding = computed(() => props.padding + props.lengthUnit)

const paperStyle = computed(() => ({
  width: props.contentWidth + props.lengthUnit,
  height: props.contentHeight + props.lengthUnit,
}))

const pageStyle = computed(() => ({
  width: props.pageInnerWidth + props.lengthUnit,
  height: props.pageInnerHeight + props.lengthUnit
}))

</script>

<template>
  <div class="paper" :style="paperStyle">
    <slot></slot>
    <div v-if="showPages" id="printablePages">
      <div v-for="x in rows * columns" :key="x" class="printablePage" :style="pageStyle">
      </div>
    </div>
  </div>
</template>

<style scoped>
.paper {
  position: relative;
  margin: 0 auto;
  box-sizing: content-box;
  width: fit-content;
  background-color: white;
  padding: v-bind(padding);
}

#printablePages {
  display: flex;
  flex-wrap: wrap;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  box-sizing: border-box;

  width: 100%;
  height: 100%;

  padding: v-bind(padding);
}

.printablePage {
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  display: inline-block;
  box-shadow: inset 0 0 10px rgba(0, 0, 255, 0.9);
}
</style>
