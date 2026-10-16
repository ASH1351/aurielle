/**
 * AURIELLE — Timeless Beauty • Luxury Wear
 * Main Interactive Script & E-Commerce Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Data Store: Products & Currencies
  // --------------------------------------------------------------------------
  const currencies = {
    USD: { code: 'USD', symbol: '$', rate: 1, prefix: true },
    INR: { code: 'INR', symbol: '₹', rate: 83, prefix: true },
    EUR: { code: 'EUR', symbol: '€', rate: 0.93, prefix: true },
    GBP: { code: 'GBP', symbol: '£', rate: 0.80, prefix: true }
  };

  let currentCurrency = localStorage.getItem('aurielle_currency') || 'USD';
  let appliedDiscount = 0; // percentage, e.g. 10 for 10%

  const products = [
    {
      id: 'aur-01',
      name: 'The Seraphina Top-Handle',
      category: 'shoulder',
      categoryLabel: 'Shoulder & Top-Handle',
      priceUSD: 420,
      badge: 'NEW ARRIVAL',
      badgeClass: 'badge-gold',
      image: 'assets/images/gen-hero-bag.jpg',
      hoverImage: 'assets/images/prod-1-seraphina.jpg',
      colors: [
        { name: 'Noir Black', hex: '#0B0B0B' },
        { name: 'Aura Gold', hex: '#C6A15B' },
        { name: 'Warm Cream', hex: '#F4ECDD' }
      ],
      description: 'Hand-sculpted in Florence from full-grain calfskin leather. Features an arched architectural top handle, detachable shoulder strap, and our signature four-pointed gold star turn-lock closure.',
      specs: [
        '100% Certified Tuscan Full-Grain Calfskin',
        'Hand-polished 24k gold-toned hardware',
        'Custom protective gold base studs',
        'Interior zip compartment with embossed gold serial number'
      ],
      rating: 5,
      reviewsCount: 38
    },
    {
      id: 'aur-02',
      name: 'The Étoile Trapeze Tote',
      category: 'totes',
      categoryLabel: 'Structured Tote',
      priceUSD: 560,
      badge: 'BESTSELLER',
      badgeClass: 'badge-black',
      image: 'assets/images/gen-tote-bag.jpg',
      hoverImage: 'assets/images/cat-totes.jpg',
      colors: [
        { name: 'Tuscan Camel', hex: '#8C5528' },
        { name: 'Noir Onyx', hex: '#0B0B0B' },
        { name: 'Ivory Pebble', hex: '#EADFCB' }
      ],
      description: 'An architectural silhouette engineered for the global traveler. Features expandable winged gussets, ultra-comfortable rounded handles, and tailored laptop protection.',
      specs: [
        'Semi-structured vegetable-tanned bridle leather',
        'Generous compartment accommodates up to 15" laptop',
        'Reinforced gold hardware clasps with star motif',
        'Includes detachable calfskin zip pouch'
      ],
      rating: 5,
      reviewsCount: 64
    },
    {
      id: 'aur-03',
      name: 'The Céleste Quilted Flap',
      category: 'shoulder',
      categoryLabel: 'Shoulder Bags',
      priceUSD: 480,
      badge: 'SIGNATURE',
      badgeClass: 'badge-gold',
      image: 'assets/images/gen-quilted-bag.jpg',
      hoverImage: 'assets/images/gen-shoulder-bag.jpg',
      colors: [
        { name: 'Camel Tan', hex: '#A36E43' },
        { name: 'Crème Ivory', hex: '#F4ECDD' },
        { name: 'Noir Gold', hex: '#0B0B0B' }
      ],
      description: 'Sculpted in velvety lambskin leather with artisanal chevron quilting. Accented by a sliding braided gold chain strap that effortlessly transitions from shoulder drop to crossbody.',
      specs: [
        'Plush lambskin leather with water-resistant finish',
        'Sliding multi-wear jewel chain strap',
        'Magnetic flap with hidden gold emblem',
        'Hand-stitched perimeter with edge-paint burnishing'
      ],
      rating: 5,
      reviewsCount: 52
    },
    {
      id: 'aur-04',
      name: 'The Nocturne Star Minaudière',
      category: 'clutches',
      categoryLabel: 'Evening Clutches',
      priceUSD: 390,
      badge: 'LIMITED EDITION',
      badgeClass: 'badge-black',
      image: 'assets/images/gen-clutch-bag.jpg',
      hoverImage: 'assets/images/cat-clutches.jpg',
      colors: [
        { name: 'Deep Onyx', hex: '#0B0B0B' },
        { name: 'Gilded Amber', hex: '#C6A15B' }
      ],
      description: 'A sculptural evening showpiece. Hand-lacquered satin frame adorned with the Aurielle four-pointed gold star clasp. Holds your phone, lip elixir, and evening essentials.',
      specs: [
        'Rigid brass frame with mirror-finish 24k gold plating',
        'Lined in rich cream micro-suede',
        'Concealed drop-in delicate chain strap',
        'Numbered limited release: 1 of 250 globally'
      ],
      rating: 5,
      reviewsCount: 29
    },
    {
      id: 'aur-05',
      name: 'The Petite Aura Micro Bag',
      category: 'mini',
      categoryLabel: 'Mini & Micro Bags',
      priceUSD: 310,
      badge: 'TRENDING',
      badgeClass: 'badge-outline',
      image: 'assets/images/gen-mini-bag.jpg',
      hoverImage: 'assets/images/cat-mini.jpg',
      colors: [
        { name: 'Nude Blush', hex: '#DEC5B6' },
        { name: 'Pure Chalk', hex: '#F4ECDD' },
        { name: 'Noir', hex: '#0B0B0B' }
      ],
      description: 'Petite yet commanding. Designed for carefree gallery strolls and champagne receptions. Features an arched top handle and removable slim leather crossbody strap.',
      specs: [
        'Micro-grain calfskin leather resistant to scratches',
        'Gold star lock closure with magnetic snap',
        'Interior card slots for seamless ease',
        'Weightless ergonomic design'
      ],
      rating: 5,
      reviewsCount: 41
    },
    {
      id: 'aur-06',
      name: 'The Marquise Saddle Crossbody',
      category: 'crossbody',
      categoryLabel: 'Crossbody Bags',
      priceUSD: 440,
      badge: 'NEW ARRIVAL',
      badgeClass: 'badge-gold',
      image: 'assets/images/gen-crossbody-bag.jpg',
      hoverImage: 'assets/images/cat-crossbody.jpg',
      colors: [
        { name: 'Chestnut Tan', hex: '#783E19' },
        { name: 'Warm Taupe', hex: '#C4A482' },
        { name: 'Noir', hex: '#0B0B0B' }
      ],
      description: 'Curved equestrian-inspired contours crafted in rich chestnut bridle leather. Finished with an exquisite stirrup gold buckle and wide adjustable strap.',
      specs: [
        'Heritage saddle leather develops a unique patina over time',
        'Comfortable wide strap adjustable to 5 lengths',
        'Back slip pocket for instant phone access',
        'Hand-burnished wax-sealed edges'
      ],
      rating: 5,
      reviewsCount: 33
    },
    {
      id: 'aur-07',
      name: 'The Solstice Sculpted Bucket',
      category: 'shoulder',
      categoryLabel: 'Bucket Bags',
      priceUSD: 460,
      badge: 'NEW IN',
      badgeClass: 'badge-gold',
      image: 'assets/images/gen-bucket-bag.jpg',
      hoverImage: 'assets/images/prod-7-palais.jpg',
      colors: [
        { name: 'Chalk Ivory', hex: '#F4ECDD' },
        { name: 'Noir Black', hex: '#0B0B0B' }
      ],
      description: 'Sculptural cylindrical bucket bag in supple Italian pebbled leather. Crowned with gold drawstring eyelet grommets and an embossed base.',
      specs: [
        'Supple Italian pebble calfskin',
        'Reinforced circular base with protective gold feet',
        'Top cinch leather drawstring with gold toggles',
        'Includes internal attached pouch'
      ],
      rating: 5,
      reviewsCount: 19
    },
    {
      id: 'aur-08',
      name: 'The Étoile Vault Noir',
      category: 'totes',
      categoryLabel: 'Signature Collection',
      priceUSD: 620,
      badge: 'PRIVATE VAULT',
      badgeClass: 'badge-black',
      image: 'assets/images/gen-signature-vault.jpg',
      hoverImage: 'assets/images/signature-banner.jpg',
      colors: [
        { name: 'Noir Black', hex: '#0B0B0B' },
        { name: 'Warm Gold', hex: '#C6A15B' }
      ],
      description: 'The pinnacle of Aurielle craftsmanship. Heavyweight structured noir leather tote finished with solid 24k gold hardware emblem and hand-waxed edges.',
      specs: [
        'Master Atelier numbered limited edition',
        '24k solid-feel gold-plated turn-lock and clips',
        'Full silk-suede lined interior with security pocket',
        'Delivered in bespoke wooden presentation casket'
      ],
      rating: 5,
      reviewsCount: 45
    }
  ];

  // Cart & Wishlist state
  let cart = JSON.parse(localStorage.getItem('aurielle_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('aurielle_wishlist') || '[]');

  // Free shipping threshold in USD
  const FREE_SHIPPING_USD = 500;

  // --------------------------------------------------------------------------
  // 2. Preloader Logic
  // --------------------------------------------------------------------------
  const preloader = document.getElementById('page-preloader');
  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove();
      }, 900);
    };

    window.addEventListener('load', hidePreloader);
    // Fallback in case of slow asset loading
    setTimeout(hidePreloader, 1400);
  }

  // --------------------------------------------------------------------------
  // 3. Currency Conversion Helpers
  // --------------------------------------------------------------------------
  function formatPrice(usdPrice) {
    const cur = currencies[currentCurrency] || currencies.USD;
    const converted = Math.round(usdPrice * cur.rate);
    
    if (cur.code === 'INR') {
      return `₹${converted.toLocaleString('en-IN')}`;
    } else if (cur.code === 'EUR') {
      return `€${converted.toLocaleString()}`;
    } else if (cur.code === 'GBP') {
      return `£${converted.toLocaleString()}`;
    } else {
      return `$${converted.toLocaleString()}`;
    }
  }

  function updateCurrencyEverywhere(newCurrency) {
    currentCurrency = newCurrency;
    localStorage.setItem('aurielle_currency', newCurrency);

    // Sync all dropdowns
    document.querySelectorAll('.currency-select').forEach(select => {
      select.value = newCurrency;
    });

    // Re-render product prices
    document.querySelectorAll('[data-product-price-usd]').forEach(el => {
      const usd = parseFloat(el.getAttribute('data-product-price-usd'));
      el.textContent = formatPrice(usd);
    });

    // Update Cart Drawer & Shipping Meter
    renderCart();

    // Show toast
    showToast(`Currency changed to ${newCurrency} (${currencies[newCurrency].symbol})`);
  }

  // Bind Currency Selector Dropdowns
  document.querySelectorAll('.currency-select').forEach(select => {
    select.value = currentCurrency;
    select.addEventListener('change', (e) => {
      updateCurrencyEverywhere(e.target.value);
    });
  });

  // --------------------------------------------------------------------------
  // 4. Cursor Follower & Glow Star Trail (Desktop)
  // --------------------------------------------------------------------------
  const follower = document.querySelector('.cursor-follower');
  const dot = document.querySelector('.cursor-dot');

  if (follower && dot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.16;
      followerY += (mouseY - followerY) * 0.16;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover scale effects on interactive elements
    document.querySelectorAll('a, button, .category-card, .product-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width = '52px';
        follower.style.height = '52px';
        follower.style.background = 'rgba(198, 161, 91, 0.12)';
        follower.style.borderColor = 'var(--gold-light)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width = '28px';
        follower.style.height = '28px';
        follower.style.background = 'transparent';
        follower.style.borderColor = 'var(--gold)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Sticky Header Scroll Reaction
  // --------------------------------------------------------------------------
  const headerMain = document.querySelector('.header-main');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerMain?.classList.add('scrolled');
    } else {
      headerMain?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 6. Mobile Fullscreen Menu Controls
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.querySelector('.mobile-hamburger-btn');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    mobileMenuClose?.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    mobileMenuOverlay.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Product Catalog Rendering & Filtering
  // --------------------------------------------------------------------------
  const productsContainer = document.getElementById('products-grid-container');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const sortSelect = document.getElementById('sort-products-select');

  function renderProducts(itemsToRender) {
    if (!productsContainer) return;
    productsContainer.innerHTML = '';

    itemsToRender.forEach(prod => {
      const isWishlisted = wishlist.includes(prod.id);
      
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-category', prod.category);
      card.setAttribute('data-id', prod.id);

      card.innerHTML = `
        <div class="product-media-wrap">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" />
          <div class="product-badges">
            <span class="badge-tag ${prod.badgeClass}">
              <span class="star-motif" style="font-size:0.6rem;">✦</span> ${prod.badge}
            </span>
          </div>
          <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${prod.id}" title="Save to Wishlist" aria-label="Save to Wishlist">
            <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </button>
          <div class="product-hover-actions">
            <button class="btn-quick-add" data-quick-add-id="${prod.id}">Quick Add</button>
            <button class="btn-quick-view" data-quick-view-id="${prod.id}" title="Quick View" aria-label="Quick View">
              <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="product-details">
          <span class="product-category-label">${prod.categoryLabel}</span>
          <h3 class="product-name">${prod.name}</h3>
          <div class="product-price-row">
            <span class="product-price" data-product-price-usd="${prod.priceUSD}">${formatPrice(prod.priceUSD)}</span>
            <div class="product-swatches" title="Available Atelier Shades">
              ${prod.colors.map(c => `<span class="color-dot" style="background:${c.hex};" title="${c.name}"></span>`).join('')}
            </div>
          </div>
        </div>
      `;

      productsContainer.appendChild(card);
    });

    attachProductEventHandlers();
  }

  function filterAndSortProducts() {
    const activeTab = document.querySelector('.filter-tab.active');
    const filterVal = activeTab ? activeTab.getAttribute('data-filter') : 'all';
    const sortVal = sortSelect ? sortSelect.value : 'featured';

    let filtered = products.filter(p => {
      if (filterVal === 'all') return true;
      if (filterVal === 'new') return p.badge.includes('NEW');
      return p.category === filterVal;
    });

    if (sortVal === 'price-low') {
      filtered.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortVal === 'price-high') {
      filtered.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortVal === 'bestseller') {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    renderProducts(filtered);
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterAndSortProducts();
    });
  });

  sortSelect?.addEventListener('change', filterAndSortProducts);

  // Initial Product Render
  renderProducts(products);

  // --------------------------------------------------------------------------
  // 8. Product Action Handlers (Quick Add, Wishlist, Quick View)
  // --------------------------------------------------------------------------
  function attachProductEventHandlers() {
    // Quick Add
    document.querySelectorAll('[data-quick-add-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-quick-add-id');
        const prod = products.find(p => p.id === id);
        if (prod) {
          addToCart(prod, 1, prod.colors[0].name);
        }
      });
    });

    // Wishlist Toggle
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-wishlist-id');
        toggleWishlist(id, btn);
      });
    });

    // Quick View
    document.querySelectorAll('[data-quick-view-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-quick-view-id');
        const prod = products.find(p => p.id === id);
        if (prod) {
          openQuickViewModal(prod);
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Shopping Bag / Cart Drawer System
  // --------------------------------------------------------------------------
  const cartOverlay = document.querySelector('.cart-drawer-overlay');
  const cartCloseBtn = document.querySelector('.cart-close-btn');
  const cartTriggerBtns = document.querySelectorAll('.cart-trigger-btn');
  const cartItemsList = document.querySelector('.cart-items-body');
  const cartEmptyState = document.querySelector('.cart-empty-state');
  const cartCountBadges = document.querySelectorAll('.cart-count-badge');
  const cartSubtotalEl = document.querySelector('.cart-subtotal-val');
  const cartTotalEl = document.querySelector('.cart-total-val');
  const cartDiscountRow = document.querySelector('.cart-discount-row');
  const cartDiscountVal = document.querySelector('.cart-discount-val');
  const shippingMeterText = document.querySelector('.meter-text');
  const shippingMeterFill = document.querySelector('.meter-bar-fill');
  const promoInput = document.querySelector('.promo-input');
  const promoBtn = document.querySelector('.promo-btn');

  function openCart() {
    cartOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  cartTriggerBtns.forEach(btn => btn.addEventListener('click', openCart));
  cartCloseBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  function addToCart(product, quantity = 1, selectedColor = 'Noir Black') {
    const existingIndex = cart.findIndex(item => item.id === product.id && item.color === selectedColor);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        priceUSD: product.priceUSD,
        image: product.image,
        color: selectedColor,
        quantity: quantity
      });
    }

    saveCart();
    renderCart();
    openCart();
    showToast(`Added "${product.name}" to your shopping bag.`);
  }

  function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    saveCart();
    renderCart();
    showToast(`Removed "${item.name}" from shopping bag.`);
  }

  function updateQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
      return;
    }
    saveCart();
    renderCart();
  }

  function saveCart() {
    localStorage.setItem('aurielle_cart', JSON.stringify(cart));
  }

  function renderCart() {
    // Total Items count
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartEmptyState?.classList.add('active');
      cartItemsList.innerHTML = '';
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(0);
      if (cartTotalEl) cartTotalEl.textContent = formatPrice(0);
      if (shippingMeterFill) shippingMeterFill.style.width = '0%';
      if (shippingMeterText) {
        shippingMeterText.innerHTML = `Complimentary white-glove shipping unlocks at <span class="gold-bold">${formatPrice(FREE_SHIPPING_USD)}</span>`;
      }
      return;
    }

    cartEmptyState?.classList.remove('active');
    cartItemsList.innerHTML = '';

    let subtotalUSD = 0;

    cart.forEach((item, idx) => {
      subtotalUSD += item.priceUSD * item.quantity;
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-top">
            <div>
              <h4 class="cart-item-name">${item.name}</h4>
              <span class="cart-item-variant">${item.color}</span>
            </div>
            <button class="cart-item-remove" data-remove-index="${idx}" title="Remove item">&times;</button>
          </div>
          <div class="cart-item-bottom">
            <div class="quantity-control">
              <button class="qty-btn" data-qty-delta="-1" data-index="${idx}">−</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" data-qty-delta="1" data-index="${idx}">+</button>
            </div>
            <span class="cart-item-price">${formatPrice(item.priceUSD * item.quantity)}</span>
          </div>
        </div>
      `;
      cartItemsList.appendChild(itemEl);
    });

    // Subtotal & Discounts
    const discountUSD = subtotalUSD * (appliedDiscount / 100);
    const finalTotalUSD = subtotalUSD - discountUSD;

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotalUSD);
    if (cartDiscountRow) {
      if (appliedDiscount > 0) {
        cartDiscountRow.style.display = 'flex';
        if (cartDiscountVal) cartDiscountVal.textContent = `-${formatPrice(discountUSD)} (${appliedDiscount}%)`;
      } else {
        cartDiscountRow.style.display = 'none';
      }
    }
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(finalTotalUSD);

    // Free Shipping Meter Calculation
    const progressPercent = Math.min(100, Math.round((subtotalUSD / FREE_SHIPPING_USD) * 100));
    if (shippingMeterFill) shippingMeterFill.style.width = `${progressPercent}%`;

    if (shippingMeterText) {
      if (subtotalUSD >= FREE_SHIPPING_USD) {
        shippingMeterText.innerHTML = `✦ You have unlocked <span class="gold-bold">Complimentary Worldwide White-Glove Shipping</span>!`;
      } else {
        const remaining = FREE_SHIPPING_USD - subtotalUSD;
        shippingMeterText.innerHTML = `Add <span class="gold-bold">${formatPrice(remaining)}</span> more to unlock Complimentary Worldwide Shipping`;
      }
    }

    // Bind item buttons
    cartItemsList.querySelectorAll('[data-remove-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(parseInt(btn.getAttribute('data-remove-index')));
      });
    });

    cartItemsList.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        const delta = parseInt(btn.getAttribute('data-qty-delta'));
        updateQuantity(idx, delta);
      });
    });
  }

  // Promo Code Handler
  promoBtn?.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === 'AURA10') {
      appliedDiscount = 10;
      showToast('Exclusive 10% Aurielle Circle Privilège applied!');
      renderCart();
    } else if (code === 'GOLDEN') {
      appliedDiscount = 15;
      showToast('VIP Golden Concierge 15% discount applied!');
      renderCart();
    } else {
      showToast('Invalid or expired VIP invitation code.');
    }
  });

  // Initial cart render
  renderCart();

  // --------------------------------------------------------------------------
  // 10. Wishlist System
  // --------------------------------------------------------------------------
  const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
  const wishlistDrawerOverlay = document.querySelector('.wishlist-overlay');
  const wishlistCloseBtn = document.querySelector('.wishlist-close-btn');
  const wishlistTriggerBtns = document.querySelectorAll('.wishlist-trigger-btn');
  const wishlistItemsContainer = document.querySelector('.wishlist-items-body');

  function updateWishlistBadge() {
    wishlistBadges.forEach(badge => {
      badge.textContent = wishlist.length;
      badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
  }

  function toggleWishlist(id, triggerElement = null) {
    const index = wishlist.indexOf(id);
    const prod = products.find(p => p.id === id);

    if (index > -1) {
      wishlist.splice(index, 1);
      showToast(`Removed "${prod?.name}" from your Wishlist.`);
    } else {
      wishlist.push(id);
      showToast(`Saved "${prod?.name}" to your Wishlist.`);
    }

    localStorage.setItem('aurielle_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();

    // Toggle heart active state on buttons
    document.querySelectorAll(`[data-wishlist-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', wishlist.includes(id));
    });

    renderWishlistDrawer();
  }

  function openWishlistDrawer() {
    wishlistDrawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderWishlistDrawer();
  }

  function closeWishlistDrawer() {
    wishlistDrawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  wishlistTriggerBtns.forEach(btn => btn.addEventListener('click', openWishlistDrawer));
  wishlistCloseBtn?.addEventListener('click', closeWishlistDrawer);
  wishlistDrawerOverlay?.addEventListener('click', (e) => {
    if (e.target === wishlistDrawerOverlay) closeWishlistDrawer();
  });

  function renderWishlistDrawer() {
    if (!wishlistItemsContainer) return;
    wishlistItemsContainer.innerHTML = '';

    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = `
        <div style="text-align:center; padding: 4rem 1rem;">
          <div class="star-motif" style="font-size:2rem; margin-bottom:1rem;">✦</div>
          <p style="color:var(--text-muted);">Your private wishlist is currently empty.<br>Save your favorite creations to curate your collection.</p>
        </div>
      `;
      return;
    }

    wishlist.forEach(id => {
      const prod = products.find(p => p.id === id);
      if (!prod) return;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-top">
            <div>
              <h4 class="cart-item-name">${prod.name}</h4>
              <span class="cart-item-variant">${prod.categoryLabel}</span>
            </div>
            <button class="cart-item-remove" data-remove-wishlist="${prod.id}" title="Remove from wishlist">&times;</button>
          </div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${formatPrice(prod.priceUSD)}</span>
            <button class="btn btn-black" style="padding:0.4rem 0.9rem; font-size:0.65rem;" data-move-to-bag="${prod.id}">Move to Bag</button>
          </div>
        </div>
      `;
      wishlistItemsContainer.appendChild(itemEl);
    });

    wishlistItemsContainer.querySelectorAll('[data-remove-wishlist]').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleWishlist(btn.getAttribute('data-remove-wishlist'));
      });
    });

    wishlistItemsContainer.querySelectorAll('[data-move-to-bag]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-move-to-bag');
        const prod = products.find(p => p.id === id);
        if (prod) {
          addToCart(prod, 1, prod.colors[0].name);
          toggleWishlist(id);
        }
      });
    });
  }

  updateWishlistBadge();

  // --------------------------------------------------------------------------
  // 11. Product Quick-View Modal
  // --------------------------------------------------------------------------
  const quickViewOverlay = document.getElementById('quick-view-modal');
  const quickViewClose = document.querySelector('.modal-close-btn');

  function openQuickViewModal(product) {
    if (!quickViewOverlay) return;

    let selectedColorName = product.colors[0].name;
    let selectedQty = 1;

    quickViewOverlay.innerHTML = `
      <div class="modal-window">
        <button class="modal-close-btn" aria-label="Close dialog">&times;</button>
        <div class="modal-grid">
          <div class="modal-gallery">
            <img src="${product.image}" alt="${product.name}" id="modal-primary-image" />
          </div>
          <div class="modal-details">
            <span class="modal-category">${product.categoryLabel}</span>
            <h2 class="modal-title">${product.name}</h2>
            <div class="modal-price" data-product-price-usd="${product.priceUSD}">${formatPrice(product.priceUSD)}</div>
            <p class="modal-desc">${product.description}</p>
            
            <div style="margin-bottom: 1.5rem;">
              <label style="display:block; font-size:0.75rem; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:0.6rem; color:var(--text-main);">
                Selected Shade: <strong id="modal-shade-label" style="color:var(--gold-dark);">${selectedColorName}</strong>
              </label>
              <div style="display:flex; gap:0.6rem;">
                ${product.colors.map((c, i) => `
                  <button class="modal-color-swatch ${i === 0 ? 'active' : ''}" data-color-name="${c.name}" style="width:28px; height:28px; border-radius:50%; background:${c.hex}; border:2px solid ${i === 0 ? 'var(--gold)' : 'transparent'}; cursor:pointer;" title="${c.name}"></button>
                `).join('')}
              </div>
            </div>

            <ul class="modal-features">
              ${product.specs.map(s => `
                <li class="modal-feature-item">
                  <span class="star-bullet">✦</span>
                  <span>${s}</span>
                </li>
              `).join('')}
            </ul>

            <div style="display:flex; gap:1rem; align-items:center; margin-top:auto;">
              <div class="quantity-control" style="padding:0.4rem 0.6rem;">
                <button class="qty-btn" id="modal-qty-minus">−</button>
                <span class="qty-num" id="modal-qty-val">1</span>
                <button class="qty-btn" id="modal-qty-plus">+</button>
              </div>
              <button class="btn btn-black" id="modal-add-to-bag-btn" style="flex:1;">
                Add to Shopping Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    quickViewOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Modal internal handlers
    const closeBtn = quickViewOverlay.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeQuickViewModal);

    // Color Swatches
    quickViewOverlay.querySelectorAll('.modal-color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        quickViewOverlay.querySelectorAll('.modal-color-swatch').forEach(s => s.style.borderColor = 'transparent');
        swatch.style.borderColor = 'var(--gold)';
        selectedColorName = swatch.getAttribute('data-color-name');
        quickViewOverlay.querySelector('#modal-shade-label').textContent = selectedColorName;
      });
    });

    // Quantity
    const qtyVal = quickViewOverlay.querySelector('#modal-qty-val');
    quickViewOverlay.querySelector('#modal-qty-minus').addEventListener('click', () => {
      if (selectedQty > 1) {
        selectedQty--;
        qtyVal.textContent = selectedQty;
      }
    });
    quickViewOverlay.querySelector('#modal-qty-plus').addEventListener('click', () => {
      selectedQty++;
      qtyVal.textContent = selectedQty;
    });

    // Add to Bag
    quickViewOverlay.querySelector('#modal-add-to-bag-btn').addEventListener('click', () => {
      addToCart(product, selectedQty, selectedColorName);
      closeQuickViewModal();
    });
  }

  function closeQuickViewModal() {
    quickViewOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  quickViewOverlay?.addEventListener('click', (e) => {
    if (e.target === quickViewOverlay) closeQuickViewModal();
  });

  // --------------------------------------------------------------------------
  // 12. Instant Search Modal
  // --------------------------------------------------------------------------
  const searchOverlay = document.getElementById('search-overlay');
  const searchTriggerBtns = document.querySelectorAll('.search-trigger-btn');
  const searchCloseBtn = document.querySelector('.search-close-btn');
  const searchInput = document.getElementById('search-input-field');
  const searchResultsGrid = document.querySelector('.search-live-results');
  const searchTagChips = document.querySelectorAll('.search-tag-chip');

  function openSearchModal() {
    searchOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 150);
  }

  function closeSearchModal() {
    searchOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchTriggerBtns.forEach(btn => btn.addEventListener('click', openSearchModal));
  searchCloseBtn?.addEventListener('click', closeSearchModal);
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearchModal();
  });

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      if (searchResultsGrid) searchResultsGrid.innerHTML = '';
      return;
    }

    const matches = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.categoryLabel.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    renderSearchResults(matches);
  });

  searchTagChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const term = chip.getAttribute('data-tag');
      if (searchInput) {
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  });

  function renderSearchResults(items) {
    if (!searchResultsGrid) return;
    if (items.length === 0) {
      searchResultsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">No atelier creations found matching your inquiry.</p>`;
      return;
    }

    searchResultsGrid.innerHTML = items.map(p => `
      <div class="product-card" style="cursor:pointer;" data-search-result-id="${p.id}">
        <div class="product-media-wrap">
          <img src="${p.image}" alt="${p.name}" style="height:140px; width:100%; object-fit:cover;" />
        </div>
        <div style="padding:0.8rem; text-align:center;">
          <h4 style="font-family:var(--font-serif); font-size:1.05rem;">${p.name}</h4>
          <span style="font-size:0.85rem; font-weight:600; color:var(--gold-dark);">${formatPrice(p.priceUSD)}</span>
        </div>
      </div>
    `).join('');

    searchResultsGrid.querySelectorAll('[data-search-result-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-search-result-id');
        const prod = products.find(p => p.id === id);
        if (prod) {
          closeSearchModal();
          openQuickViewModal(prod);
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 13. Testimonials Carousel
  // --------------------------------------------------------------------------
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dotsContainer = document.querySelector('.testimonial-dots');
  let currentTestimonialIndex = 0;

  function showTestimonial(index) {
    testimonialCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === index);
    });

    const dots = dotsContainer?.querySelectorAll('.t-dot');
    dots?.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  // Generate dots
  if (dotsContainer && testimonialCards.length > 0) {
    dotsContainer.innerHTML = '';
    testimonialCards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `t-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentTestimonialIndex = idx;
        showTestimonial(idx);
      });
      dotsContainer.appendChild(dot);
    });
  }

  nextBtn?.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(currentTestimonialIndex);
  });

  prevBtn?.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonialIndex);
  });

  // Auto rotate testimonials
  setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(currentTestimonialIndex);
  }, 7000);

  // --------------------------------------------------------------------------
  // 14. Newsletter VIP Club Form
  // --------------------------------------------------------------------------
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter-input');
    if (input && input.value) {
      showToast(`Welcome to the Aurielle Circle. Your welcome gift was sent to ${input.value}.`);
      input.value = '';
    }
  });

  // --------------------------------------------------------------------------
  // 15. Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-star">✦</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // 16. Keyboard Shortcuts (Escape to close modals)
  // --------------------------------------------------------------------------
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeWishlistDrawer();
      closeQuickViewModal();
      closeSearchModal();
      if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

});
