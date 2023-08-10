<script setup lang="ts">
import { usePieChartStore } from '@/stores/pie'
import { storeToRefs } from 'pinia'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Colors,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement
} from 'chart.js'
import { Pie } from 'vue-chartjs';
import { loadChartData } from '@/utils/api';
import { PieChartResponse } from '@/interfaces/Chart';

ChartJS.register(CategoryScale, Colors, LinearScale, ArcElement, Title, Tooltip, Legend, PointElement)

const pieChartStore = usePieChartStore()
const { pieData, chartOptions } = storeToRefs(pieChartStore)

async function getData() {
    const result = await loadChartData('https://run.mocky.io/v3/2699115b-8ced-40c3-8072-b7fa9faf6047')
    if (result) {
        pieChartStore.setRawData(result as PieChartResponse[])
    }
}

getData()
</script>

<template>
    <div>
        <Pie :data="pieData" :options="chartOptions" />
    </div>
</template>