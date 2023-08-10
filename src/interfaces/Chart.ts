interface LineChartResponse {
  Дата: string;
  Месяц: string;
  Процент: number;
}

interface PieChartResponse {
  Группа: string;
  Доля: number;
}

enum LineChartLabels {
  date = 'Дата',
  month = 'Месяц',
}

export { LineChartLabels };
export type { LineChartResponse, PieChartResponse };
