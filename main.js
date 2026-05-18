/* ========================================
   LA FIAMMA — MAIN JAVASCRIPT
   ======================================== */

// ─── DATA ───────────────────────────────
const pizzaData = [
  { id: 1, name: "Маргарита", emoji: "🍕", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&auto=format&fit=crop", desc: "Томатний соус San Marzano, моцарела DOP, свіжий базилік, оливкова олія.", price: 260, category: "classic", badge: "Хіт", badgeClass: "" },
  { id: 2, name: "Пепероні", emoji: "🌶️", image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop", desc: "Томатний соус, моцарела, пепероні з ндуйей, гострий мед.", price: 310, category: "spicy", badge: "Гостра", badgeClass: "tag-spicy" },
  { id: 3, name: "Трюфельна", emoji: "🍄", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop", desc: "Крем-основа, трюфельна олія, шампіньйони, руккола, пармезан.", price: 390, category: "special", badge: "Авторська", badgeClass: "tag-special" },
  { id: 4, name: "Чотири сири", emoji: "🧀", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&auto=format&fit=crop", desc: "Моцарела, горгонзола, фонтіна, пармезан, мед та горіхи.", price: 360, category: "classic", badge: null, badgeClass: "" },
  { id: 5, name: "Вегетаріано", emoji: "🥦", image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop", desc: "Томатна основа, цукіні, перець, баклажан, в'ялені томати, моцарела.", price: 295, category: "veg", badge: "Веган", badgeClass: "tag-veg" },
  { id: 6, name: "Дьябола", emoji: "🔥", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop", desc: "Томатний соус, моцарела, гостра саламі, халапеньйо, чилі.", price: 325, category: "spicy", badge: "Дуже гостра", badgeClass: "tag-spicy" },
  { id: 7, name: "Карбонара", emoji: "🥚", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&auto=format&fit=crop", desc: "Крем-соус з жовтком, гуанчале, пармезан, чорний перець.", price: 340, category: "special", badge: "Нова", badgeClass: "tag-new" },
  { id: 8, name: "Прошуто", emoji: "🥩", image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop", desc: "Томатна основа, моцарела, прошуто крудо, руккола, пармезан.", price: 355, category: "classic", badge: null, badgeClass: "" },
  { id: 9, name: "Фунгі", emoji: "🍄", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop", desc: "Вершкова основа, мікс лісових грибів, чебрець, моцарела, трюфельна олія.", price: 315, category: "veg", badge: "Веган", badgeClass: "tag-veg" },
  { id: 10, name: "Дари моря", emoji: "🦐", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&auto=format&fit=crop", desc: "Томатна основа, мікс морепродуктів, каперси, оливки, часник.", price: 420, category: "special", badge: "Авторська", badgeClass: "tag-special" },
  { id: 11, name: "Буфала", emoji: "🐄", image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop", desc: "Томатний соус, моцарела буфала, в'ялені томати, базилік.", price: 370, category: "classic", badge: null, badgeClass: "" },
  { id: 12, name: "Спічі", emoji: "🌿", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop", desc: "Базилікове песто, моцарела, черрі томати, руккола, кедрові горіхи.", price: 300, category: "veg", badge: "Нова", badgeClass: "tag-new" }
];

// Bestsellers for home page (first 3)
const bestsellers = [pizzaData[0], pizzaData[1], pizzaData[2]];

// ─── CART STATE ──────────────────────────
let cart = {};

// ─── NAVBAR SCROLL ───────────────────────
function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav);
  updateNav();
}

// ─── AOS (simple scroll animation) ───────
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  elements.forEach(el => observer.observe(el));
}

// ─── RENDER PIZZA CARD ───────────────────
function createPizzaCard(pizza, cols = 'col-md-6 col-lg-4') {
  const badgeHtml = pizza.badge
    ? `<div class="pizza-card-badge ${pizza.badgeClass}">${pizza.badge}</div>`
    : '';
  
  return `
    <div class="${cols}" data-category="${pizza.category}">
      <div class="pizza-card">
        <div class="pizza-card-img">
          ${badgeHtml}
          <img src="${pizza.image}" alt="${pizza.name}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/2E1F0E/D4A853?text=La+Fiamma'">
        </div>
        <div class="pizza-card-body">
          <h3>${pizza.name}</h3>
          <p class="pizza-card-desc">${pizza.desc}</p>
          <div class="pizza-card-footer">
            <div class="pizza-price">${pizza.price} <span>грн</span></div>
            <button class="btn-add" data-id="${pizza.id}" onclick="addToCart(${pizza.id}, this)">
              + До кошика
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── BESTSELLERS (home page) ─────────────
function renderBestsellers() {
  const container = document.getElementById('bestsellers-row');
  if (!container) return;
  
  container.innerHTML = bestsellers.map(p => createPizzaCard(p)).join('');
}

// ─── MENU PAGE ───────────────────────────
function renderMenu(filter = 'all') {
  const container = document.getElementById('menu-grid');
  if (!container) return;
  
  const filtered = filter === 'all' ? pizzaData : pizzaData.filter(p => p.category === filter);
  
  container.innerHTML = '';
  filtered.forEach((pizza, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'col-md-6 col-lg-4';
    wrapper.setAttribute('data-category', pizza.category);
    wrapper.innerHTML = `
      <div class="pizza-card" style="animation: fadeInUp 0.4s ease both; animation-delay: ${i * 0.05}s">
        <div class="pizza-card-img">
          ${pizza.badge ? `<div class="pizza-card-badge ${pizza.badgeClass}">${pizza.badge}</div>` : ''}
          <img src="${pizza.image}" alt="${pizza.name}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/2E1F0E/D4A853?text=La+Fiamma'">
        </div>
        <div class="pizza-card-body">
          <h3>${pizza.name}</h3>
          <p class="pizza-card-desc">${pizza.desc}</p>
          <div class="pizza-card-footer">
            <div class="pizza-price">${pizza.price} <span>грн</span></div>
            <button class="btn-add" data-id="${pizza.id}" onclick="addToCart(${pizza.id}, this)">
              + До кошика
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(wrapper);
  });
}

function initMenuFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderMenu(filter);
      syncCartButtons();
    });
  });
}

// ─── CART ────────────────────────────────
function addToCart(id, btn) {
  const pizza = pizzaData.find(p => p.id === id);
  if (!pizza) return;
  
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { ...pizza, qty: 1 };
  }
  
  // Visual feedback
  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Додано!';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = original || '+ До кошика';
      btn.classList.remove('added');
    }, 1200);
  }
  
  updateCartUI();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
  renderCartBody();
}

