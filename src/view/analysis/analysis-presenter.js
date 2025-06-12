import Swal from "sweetalert2";

export default class AnalysisPresenter {
  #model
  #view

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }


  async handleSubmit(formData) {
    const { hour, watt, cost} = formData;

    if (isNaN(hour) || isNaN(watt) || isNaN(cost)) {
      Swal.fire({
        title: 'Mohon isi semua input dengan benar',
        icon: 'warning'
      });
    return;
    }

    this.#view.showLoading();

    try {


      const prediction = await this.#model.predict(formData);
      formData.prediction = prediction;
      this.#model.saveToLocal(formData);
      console.log('Final data with prediction:', formData);
      this.#view.showPredictionResult(prediction, formData);
      Swal.fire({
        title: 'Sukses Melakukan Analisis',
        icon: 'success'
      });
    } catch (err) {
      console.error('Prediction error:', err);
      Swal.fire({
        title: 'Gagal mengirim data. Coba lagi nanti.',
        icon: 'error'
      });
    } finally {
      this.#view.hideLoading();
    }
  }
}



