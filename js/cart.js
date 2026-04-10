var items = {
  "item-1": { price: 109.95, qty: 1 },
  "item-2": { price: 22.30, qty: 1 },
  "item-3": { price: 55.99, qty: 1 }
};

function changeQty(id, delta) {
  items[id].qty += delta;
  if (items[id].qty <= 0) {
    removeItem(id);
    return;
  }
  var n = id.split("-")[1];
  document.getElementById("qty-" + n).textContent = items[id].qty;
  document.getElementById("sub-" + n).textContent =
    items[id].qty + " x $" + items[id].price.toFixed(2);
  updateSummary();
}

function removeItem(id) {
  delete items[id];
  var el = document.getElementById(id);
  if (el) el.remove();
  updateSummary();
  if (Object.keys(items).length === 0) showEmpty();
}

function showEmpty() {
  document.getElementById("cartItemsList").innerHTML =
    '<div class="empty-cart">' +
    '<i class="fa fa-shopping-cart"></i>' +
    '<p>Your cart is empty.</p>' +
    '<a href="products.html" class="btn btn-solid" style="margin-top:12px;">Browse Products</a>' +
    '</div>';
}

function updateSummary() {
  var subtotal = 0;
  var totalQty = 0;
  Object.keys(items).forEach(function (k) {
    subtotal += items[k].price * items[k].qty;
    totalQty += items[k].qty;
  });
  var shipping = subtotal > 0 ? 30 : 0;
  document.getElementById("summaryCount").textContent = totalQty;
  document.getElementById("summaryProducts").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("summaryShipping").textContent = "$" + shipping;
  document.getElementById("summaryTotal").textContent = "$" + (subtotal + shipping).toFixed(2);
}

function doCheckout() {
  if (Object.keys(items).length === 0) return;
  Object.keys(items).forEach(function (k) { delete items[k]; });
  document.getElementById("cartItemsList").innerHTML =
    '<div class="empty-cart">' +
    '<i class="fa fa-check-circle" style="color:#198754;"></i>' +
    '<p style="margin-top:10px;">Order placed! Thank you for shopping.</p>' +
    '<a href="products.html" class="btn btn-solid" style="margin-top:14px;">Continue Shopping</a>' +
    '</div>';
  updateSummary();
}

updateSummary();
