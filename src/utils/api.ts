async function loadChartData(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('getData error', error);
  }
}

export { loadChartData };
