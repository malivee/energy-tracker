import image from '../../assets/section-three.jpg';
import Prediction from '../../data/predict';
import AnalysisPresenter from './analysis-presenter';

export default class AnalysisPage {
  async render() {
    return `
      <div data-aos="fade-left" data-aos-delay="200" class="analysis-section">
        <div class="analysis-container">
          <img src="${image}" alt="Smart Home Energy" id="img-analysis" />
          <div class="analysis-content">
            <h2>Analysis</h2>
            <p>See where your power goes, understand patterns, and take action to reduce waste.</p>
            <div class="form-row-horizontal">
              <div class="form-field">
                <label for="device">Device</label>
                <select id="device">
                  <option value="Smart speaker">Smart Speaker</option>
                  <option value="Kipas Angin">Kipas Angin</option>
                  <option value="Security System">Security System</option>
                  <option value="Thermostat">Thermostat</option>
                  <option value="Air Conditioner">Air Conditioner</option>
                  <option value="Lampu">Lampu</option>
                </select>
              </div>

              <div class="form-field checkbox-field">
                <label for="active">Device Active</label>
                <label class="switch">
                  <input type="checkbox" id="active" checked>
                  <span class="slider round"></span>
                </label>
              </div>

              <div class="form-field">
                <label for="waktu">Durasi (Jam)</label>
                <input type="number" id="waktu" placeholder="Masukkan waktu penggunaan" />
              </div>

              <div class="form-field">
                <label for="watt">Watt Device</label>
                <input type="number" id="watt" placeholder="Masukkan Watt" />
              </div>

              <div class="form-field">
                <label for="biaya">Biaya</label>
                <input type="number" id="biaya" value="1444" />
                <small>Masukkan 1444 kalau tidak yakin</small>
              </div>

              <div class="form-field form-button">
                <label>&nbsp;</label>
                <button type="submit" id="submitBtn">Klasifikasi</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    let timerInterval = null;
    let minutesPassed = 0;

    const activeCheckbox = document.getElementById('active');
    const waktuInput = document.getElementById('waktu');

    const updateWaktuField = () => {
    const hours = (minutesPassed / 60).toFixed(2);
    waktuInput.value = hours;
    };

    activeCheckbox.addEventListener('change', () => {
    if (activeCheckbox.checked) {
        minutesPassed = 0;
        updateWaktuField();
        timerInterval = setInterval(() => {
        minutesPassed++;
        updateWaktuField();
        }, 60000); 
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    });


    const presenter = new AnalysisPresenter({ model: new Prediction(), view: this });

    document.getElementById('submitBtn').addEventListener('click', (e) => {
      e.preventDefault();

      const watt = parseFloat(document.getElementById('watt').value);
      const hour = parseFloat(document.getElementById('waktu').value);

      const data = {
        device: document.getElementById('device').value,
        hour: hour,
        watt: watt,
        cost: parseInt(document.getElementById('biaya').value, 10),
        kwh: watt * hour /1000
      };

      console.log(JSON.stringify(data));

      presenter.handleSubmit(data);
    });
  }

  showPredictionResult(prediction, formData) {
    const resultContainer = document.querySelector('.analysis-content');
    const existing = document.getElementById('result');
    if (existing) existing.remove();

    const result = document.createElement('h2');
    result.id = 'result';
    if (prediction == 0) {
        result.textContent = `Penggunaan listrik dari ${formData.device} Boros `;
        result.style.color = 'red';
    } else { 
        result.textContent = `Penggunaan listrik dari ${formData.device} Hemat `;
        result.style.color = 'green';

    }
    resultContainer.appendChild(result);
  }
}
