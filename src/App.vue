<script setup lang="ts">
import { shallowRef } from 'vue';
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'

const chartType = shallowRef(LineChart)
</script>

<template>
  <div>
    <button class="btn-tab" :class="{'active': chartType === PieChart}" @click="chartType = PieChart">Pie Chart</button>
    <button class="btn-tab" :class="{'active': chartType === LineChart}" @click="chartType = LineChart">Line Chart</button>
  </div>
  <component :is="chartType" />
</template>

<style>
.btn-tab {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  cursor: pointer;
}
.btn-tab:last-of-type {
  margin-right: 0;
}
.btn-tab.active {
  background-color: aqua;
  border-color: aqua;
}
.btn-tab:hover {
  transform: translate3d(0, -2px, 0);
}
</style>
