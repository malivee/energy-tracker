import firstImage from '../../assets/section-one.webp';
import secondImage from '../../assets/section-two.jpeg';
import thirdImage from '../../assets/section-three.jpg';

export default class HomePage {
    async render() {
        return `    
        <div data-aos="fade-right" data-aos-delay="400" class="section-one">
      <img src="${firstImage}" alt="Home Illustration" id="section-one-img" />
      <div class="main-welcome">
        <h1>Welcome to Go-Energy</h1>
        <p>Pendamping cerdas Anda untuk memantau dan menghemat energi di rumah.
        Pantau, analisis, dan optimalkan penggunaan energi rumah tangga semua dalam satu aplikasi.</p>
      </div>
    </div>

    <div data-aos="fade-left" data-aos-delay="200" class="section-two">
      <img src="${secondImage}" alt="Home Illustration" id="section-two-img"/>
      <div class="section-two-text">
      <h2><strong>Apa itu Go-Energy?</strong></h2>
      <p>
        Banyak orang tidak menyadari seberapa besar energi yang digunakan di rumah mereka.<br>
        GoEnergy membantu Anda mendapatkan gambaran jelas tentang konsumsi energi, menemukan kebiasaan boros, dan memberikan panduan hemat energi untuk hidup yang lebih berkelanjutan.
      </p>
      <button class="btn-start"><a href="/#/analysis">Mulai Sekarang</a></button>
      </div>


    </div>

    <div data-aos="fade-right" data-aos-delay="200" class="section-three">
      <img src="${thirdImage}" alt="Feature Illustration" id="section-three-img" />
      <div class="section-three-text">
        <h3>Fitur-fitur Go-Energy</h3>
        <ul>
          <li>Pemantauan Energi Real-Time</li>
          <li>Klasifikasi Penggunaan Listrik</li>
          <li>Tren Penggunaan Listrik Bulanan</li>
        </ul>
      </div>
    </div>
        `
    }

    async afterRender() {
        return `
        `
    }
}