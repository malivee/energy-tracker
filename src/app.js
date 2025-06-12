import './styles/style.css';
import AOS  from 'aos';
import '../node_modules/aos/dist/aos.css';
import { getActiveRoute } from './view/routes/url-parser.js';
import routes from './view/routes/routes.js';
import logo from './assets/logooo_1.png';
import './favicon.ico';


AOS.init({
    duration: 1000,
    once: false
});

document.getElementById('logo').src = logo;

const content = document.querySelector('#content');

async function renderPage() {
  const routeName = getActiveRoute();
  const route = routes[routeName];
  const page = route;

  if (!document.startViewTransition) {
    content.innerHTML = await page.render();
    console.log(`${page.render()}`)
    await page.afterRender();
    return;
  }

  document.startViewTransition(async () => {
    content.innerHTML = await page.render();
    await page.afterRender();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await renderPage();
});

window.addEventListener('hashchange', async () => {
  await renderPage();
});
