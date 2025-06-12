
export default class Prediction {
  async predict(data) {
    const response = await fetch(`${process.env.URL_API}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: [[data.hour, data.kwh, data.cost]] }),
    });

    const result = await response.json();
    return result.prediction[0][0];
  }

  saveToLocal(formData) {
    const saved = JSON.parse(localStorage.getItem('analysisData')) || [];
    saved.push(formData);
    localStorage.setItem('analysisData', JSON.stringify(saved));
    console.log(JSON.stringify(formData));

  }

  getSavedData() {
    return JSON.parse(localStorage.getItem('analysisData')) || [];
  }

  deleteAllAnalysisData() {
    localStorage.removeItem('analysisData');
  }
}
