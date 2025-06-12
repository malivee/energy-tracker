export default class DashboardPresenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async init() {
    const dataList = this.#model.getSavedData();
    if (dataList.length > 0) {
      this.#view.renderCards(dataList);
    } else {
      this.#view.showNoData();
    }
}

   handleDeleteAll() {
    this.#model.deleteAllAnalysisData();
    this.#view.showNoData();
  }
  
}
