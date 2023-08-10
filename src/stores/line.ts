import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { LineChartLabels, LineChartResponse } from '@/interfaces/Chart';

export const useLineChartStore = defineStore('line', () => {
  const rawLineData = ref<LineChartResponse[]>([]);
  const chartOptions = ref({
    responsive: true,
    locale: navigator.language,
    plugins: {
      colors: {
        enabled: true
      },
      // legend: {
      //   position: 'right',
      // },
    }
    // scales: {
    //   xAxis: {
    //     // The axis for this scale is determined from the first letter of the id as `'x'`
    //     // It is recommended to specify `position` and / or `axis` explicitly.
    //     type: 'time',
    //   }
    // }
  });
  const labels = ref<string[]>([]);
  const datasets = ref<number[]>([]);

  const lineData = computed(() => {
    return {
      labels: labels.value,
      datasets: [{ label: 'Процент', data: datasets.value }],
    };
  });

  function setRawData(data: LineChartResponse[]) {
    rawLineData.value = data;
    datasets.value = data.map((item) => item.Процент);
    setAggregationByDate(data);
  }

  function setAggregationByDate(data: LineChartResponse[]) {
    labels.value = data.map((item) => {
      const date = new Date(item[LineChartLabels.date]);
      return new Intl.DateTimeFormat(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    });
    datasets.value = rawLineData.value.map((item) => item.Процент);
  }

  function setAggregationByMonths(data: LineChartResponse[]) {
    let aggregation: { [month: string]: number } = {};

    for (const item of data) {
      if (!aggregation[item.Месяц]) {
        aggregation[item.Месяц] = 0;
      }
      aggregation[item.Месяц] += item.Процент;
    }
    labels.value = Object.keys(aggregation);
    datasets.value = Object.values(aggregation);
  }

  function filterRawByDate(startDate: Date, endDate: Date) {
    return rawLineData.value.filter(item => {
      new Date(item.Дата) >= startDate && new Date(item.Дата) <= endDate
    })
  }

  return {
    rawLineData,
    labels,
    datasets,
    lineData,
    chartOptions,
    setRawData,
    setAggregationByDate,
    setAggregationByMonths,
    filterRawByDate
  };
});
