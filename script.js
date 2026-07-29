

document.addEventListener('DOMContentLoaded', () => {

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

const mobileBtn = document.getElementById('mobile-toggle-btn');
  const navLinks = document.getElementById('nav-links');
  const closeSidebarBtn = document.getElementById('sidebar-close-btn');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  function openMobileSidebar() {
    if (navLinks && sidebarOverlay) {
      navLinks.classList.add('active');
      sidebarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileSidebar() {
    if (navLinks && sidebarOverlay) {
      navLinks.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', openMobileSidebar);
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', closeMobileSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileSidebar();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileSidebar();
    }
  });

function triggerDownloadNotice(platform, fileType) {
    const notice = document.createElement('div');
    notice.className = 'form-toast success';
    notice.style.position = 'fixed';
    notice.style.bottom = '28px';
    notice.style.right = '28px';
    notice.style.zIndex = '99999';
    notice.style.boxShadow = '0 12px 32px rgba(39, 24, 13, 0.3)';
    notice.style.border = '2px solid #34A853';
    notice.style.background = '#FFFDF9';
    notice.style.color = '#137333';
    notice.style.borderRadius = '16px';
    notice.style.padding = '16px 22px';
    notice.style.animation = 'floatBadge 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    notice.innerHTML = `<i class="ri-checkbox-circle-fill" style="font-size: 1.3rem; vertical-align: middle;"></i> <strong style="vertical-align: middle; margin-left: 6px;">Downloading APK:</strong> <span style="vertical-align: middle;">${platform} (${fileType}) by M. Akif Fareed!</span>`;
    document.body.appendChild(notice);

    setTimeout(() => {
      notice.style.opacity = '0';
      notice.style.transform = 'translateY(20px)';
      notice.style.transition = 'all 0.4s ease';
      setTimeout(() => notice.remove(), 400);
    }, 5500);
  }
  document.querySelectorAll('.apk-download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerDownloadNotice('PriceLens AI Android Client', '.apk');
    });
  });
  document.querySelectorAll('.trigger-app-download').forEach(btn => {
    btn.addEventListener('click', () => {
      closeMobileSidebar();
    });
  });

const contactForm = document.getElementById('contact-form');
  const formToast = document.getElementById('form-response-toast');
  const submitBtn = document.getElementById('submit-contact-btn');

  if (contactForm && formToast && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const formData = new FormData(contactForm);

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Sending...`;

      try {
        const response = await fetch('https://formspree.io/f/xrendpgp', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (response.ok) {
          formToast.className = 'form-toast success';
          formToast.style.border = '2px solid #34A853';
          formToast.style.background = '#F0F9F4';
          formToast.style.color = '#137333';
          formToast.style.borderRadius = '14px';
          formToast.style.padding = '16px 20px';
          formToast.style.boxShadow = '0 8px 24px rgba(52, 168, 83, 0.15)';
          formToast.innerHTML = `<i class="ri-checkbox-circle-fill" style="font-size: 1.3rem; vertical-align: middle;"></i> <span style="vertical-align: middle; margin-left: 6px;"><strong>Message Delivered!</strong> Thank you, <strong>${name}</strong>! Your message was transmitted directly to developer M. Akif Fareed's inbox. We will respond to <strong>${email}</strong> shortly.</span>`;
          formToast.classList.remove('hidden');
          contactForm.reset();
        } else {
          const data = await response.json();
          let errorMessage = "There was a problem submitting your form.";
          if (data && data.errors && data.errors.length > 0) {
            errorMessage = data.errors.map(error => error.message).join(", ");
          }
          formToast.className = 'form-toast error';
          formToast.style.border = '2px solid #C5221F';
          formToast.style.background = '#FDF3F2';
          formToast.style.color = '#C5221F';
          formToast.style.borderRadius = '14px';
          formToast.style.padding = '16px 20px';
          formToast.style.boxShadow = '0 8px 24px rgba(197, 34, 31, 0.15)';
          formToast.innerHTML = `<i class="ri-error-warning-fill" style="font-size: 1.3rem; vertical-align: middle;"></i> <span style="vertical-align: middle; margin-left: 6px;"><strong>Transmission Failed:</strong> ${errorMessage}</span>`;
          formToast.classList.remove('hidden');
        }

        setTimeout(() => {
          formToast.classList.add('hidden');
        }, 8000);
      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formToast.className = 'form-toast error';
        formToast.style.border = '2px solid #C5221F';
        formToast.style.background = '#FDF3F2';
        formToast.style.color = '#C5221F';
        formToast.style.borderRadius = '14px';
        formToast.style.padding = '16px 20px';
        formToast.style.boxShadow = '0 8px 24px rgba(197, 34, 31, 0.15)';
        formToast.innerHTML = `<i class="ri-cloud-off-line" style="font-size: 1.3rem; vertical-align: middle;"></i> <span style="vertical-align: middle; margin-left: 6px;"><strong>Network Issue:</strong> Unable to connect to Formspree servers. Please check your connection or email akiffareed15@gmail.com directly.</span>`;
        formToast.classList.remove('hidden');

        setTimeout(() => {
          formToast.classList.add('hidden');
        }, 8000);
      }
    });
  }

