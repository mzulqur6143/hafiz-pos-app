// Bill ki maloomat aur menu items ki rates
const menu = {
  'Chicken Tikka Biryani': { rate: 480, unit: 'kg' },
  'Raita': { rate: 60, unit: 'unit' },
  'Salad': { rate: 60, unit: 'unit' },
};

let billItems = [];
let billNumber = 1;

// Tareekh (date) set karna
const setDate = () => {
  const date = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  document.getElementById('billDate').textContent = date.toLocaleDateString('en-GB', options);
};

// Bill number set karna
const setBillNumber = () => {
  document.getElementById('billNumber').textContent = `Bill No: ${billNumber}`;
};

// Bill table mein item add karna
const addItemToBill = (item, rate, qty) => {
  const billBody = document.getElementById('billBody');
  const newRow = document.createElement('tr');
  
  const serialNo = billItems.length + 1;
  const unitText = item.unit === 'kg' ? `${qty} Kg` : `${qty} Unit`;
  
  newRow.innerHTML = `
    <td>${serialNo}</td>
    <td>${item.name}</td>
    <td>${unitText}</td>
    <td>Rs. ${rate * qty}</td>
  `;
  
  billBody.appendChild(newRow);
  billItems.push({ name: item.name, qty, total: rate * qty });
  
  updateGrandTotal();
};

// Grand total ka hisab lagana
const updateGrandTotal = () => {
  const total = billItems.reduce((sum, item) => sum + item.total, 0);
  document.getElementById('grandTotal').textContent = `Rs. ${total}`;
};

// Buttons ko handle karna
document.addEventListener('DOMContentLoaded', () => {
  setDate();
  setBillNumber();
  
  document.querySelectorAll('.menu-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const itemName = e.target.dataset.item;
      const itemRate = parseFloat(e.target.dataset.rate);
      const itemUnit = e.target.dataset.unit;
      
      let quantity = 1;
      
      // Simple prompt se quantity lena
      const qtyInput = prompt(`Kitni ${itemName} chahiye?`);
      if (qtyInput) {
        quantity = parseFloat(qtyInput);
      }
      
      if (!isNaN(quantity) && quantity > 0) {
        addItemToBill({ name: itemName, unit: itemUnit }, itemRate, quantity);
      } else {
        alert('Maazrat, aap ne ghalat maqdaar (quantity) daali hai.');
      }
    });
  });
  
  // New Bill button ka code
  document.getElementById('newBillBtn').addEventListener('click', () => {
    billItems = [];
    document.getElementById('billBody').innerHTML = '';
    updateGrandTotal();
    billNumber++;
    setBillNumber();
    alert('Naya bill shuru ho gaya hai.');
  });

  // Print button ka code
  document.getElementById('printBtn').addEventListener('click', () => {
      window.print();
  });

  // WhatsApp button ka code
  document.getElementById('whatsappBtn').addEventListener('click', () => {
      const total = billItems.reduce((sum, item) => sum + item.total, 0);
      let whatsappMessage = `Hafiz Chicken Tikka Biryani Order:\n\n`;
      billItems.forEach((item, index) => {
          whatsappMessage += `${index + 1}. ${item.name} x ${item.qty} = Rs. ${item.total}\n`;
      });
      whatsappMessage += `\nGrand Total: Rs. ${total}`;
      
      // WhatsApp API ke zariye message send karna
      const url = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(url, '_blank').focus();
  });
  
});