function updateCartUI() {
  const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  
  if (countEl) countEl.textContent = count;
  if (totalEl) totalEl.textContent = total;
}

function renderCartBody() {
  const body = document.getElementById('cartBody');
  const formBlock = document.getElementById('checkoutFormBlock');
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (!body) return;
  
  const items = Object.values(cart);
  
  // Якщо кошик порожній - ховаємо форму і блокуємо кнопку
  if (!items.length) {
    body.innerHTML = '<p class="cart-empty">Кошик порожній 🛒</p>';
    if(formBlock) formBlock.classList.add('d-none');
    if(checkoutBtn) checkoutBtn.disabled = true;
    return;
  }
  
  // Якщо товари є - показуємо форму і розблоковуємо кнопку
  if(formBlock) formBlock.classList.remove('d-none');
  if(checkoutBtn) checkoutBtn.disabled = false;
  
  body.innerHTML = items.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-name">${item.emoji} ${item.name}</div>
        <div class="cart-item-qty">${item.qty} × ${item.price} грн</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div class="cart-item-price">${item.qty * item.price} грн</div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join('');
}

function initCart() {
  const cartToggle = document.getElementById('cartToggle');
  const cartModal = document.getElementById('cartModal');
  
  if (!cartToggle || !cartModal) return;
  
  const modal = new bootstrap.Modal(cartModal);
  
  cartToggle.addEventListener('click', () => {
    renderCartBody();
    modal.show();
  });
  
  const checkoutBtn = document.getElementById('checkoutBtn');
  const phoneInput = document.getElementById('clientPhone');
  const phoneError = document.getElementById('phoneError');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (Object.keys(cart).length === 0) return;
      
      // ЛОГІКА ВАЛІДАЦІЇ ТЕЛЕФОНУ
      const phonePattern = /^[\+\d\s\(\)\-]{7,}$/;
      if (!phoneInput || !phoneInput.value.trim() || !phonePattern.test(phoneInput.value.trim())) {
        phoneInput.classList.add('error');
        phoneError.classList.remove('d-none');
        return; // Зупиняємо виконання, замовлення не проходить
      }
      
      // Якщо все правильно: імітуємо відправку
      cart = {};
      updateCartUI();
      renderCartBody();
      
      // Очищаємо форму після замовлення
      const form = document.getElementById('checkoutForm');
      if(form) form.reset();
      phoneInput.classList.remove('error');
      phoneError.classList.add('d-none');
      
      modal.hide();
      
      // Показуємо повідомлення про успіх
      const toastEl = document.getElementById('orderToast');
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
        toast.show();
      }
    });
  }

  // Прибираємо червону рамку помилки, коли користувач починає вводити текст
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.classList.remove('error');
      phoneError.classList.add('d-none');
    });
  }
}