const modalOverlay = document.createElement('div');
  modalOverlay.id = 'global-modal-overlay';
  modalOverlay.className = 'hidden';
  modalOverlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(39, 24, 13, 0.8); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    z-index: 999999; display: none; align-items: center; justify-content: center; padding: 18px;
  `;

  modalOverlay.innerHTML = `
    <div style="background: var(--surface); max-width: 700px; width: 100%; max-height: 88vh; overflow-y: auto; padding: 32px; border-radius: 26px; border: 1px solid var(--outline-variant); position: relative; box-shadow: 0 25px 60px rgba(39, 24, 13, 0.3); animation: popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);">
      <button id="close-modal-btn" aria-label="Close dialog" style="position: absolute; top: 20px; right: 20px; background: var(--surface-beige); border: none; width: 38px; height: 38px; border-radius: 50%; font-size: 1.4rem; cursor: pointer; color: var(--text-dark); display: flex; align-items: center; justify-content: center; transition: var(--transition);">
        <i class="ri-close-line"></i>
      </button>
      <div id="modal-dynamic-body"></div>
    </div>
  `;
  document.body.appendChild(modalOverlay);
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    @keyframes popIn {
      0% { transform: scale(0.92) translateY(15px); opacity: 0; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);

  function openModal(contentHtml) {
    document.getElementById('modal-dynamic-body').innerHTML = contentHtml;
    modalOverlay.style.display = 'flex';
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
    modalOverlay.classList.add('hidden');
    if (!navLinks.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  document.getElementById('close-modal-btn').addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

const sampleProducts = [
    { name: 'Nike Air Max SuperFly (2026 AI Edition)', category: 'Sneakers & Shoes', price: '$129.99', oldPrice: '$189.99', discount: '31% OFF', score: '88/100', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80' },
    { name: 'Apple iPhone 16 Pro Max 256GB (Desert Titanium)', category: 'Electronics', price: '$1,149.00', oldPrice: '$1,299.00', discount: '12% OFF', score: '82/100', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
    { name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', category: 'Gadgets & Audio', price: '$298.00', oldPrice: '$399.99', discount: '25% OFF', score: '94/100', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Samsung Galaxy S25 Ultra 5G AI Smart Phone', category: 'Electronics', price: '$1,089.99', oldPrice: '$1,299.99', discount: '16% OFF', score: '85/100', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' },
    { name: 'Adidas UltraBoost 5X Performance Shoe', category: 'Sneakers & Shoes', price: '$139.50', oldPrice: '$190.00', discount: '27% OFF', score: '80/100', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=300&q=80' },
    { name: 'MacBook Pro M4 Max 16-inch Liquid Retina XDR', category: 'Electronics', price: '$3,199.00', oldPrice: '$3,499.00', discount: '9% OFF', score: '78/100', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80' }
  ];

  function renderSearchModal(query = '') {
    const cleanQuery = query.trim().toLowerCase();
    const filtered = sampleProducts.filter(p => 
      p.name.toLowerCase().includes(cleanQuery) || p.category.toLowerCase().includes(cleanQuery)
    );

    const html = `
      <div style="font-size: 0.8rem; color: var(--primary); font-weight: 800; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
        <span class="live-indicator"></span> PriceLens Live AI Crawler & Deals Catalog
      </div>
      <h2 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; margin-bottom: 16px;">Search Products & Live Price Comparisons</h2>
      
      <div style="position: relative; margin-bottom: 18px;">
        <input type="text" id="live-search-input" value="${query}" placeholder="Search brands e.g. Nike, iPhone, Sony, Apple, Samsung..." style="width: 100%; padding: 14px 16px 14px 46px; border: 2px solid var(--primary); border-radius: 14px; font-size: 1rem; outline: none; background: var(--bg-warm); font-weight: 600; box-shadow: 0 4px 12px rgba(193, 99, 59, 0.1);">
        <i class="ri-search-line" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 1.3rem; color: var(--primary);"></i>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
        <button class="filter-pill-btn" data-val="" style="padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; border: none; background: ${query === '' ? 'var(--primary)' : 'var(--surface-beige)'}; color: ${query === '' ? '#fff' : 'var(--text-dark)'}; cursor: pointer; transition: all 0.2s;">🔥 All Deals (${sampleProducts.length})</button>
        <button class="filter-pill-btn" data-val="Sneakers" style="padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; border: none; background: ${query.toLowerCase() === 'sneakers' ? 'var(--primary)' : 'var(--surface-beige)'}; color: ${query.toLowerCase() === 'sneakers' ? '#fff' : 'var(--text-dark)'}; cursor: pointer; transition: all 0.2s;">👟 Sneakers & Shoes</button>
        <button class="filter-pill-btn" data-val="Electronics" style="padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; border: none; background: ${query.toLowerCase() === 'electronics' ? 'var(--primary)' : 'var(--surface-beige)'}; color: ${query.toLowerCase() === 'electronics' ? '#fff' : 'var(--text-dark)'}; cursor: pointer; transition: all 0.2s;">📱 Electronics & Phones</button>
        <button class="filter-pill-btn" data-val="Sony" style="padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; border: none; background: ${query.toLowerCase() === 'sony' ? 'var(--primary)' : 'var(--surface-beige)'}; color: ${query.toLowerCase() === 'sony' ? '#fff' : 'var(--text-dark)'}; cursor: pointer; transition: all 0.2s;">🎧 Gadgets & Audio</button>
      </div>

      <div style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.5px;">VERIFIED MERCADATA RESULTS (${filtered.length})</div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${filtered.map(item => `
          <div style="display: flex; align-items: center; gap: 16px; padding: 14px; background: var(--bg-alt); border-radius: 18px; border: 1px solid var(--outline-variant); transition: all 0.25s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='var(--primary)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--outline-variant)';" onclick="alert('Live PriceLens Deep Tracker: Deploying automated SerpApi comparator for ${item.name}!')">
            <img src="${item.img}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 14px; box-shadow: var(--shadow-sm);">
            <div style="flex: 1; min-width: 0;">
              <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-dark); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 0.85rem;">
                <span style="font-weight: 800; color: var(--primary); font-size: 1.05rem;">${item.price}</span>
                <span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.8rem;">${item.oldPrice}</span>
                <span style="background: #FCE8E6; color: #C5221F; padding: 3px 8px; border-radius: 8px; font-weight: 800; font-size: 0.72rem;">${item.discount}</span>
              </div>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.78rem; font-weight: 800; color: #137333; background: #E6F4EA; padding: 6px 10px; border-radius: 10px; display: inline-block; white-space: nowrap; box-shadow: 0 2px 6px rgba(19, 115, 51, 0.15);">Score: ${item.score}</span>
            </div>
          </div>
        `).join('')}

        ${filtered.length === 0 ? `<div style="text-align: center; padding: 40px; color: var(--text-muted); font-weight: 700; background: var(--bg-warm); border-radius: 16px;"><i class="ri-search-line" style="font-size: 2rem; color: var(--outline); margin-bottom: 8px; display: block;"></i> No matching catalog items found for "${query}". Try searching "Nike" or "iPhone"!</div>` : ''}
      </div>
    `;

    openModal(html);
    document.querySelectorAll('.filter-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        renderSearchModal(btn.getAttribute('data-val'));
      });
    });

    const searchInput = document.getElementById('live-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);

      searchInput.addEventListener('input', (e) => {
        renderSearchModal(e.target.value);
      });
    }
  }
  const searchBtn = document.getElementById('header-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      renderSearchModal('');
    });
  }
  document.querySelectorAll('.catalog-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      closeMobileSidebar();
      const catalogVal = btn.getAttribute('data-catalog-query') || '';
      setTimeout(() => renderSearchModal(catalogVal), 250);
    });
  });

