import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { PieChartResponse } from '@/interfaces/Chart';

export const usePieChartStore = defineStore('pie', () => {
  const rawPieData = ref< PieChartResponse[]>([])
  const chartOptions = ref({
    responsive: true,
    plugins: {
      colors: {
        enabled: true
      },
      // legend: {
      //   position: 'right',
      // },
    }
})
  const labels = ref<string[]>([]);
  const datasets = ref<number[]>([]);
  const pieData = computed(() => {
    return { labels: labels.value, datasets: [{ data: datasets.value }] };
  });

  function setRawData(data: PieChartResponse[]) {
    rawPieData.value = data;
    labels.value = data.map((item) => item.Группа);
    datasets.value = data.map((item) => item.Доля);
  }

  return { rawPieData, pieData, labels, datasets, chartOptions, setRawData };
});