function syncCartButtons() {
  // After re-render, mark added items
  Object.keys(cart).forEach(id => {
    const btns = document.querySelectorAll(`[data-id="${id}"]`);
    btns.forEach(btn => {
      if (cart[id]) btn.classList.add('added');
    });
  });
}

// ─── CONTACT FORM ─────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let valid = true;
    
    // Validate name
    const fname = document.getElementById('fname');
    const fnameError = document.getElementById('fnameError');
    if (fname && fname.value.trim().length < 2) {
      fnameError.textContent = "Введіть ваше ім'я (мінімум 2 символи)";
      fname.classList.add('error');
      valid = false;
    } else if (fname) {
      fnameError.textContent = '';
      fname.classList.remove('error');
    }
    
    // Validate phone
    const fphone = document.getElementById('fphone');
    const fphoneError = document.getElementById('fphoneError');
    const phonePattern = /^[\+\d\s\(\)\-]{7,}$/;
    if (fphone && !phonePattern.test(fphone.value.trim())) {
      fphoneError.textContent = "Введіть коректний номер телефону";
      fphone.classList.add('error');
      valid = false;
    } else if (fphone) {
      fphoneError.textContent = '';
      fphone.classList.remove('error');
    }
    
    // Validate email (optional but must be valid if filled)
    const femail = document.getElementById('femail');
    const femailError = document.getElementById('femailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (femail && femail.value.trim() && !emailPattern.test(femail.value.trim())) {
      femailError.textContent = "Введіть коректний email";
      femail.classList.add('error');
      valid = false;
    } else if (femail) {
      femailError.textContent = '';
      femail.classList.remove('error');
    }
    
    // Validate message
    const fmessage = document.getElementById('fmessage');
    const fmessageError = document.getElementById('fmessageError');
    if (fmessage && fmessage.value.trim().length < 10) {
      fmessageError.textContent = "Повідомлення надто коротке (мінімум 10 символів)";
      fmessage.classList.add('error');
      valid = false;
    } else if (fmessage) {
      fmessageError.textContent = '';
      fmessage.classList.remove('error');
    }
    
    if (!valid) return;
    
    // Simulate submission
    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.textContent = 'Надсилаємо...';
      btn.disabled = true;
    }
    
    setTimeout(() => {
      form.classList.add('d-none');
      const success = document.getElementById('formSuccess');
      if (success) success.classList.remove('d-none');
    }, 1200);
  });
  
  // Real-time validation feedback
  ['fname', 'fphone', 'femail', 'fmessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const errEl = document.getElementById(id + 'Error');
        if (errEl) errEl.textContent = '';
      });
    }
  });
}

// ─── ADD KEYFRAME for menu cards ─────────
function addFadeInKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// ─── INIT ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  addFadeInKeyframe();
  initNavbar();
  initAOS();
  renderBestsellers();
  renderMenu('all');
  initMenuFilters();
  initCart();
  initContactForm();
});