const blogArticlesData = {
    '1': {
      title: 'How Visual AI Search is Revolutionizing Online Shopping in 2026',
      author: 'M. Akif Fareed',
      date: 'July 26, 2026',
      category: 'AI TECHNOLOGY & VISION',
      content: `
        <p style="margin-bottom: 18px; font-size: 1.05rem;">Visual product search uses multimodal neural networks (powered by Google Gemini 3.6 Vision) to analyze images taken directly from smartphone cameras. Rather than typing complex product descriptors like <em>"brown terracotta leather jacket with silver zipper"</em>, camera AI extracts geometry, color palettes, and brand signatures to find exact platform listings instantly.</p>
        <div style="padding: 18px; background: var(--surface-beige); border-radius: 14px; border-left: 4px solid var(--primary); margin: 24px 0;">
          <h4 style="font-weight: 800; font-size: 1.05rem; margin-bottom: 8px; color: var(--primary);">Institutional-Grade Price Transparency</h4>
          <p style="font-size: 0.92rem; margin: 0; color: var(--text-muted);">By cross-referencing visual embeddings with live SerpApi merchant databases, PriceLens eliminates artificial retailer markup anomalies in milliseconds.</p>
        </div>
        <p style="margin-bottom: 16px;"><strong>Key Strategic Advantages:</strong></p>
        <ul style="margin-left: 20px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px;">
          <li><strong>Zero Keyword Friction:</strong> Search exactly what your eye perceives in the real world or across social feeds.</li>
          <li><strong>Cross-Merchant Discovery:</strong> Compare Amazon, eBay, Walmart, and Google Shopping in a single tap.</li>
          <li><strong>MSRP Fraud Detection:</strong> Immediately verify if an advertised markdown is authentic or inflated for seasonal holiday baiting.</li>
        </ul>
        <p>PriceLens AI leads this transformation by bringing real-time visual camera scanning and historical algorithmic pricing graphs together in one unified native client suite.</p>
      `
    },
    '2': {
      title: 'The Secret Algorithm Behind Buy Timing Scores & Price History',
      author: 'M. Akif Fareed',
      date: 'July 26, 2026',
      category: 'ALGORITHMS & METRIC ARCHITECTURE',
      content: `
        <p style="margin-bottom: 18px; font-size: 1.05rem;">Ever bought an electronic gadget or designer apparel item only to see it drop 40% in price the next week? PriceLens AI solves this historic consumer pain point with our proprietary <strong>Buy Timing Score™ (0–100)</strong> predictive model.</p>
        <p style="margin-bottom: 18px;">By tracking historical pricing movements across 30, 60, and 90-day intervals, the system continuously benchmarks live list prices against verified statistical baselines:</p>
        <div style="padding: 20px; background: #E6F4EA; border-radius: 16px; border: 1px solid #CEEAD6; color: #137333; margin-bottom: 20px;">
          <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 4px;"><i class="ri-award-fill"></i> Score 80–100: Historic Low!</div>
          <p style="margin: 0; font-size: 0.9rem;">Ideal time to purchase immediately. Current listing price sits within the bottom 5% of historical recordings over the trailing 90-day window.</p>
        </div>
        <div style="padding: 20px; background: #FFF0D4; border-radius: 16px; border: 1px solid #FFDF9A; color: #8C6D00; margin-bottom: 20px;">
          <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 4px;"><i class="ri-time-fill"></i> Score 40–79: Normal Market Price.</div>
          <p style="margin: 0; font-size: 0.9rem;">Fair market value. Price is stable; consider setting a background price alert if not urgently needed.</p>
        </div>
        <p>This empirical mathematical modeling gives everyday retail consumers unprecedented institutional leverage over seasonal marketing hype and dynamic dynamic pricing loops.</p>
      `
    },
    '3': {
      title: 'Spotting Fake Sales: How to Identify Artificial Retail Markups',
      author: 'M. Akif Fareed',
      date: 'July 26, 2026',
      category: 'CONSUMER PROTECTION & CRAWLING',
      content: `
        <p style="margin-bottom: 18px; font-size: 1.05rem;">During major e-commerce events such as Black Friday or Prime Day, numerous online retail establishments artificially inflate baseline item list prices days before attaching an ostentatious "50% OFF" promotional badge. In reality, the discount is completely illusory.</p>
        <p style="margin-bottom: 18px;">PriceLens AI counters this deceptive industry practice using synchronized SerpApi live crawling combined with immutable historical price logging across over 500+ global merchant storefronts.</p>
        <p>Whenever a scanned product presents a suspicious price swing, the app instantly flags an alert in the user's dashboard, exposing artificial markups in real-time and directing the user toward authentic alternative vendors.</p>
      `
    }
  };

  document.querySelectorAll('.blog-read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const blogId = btn.id.replace('blog-read-btn-', '');
      const article = blogArticlesData[blogId];

      if (article) {
        const html = `
          <div style="font-size: 0.78rem; color: #fff; background: var(--primary); display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: 800; text-transform: uppercase; margin-bottom: 14px;">${article.category}</div>
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; line-height: 1.25; margin-bottom: 12px; color: var(--text-dark);">${article.title}</h2>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px; border-bottom: 1px solid var(--outline-variant); padding-bottom: 14px; display: flex; align-items: center; gap: 6px;">
            <i class="ri-user-star-fill" style="color: var(--primary);"></i> Authored by <strong style="color: var(--text-dark);">${article.author}</strong> • <i class="ri-calendar-line"></i> ${article.date}
          </div>
          <div style="font-size: 0.98rem; color: var(--text-dark); line-height: 1.8;">${article.content}</div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--outline-variant); text-align: center;">
            <button onclick="document.getElementById('close-modal-btn').click();" class="btn btn-secondary btn-sm" style="padding: 10px 24px; border-radius: 12px; font-weight: 700;"><i class="ri-check-line"></i> Got It, Close Guide</button>
          </div>
        `;
        openModal(html);
      }
    });
  });

});
