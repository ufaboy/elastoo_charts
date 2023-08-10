<script setup lang="ts">
import { ref } from 'vue';
import { useLineChartStore } from '@/stores/line'
import { storeToRefs } from 'pinia'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Colors,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js'
import { Line } from 'vue-chartjs';
import { loadChartData } from '@/utils/api';
import { LineChartResponse, LineChartLabels } from '@/interfaces/Chart';

ChartJS.register(CategoryScale, Colors, LinearScale, LineElement, Title, Tooltip, Legend, PointElement)

const lineChartStore = useLineChartStore()
const { lineData, chartOptions } = storeToRefs(lineChartStore)

const labelsType = ref(LineChartLabels.date)

function changeAggregation() {
    if (labelsType.value === LineChartLabels.month) {
        lineChartStore.setAggregationByMonths()
    } else if (labelsType.value === LineChartLabels.date) {
        lineChartStore.setAggregationByDate()
    }
}
async function getData() {
    const result = await loadChartData('https://run.mocky.io/v3/92a0a266-0321-4ff5-9993-b394d03ceee2')
    if (result) {
        lineChartStore.setRawData(result as LineChartResponse[])
    }
}
getData()
</script>

<template>
    <div>
        <select class="select" v-model="labelsType" @change="changeAggregation">
            <option :value="type" v-for="type in LineChartLabels">
                {{ type }}
            </option>
        </select>
        <Line :data="lineData" :options="chartOptions" />
    </div>
</template>

<style>
.select {
margin: 1rem 0;
}
</style>