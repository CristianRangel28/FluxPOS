// Interacciones de los mockups de FluxPOS (JavaScript puro, sin dependencias).
const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const money = (n) => '$ ' + Math.round(n).toLocaleString('es-CO')
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg
  document.body.appendChild(t); setTimeout(() => t.remove(), 1800)
}

// Login: solo navega al dashboard
const login = $('#login-form')
if (login) login.addEventListener('submit', (e) => { e.preventDefault(); location.href = 'dashboard.html' })

// Paneles laterales (drawers)
$$('[data-open]').forEach((b) => b.addEventListener('click', () => $('#' + b.dataset.open).classList.add('open')))
$$('.drawer-backdrop').forEach((bd) => {
  bd.addEventListener('click', (e) => { if (e.target === bd || e.target.closest('[data-close]')) bd.classList.remove('open') })
})
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $$('.drawer-backdrop.open').forEach((d) => d.classList.remove('open')) })

// Validación visual de formularios (campos con data-req)
$$('[data-save]').forEach((btn) => btn.addEventListener('click', () => {
  const drawer = btn.closest('.drawer')
  let ok = true
  $$('[data-req]', drawer).forEach((el) => {
    const bad = el.tagName === 'SELECT' ? !el.value : el.type === 'number' ? el.value === '' || Number(el.value) <= (el.min === '1' ? 0 : -1) : !el.value.trim()
    el.closest('.field').classList.toggle('bad', bad)
    if (bad) ok = false
  })
  if (ok) { drawer.closest('.drawer-backdrop').classList.remove('open'); toast('Guardado (mockup)') }
}))

// Pestañas
$$('[data-tabs]').forEach((group) => {
  const buttons = $$('button', group)
  const show = (id) => {
    buttons.forEach((b) => b.classList.toggle('on', b.dataset.target === id))
    buttons.forEach((b) => $('#' + b.dataset.target).classList.toggle('active', b.dataset.target === id))
  }
  buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.target)))
  show(buttons.find((b) => b.classList.contains('on')).dataset.target)
})

// Búsqueda + filtro por categoría + solo alertas en tablas
function applyFilters(table) {
  const q = ($(`[data-filter="#${table.id}"]`)?.value || '').toLowerCase()
  const chip = $(`[data-chips="#${table.id}"] .chip.on`)
  const cat = chip ? chip.dataset.cat : 'Todas'
  const alerts = $(`[data-alerts="#${table.id}"]`)?.checked
  let shown = 0
  $$('tbody [data-row]', table).forEach((tr) => {
    const vis = tr.textContent.toLowerCase().includes(q) && (cat === 'Todas' || tr.dataset.cat === cat) && (!alerts || tr.dataset.alert === '1')
    tr.classList.toggle('hidden', !vis); if (vis) shown++
  })
  $('#' + table.id + '-empty')?.classList.toggle('hidden', shown > 0)
}
$$('table[id]').forEach((table) => {
  $(`[data-filter="#${table.id}"]`)?.addEventListener('input', () => applyFilters(table))
  $$(`[data-chips="#${table.id}"] .chip`).forEach((c) => c.addEventListener('click', () => {
    $$(`[data-chips="#${table.id}"] .chip`).forEach((x) => x.classList.remove('on')); c.classList.add('on'); applyFilters(table)
  }))
  $(`[data-alerts="#${table.id}"]`)?.addEventListener('change', () => applyFilters(table))
})

// Punto de venta: carrito
const cartEl = $('#cart-lines')
if (cartEl) {
  const cart = new Map()
  const tiles = $$('[data-add]')
  const render = () => {
    let total = 0, invalid = false
    cartEl.innerHTML = ''
    if (!cart.size) cartEl.innerHTML = '<li class="empty">Agrega productos para iniciar la venta.</li>'
    cart.forEach((l, id) => {
      const over = l.qty > l.stock; if (over) invalid = true
      total += l.price * l.qty
      const li = document.createElement('li'); if (over) li.className = 'bad'
      li.innerHTML = `<div class="cart-name"><b>${l.name}</b><small>${money(l.price)} c/u${over ? ' · Solo hay ' + l.stock + ' en stock' : ''}</small></div>
        <div class="qty"><button data-d="-1" aria-label="Menos">−</button><span>${l.qty}</span><button data-d="1" aria-label="Más">＋</button></div>
        <span class="amount line-total">${money(l.price * l.qty)}</span><button class="row-action" data-x aria-label="Quitar">✕</button>`
      li.addEventListener('click', (e) => {
        if (e.target.dataset.d) l.qty = Math.max(1, l.qty + Number(e.target.dataset.d))
        else if (e.target.hasAttribute('data-x')) cart.delete(id); else return
        render()
      })
      cartEl.appendChild(li)
    })
    $('#cart-total').textContent = money(total)
    $('#cart-confirm').disabled = !cart.size || invalid
  }
  tiles.forEach((t) => t.addEventListener('click', () => {
    const id = t.dataset.id, l = cart.get(id)
    l ? l.qty++ : cart.set(id, { name: t.dataset.name, price: +t.dataset.price, stock: +t.dataset.stock, qty: 1 })
    render()
  }))
  $('#pos-search').addEventListener('input', (e) => tiles.forEach((t) => t.classList.toggle('hidden', !t.dataset.text.includes(e.target.value.toLowerCase()))))
  $$('[data-pay]').forEach((c) => c.addEventListener('click', () => { $$('[data-pay]').forEach((x) => x.classList.remove('on')); c.classList.add('on') }))
  $('#cart-confirm').addEventListener('click', () => { cart.clear(); render(); toast('✓ Venta registrada (mockup)') })
  // Estado inicial de ejemplo
  ;['1', '4'].forEach((id) => $(`[data-id="${id}"]`).click())
}

// Compras: líneas dinámicas y total
const lines = $('#lines')
if (lines) {
  const calc = () => {
    let t = 0
    $$('[data-line]', lines).forEach((l) => { t += Number($('[data-qty]', l).value || 0) * Number($('[data-cost]', l).value || 0) })
    $('#purchase-total').textContent = money(t)
  }
  lines.addEventListener('input', calc)
  lines.addEventListener('click', (e) => { if (e.target.hasAttribute('data-remove') && $$('[data-line]', lines).length > 1) { e.target.closest('[data-line]').remove(); calc() } })
  $('#add-line').addEventListener('click', () => { lines.appendChild($('#line-tpl').content.cloneNode(true)); calc() })
}
