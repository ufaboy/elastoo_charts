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
const { rawLineData, lineData, chartOptions } = storeToRefs(lineChartStore)

const labelsType = ref(LineChartLabels.date)
const startDate = ref<Date>()
const endDate = ref<Date>()

function getChartData() {
    const filteredData = rawLineData.value.filter(item => {
        let date = new Date(item.Дата);
        // Если startDate не определено, то считаем, что дата date проходит проверку
        let startCondition = startDate.value ? date >= new Date(startDate.value) : true;
        // Если endDate не определено, то считаем, что дата date проходит проверку
        let endCondition = endDate.value ? date <= new Date(endDate.value) : true;
        return startCondition && endCondition;
    });

    if (labelsType.value === LineChartLabels.month) {
        lineChartStore.setAggregationByMonths(filteredData)
    } else if (labelsType.value === LineChartLabels.date) {
        lineChartStore.setAggregationByDate(filteredData)
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
    <div class="chart-header">
        <label class="label">
            <span>Aggregation by</span>
            <select class="select" v-model="labelsType" @change="getChartData">
                <option :value="type" v-for="(type, index) in LineChartLabels" :key="index">
                    {{ type }}
                </option>
            </select>
        </label>
        <label class="label">
            <span>After</span>
            <input type="date" v-model="startDate" @change="getChartData">
        </label>
        <label class="label">
            <span>Before</span>
            <input type="date" v-model="endDate" @change="getChartData">
        </label>
    </div>
    <Line :data="lineData" :options="chartOptions" />
</template>

<style>
.chart-header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 1rem 0;
}

.label {
    margin-right: 1rem;
    display: flex;
    flex-flow: column;
}
</style>