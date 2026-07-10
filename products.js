const PRODUCTS = [
  // Kudu (images 1–7)
  {
    id: 'kudu-wors',
    category: 'Kudu',
    name: 'Wors',
    price: 100,
    desc: 'Fresh boerewors, coarsely ground and well-spiced, ready for the fire.',
    image: 'image1.jpeg'
  },
  {
    id: 'kudu-stewmince',
    category: 'Kudu',
    name: 'Stew & Mince',
    price: 60,
    desc: 'Cubed or minced kudu, perfect for slow-cooked stews and everyday cooking.',
    image: 'image2.jpeg'
  },
  {
    id: 'kudu-tbone',
    category: 'Kudu',
    name: 'T-Bone & Braai',
    price: 100,
    desc: 'Bone-in T-bone and mixed braai cuts, perfect for the weekend fire.',
    image: 'image3.jpeg'
  },
  {
    id: 'kudu-chuck',
    category: 'Kudu',
    name: 'Chuck',
    price: 70,
    desc: 'Well-marbled chuck cuts, ideal for slow braising and potjies.',
    image: 'image4.jpeg'
  },
  {
    id: 'kudu-bones',
    category: 'Kudu',
    name: 'Meat with Bones',
    price: 40,
    desc: 'Economical bone-in cuts, great for stock, soup, and hearty stews.',
    image: 'image5.jpeg'
  },
  {
    id: 'kudu-steak',
    category: 'Kudu',
    name: 'Steak (No Bones)',
    price: 100,
    desc: 'Lean, boneless kudu steak, cut to order and trimmed clean.',
    image: 'image6.jpeg'
  },
  {
    id: 'kudu-biltong',
    category: 'Kudu',
    name: 'Biltong, Chilli Bites & Dry Wors',
    price: 300,
    desc: 'Air-dried the traditional way — whole biltong, chilli bites, or dry wors.',
    image: 'image7.jpeg'
  },

  // Pork (images 8–13)
  {
    id: 'pig-ribs',
    category: 'Pig',
    name: 'Pork Ribs',
    price: 100,
    desc: 'Meaty pork ribs, perfect for slow roasting or the braai.',
    image: 'image8.jpeg'
  },
  {
    id: 'pig-stew',
    category: 'Pig',
    name: 'Pork Stew',
    price: 50,
    desc: 'Cubed pork for slow-cooked stews and casseroles.',
    image: 'image9.jpeg'
  },
  {
    id: 'pig-chops',
    category: 'Pig',
    name: 'Leg & Shoulder Chops',
    price: 80,
    desc: 'Thick-cut leg and shoulder chops, great for grilling or pan-frying.',
    image: 'image10.jpeg'
  },
  {
    id: 'pig-tenderloin',
    category: 'Pig',
    name: 'Pork Tenderloin & Pork Belly',
    price: 80,
    desc: 'Tender fillet or rich, fatty belly — your choice of cut.',
    image: 'image11.jpeg'
  },
  {
    id: 'pig-trotter',
    category: 'Pig',
    name: 'Trotter / Meat with Bones',
    price: 40,
    desc: 'Trotters and bone-in cuts, great for stock, soup, and slow cooking.',
    image: 'image12.jpeg'
  },
  {
    id: 'pig-steak',
    category: 'Pig',
    name: 'Steak',
    price: 100,
    desc: 'Pork steak, cut fresh and trimmed to order.',
    image: 'image13.jpeg'
  }
];

function buildTile(product) {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'product-tile';
  tile.setAttribute('data-id', product.id);
  tile.setAttribute('aria-haspopup', 'dialog');

  tile.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy">
    <div class="tile-info">
      <span class="tile-name">${product.name}</span>
      <span class="tile-hint">R${product.price} / kg &middot; Tap for details</span>
    </div>
  `;

  tile.addEventListener('click', () => openDetail(product));
  return tile;
}

function renderCategory(containerId, categoryName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = PRODUCTS.filter((p) => p.category === categoryName);
  items.forEach((product) => container.appendChild(buildTile(product)));
}

// detail panel
let lastFocusedTile = null;

function openDetail(product) {
  const backdrop = document.getElementById('detailBackdrop');
  const panel = document.getElementById('detailPanel');
  if (!backdrop || !panel) return;

  lastFocusedTile = document.activeElement;

  // Set the image
  const detailImg = panel.querySelector('.detail-media img');
  if (detailImg) {
    detailImg.src = product.image;
    detailImg.alt = product.name;
  }

  panel.querySelector('.detail-category').textContent = product.category === 'Kudu' ? 'Game meat' : 'Pork';
  panel.querySelector('.detail-name').textContent = product.name;
  panel.querySelector('.detail-desc').textContent = product.desc;
  panel.querySelector('.detail-price-value').textContent = `R${product.price}`;

  const waLink = panel.querySelector('.detail-order-link');
  if (waLink) {
    const message = encodeURIComponent(
      `Hello Wild Butcher, I would like to order ${product.name} (R${product.price} p/kg).`
    );
    waLink.href = `https://wa.me/27796759016?text=${message}`;
  }

  backdrop.classList.add('is-open');
  panel.classList.add('is-open');
  document.body.classList.add('nav-open');

  const closeBtn = panel.querySelector('.detail-close');
  if (closeBtn) closeBtn.focus();
}

function closeDetail() {
  const backdrop = document.getElementById('detailBackdrop');
  const panel = document.getElementById('detailPanel');
  if (!backdrop || !panel) return;

  backdrop.classList.remove('is-open');
  panel.classList.remove('is-open');
  document.body.classList.remove('nav-open');

  if (lastFocusedTile) lastFocusedTile.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategory('kuduGrid', 'Kudu');
  renderCategory('pigGrid', 'Pig');

  const backdrop = document.getElementById('detailBackdrop');
  const closeBtn = document.querySelector('.detail-close');

  if (backdrop) backdrop.addEventListener('click', closeDetail);
  if (closeBtn) closeBtn.addEventListener('click', closeDetail);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetail();
  });
});