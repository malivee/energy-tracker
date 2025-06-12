import DashboardPresenter from './dashboard-presenter';
import Prediction from '../../data/predict';
import Swal from 'sweetalert2';

export default class DashboardPage {
  async render() {
    return `
      <h1 class="dashboard-title">Dashboard</h1>
      <div class="dashboard-header"></div>
      <div id="dashboard-content" class="grid-wrapper"></div>
      <div class="dashboard-footer">
        <button id="deleteAllBtn" class="delete-button">Hapus Semua Data</button>
      </div>
    `;
  }

  async afterRender() {
    this.presenter = new DashboardPresenter({ model: new Prediction(), view: this });
    this.presenter.init();

    document.getElementById('deleteAllBtn').addEventListener('click', () => {
      Swal.fire({
        title: 'Yakin ingin menghapus semua data?',
        showDenyButton: true,
        denyButtonText: `Tidak`,
        confirmButtonText: "Ya",

      }).then(result => {
        if (result.isConfirmed) {
          this.presenter.handleDeleteAll();
          Swal.fire('Terhapus')
        } 
      });

    });
  }

 renderCards(dataList) {
  const container = document.getElementById('dashboard-content');
  container.innerHTML = '';

  const deleteButton = document.getElementById('deleteAllBtn');
  if (deleteButton) deleteButton.style.display = 'block'; 

  dataList.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.innerHTML = `
      <div data-aos="fade-right" data-aos-delay="200" class="card">
        <h2 class="device-title">${item.device}</h2>
        <p>Watt Device: ${item.watt} VA</p>
        <p>Waktu Penggunaan: ${item.hour} jam</p>
        <p>KWh: ${(item.watt * item.hour / 1000).toFixed(2)}</p>
        <p>Biaya: $${item.cost}</p>
        <p class="classification-text">${item.prediction === 1 ? 'Penggunaan Hemat' : 'Pemborosan Energi'}</p>
      </div>
      <div data-aos="fade-left" data-aos-delay="200" class="card-shadow"></div>
    `;
    container.appendChild(card);
  });
}


showNoData() {
  const container = document.getElementById('dashboard-content');
  container.innerHTML = '<p>Tidak ada data analisis tersimpan.</p>';

  const deleteButton = document.getElementById('deleteAllBtn');
  if (deleteButton) deleteButton.style.display = 'none'; 
}
}
