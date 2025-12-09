// app.js

// --- Утилиты для "фейкового" JWT ---
// base64 url encode/decode
function b64UrlEncode(str) {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // pad
    while (str.length % 4) str += '=';
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (e) {
      return null;
    }
  }
  
  // генерируем "фейковый" JWT с payload { email, iat, exp }
  function generateFakeJWT(email, ttlSeconds = 60*60) {
    const header = { alg: "HS256", typ: "JWT" };
    const iat = Math.floor(Date.now() / 1000);
    const payload = { email, iat, exp: iat + ttlSeconds };
    const headerB64 = b64UrlEncode(JSON.stringify(header));
    const payloadB64 = b64UrlEncode(JSON.stringify(payload));
    const signature = "fake-signature"; // в учебном примере
    return `${headerB64}.${payloadB64}.${signature}`;
  }
  
  function parseJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = b64UrlDecode(parts[1]);
    if (!payload) return null;
    try {
      return JSON.parse(payload);
    } catch (e) {
      return null;
    }
  }
  
  function isTokenValid(token) {
    const payload = parseJWT(token);
    if (!payload) return false;
    const now = Math.floor(Date.now() / 1000);
    return typeof payload.exp === 'number' && payload.exp > now;
  }
  
  // --- DOM элементы ---
  const loginSection = document.getElementById('login-section');
  const protectedSection = document.getElementById('protected-section');
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const logoutBtn = document.getElementById('logout');
  const userEmailEl = document.getElementById('user-email');
  const tokenPreviewEl = document.getElementById('token-preview');
  const decodedEl = document.getElementById('decoded');
  const showDecodedBtn = document.getElementById('show-decoded');
  const fillTestBtn = document.getElementById('fill-test');
  
  const STORAGE_KEY = 'lab12_demo_token';
  
  // заполнить тестовые значения
  fillTestBtn.addEventListener('click', () => {
    emailInput.value = 'student@example.com';
    passwordInput.value = 'password123';
  });
  
  // обработчик входа (имитация)
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    // простая имитация: любой непустой пароль проходит
    if (!email || !password) {
      alert('Введите email и пароль');
      return;
    }
    // Генерируем токен на 1 час (3600 сек)
    const token = generateFakeJWT(email, 3600);
    localStorage.setItem(STORAGE_KEY, token);
    showProtected(token);
  });
  
  // показать защищённую часть
  function showProtected(token) {
    loginSection.classList.add('hidden');
    protectedSection.classList.remove('hidden');
    const payload = parseJWT(token) || {};
    userEmailEl.textContent = payload.email || 'неизвестно';
    tokenPreviewEl.textContent = token;
    decodedEl.classList.add('hidden');
    decodedEl.textContent = '';
  }
  
  // выход
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    protectedSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
  });
  
  // показать декодированный payload
  showDecodedBtn.addEventListener('click', () => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return;
    const payload = parseJWT(token);
    if (!payload) {
      decodedEl.textContent = 'Не удалось декодировать токен';
    } else {
      decodedEl.textContent = JSON.stringify(payload, null, 2);
    }
    decodedEl.classList.toggle('hidden');
  });
  
  // При загрузке страницы — проверить токен
  (function init() {
    const token = localStorage.getItem(STORAGE_KEY);
    if (token && isTokenValid(token)) {
      showProtected(token);
    } else {
      // если токен просрочен — удалить
      if (token) localStorage.removeItem(STORAGE_KEY);
      loginSection.classList.remove('hidden');
      protectedSection.classList.add('hidden');
    }
  })();
