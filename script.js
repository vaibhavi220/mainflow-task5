let products = [];
let currentBill = {
    transactionId: '',
    date: '',
    paymentMethod: 'Cash'
};

// Generate unique transaction ID
function generateTransactionId() {
    return 'TRX-' + Date.now().toString(36).toUpperCase();
}

// Add product to list
function addProduct() {
    const product = {
        name: document.getElementById('productName').value,
        quantity: parseInt(document.getElementById('productQty').value),
        price: parseFloat(document.getElementById('productPrice').value)
    };

    if (product.name && product.quantity && product.price) {
        products.push(product);
        updateProductTable();
        clearProductInputs();
    }
}

// Update bill preview table
function updateProductTable() {
    const tbody = document.getElementById('invoiceBody');
    tbody.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>$${(product.quantity * product.price).toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
    
    calculateTotals();
}

// Calculate subtotal and total
function calculateTotals() {
    const subtotal = products.reduce((sum, product) => 
        sum + (product.quantity * product.price), 0);
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('totalAmount').textContent = subtotal.toFixed(2);
}

// Generate complete bill
function generateBill() {
    currentBill = {
        transactionId: generateTransactionId(),
        date: new Date().toLocaleDateString(),
        buyer: {
            name: document.getElementById('buyerName').value,
            address: document.getElementById('buyerAddress').value,
            phone: document.getElementById('buyerPhone').value,
            email: document.getElementById('buyerEmail').value
        },
        products: [...products],
        subtotal: parseFloat(document.getElementById('subtotal').textContent),
        total: parseFloat(document.getElementById('totalAmount').textContent)
    };

    updatePreviewDetails();
}

// Update preview section with current data
function updatePreviewDetails() {
    document.getElementById('previewName').textContent = currentBill.buyer.name;
    document.getElementById('previewAddress').textContent = currentBill.buyer.address;
    document.getElementById('previewContact').textContent = 
        `${currentBill.buyer.phone} | ${currentBill.buyer.email}`;
    
    document.getElementById('transactionId').textContent = currentBill.transactionId;
    document.getElementById('transactionDate').textContent = currentBill.date;
}

// Save bill to localStorage
function saveBill() {
    const bills = JSON.parse(localStorage.getItem('bills')) || [];
    bills.push(currentBill);
    localStorage.setItem('bills', JSON.stringify(bills));
    alert('Bill saved successfully!');
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toUpperCase();
    const bills = JSON.parse(localStorage.getItem('bills')) || [];
    
    const foundBill = bills.find(bill => 
        bill.transactionId.toUpperCase().includes(searchTerm)
    );
    
    if (foundBill) {
        currentBill = foundBill;
        products = foundBill.products;
        updatePreviewDetails();
        updateProductTable();
    }
});
function generateBill() {
    currentBill = {
        transactionId: generateTransactionId(),
        date: new Date().toLocaleDateString(),
        paymentMethod: document.getElementById('paymentMethod').value, // Get selected payment method
        buyer: {
            name: document.getElementById('buyerName').value,
            address: document.getElementById('buyerAddress').value,
            phone: document.getElementById('buyerPhone').value,
            email: document.getElementById('buyerEmail').value
        },
        products: [...products],
        subtotal: parseFloat(document.getElementById('subtotal').textContent),
        total: parseFloat(document.getElementById('totalAmount').textContent)
    };

    updatePreviewDetails();
}

// Update preview section with current data
function updatePreviewDetails() {
    document.getElementById('previewName').textContent = currentBill.buyer.name;
    document.getElementById('previewAddress').textContent = currentBill.buyer.address;
    document.getElementById('previewContact').textContent = 
        `${currentBill.buyer.phone} | ${currentBill.buyer.email}`;
    
    document.getElementById('transactionId').textContent = currentBill.transactionId;
    document.getElementById('transactionDate').textContent = currentBill.date;
    document.getElementById('paymentMethodDisplay').textContent = currentBill.paymentMethod; // Display payment method
}

// Export to PDF
function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.html(document.getElementById('invoicePreview'), {
        callback: function(doc) {
            doc.save(`invoice_${currentBill.transactionId}.pdf`);
        },
        margin: [10, 10, 10, 10],
        autoPaging: 'text'
    });
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Check saved preference on page load
function initializeTheme() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Call initializeTheme when page loads
window.addEventListener('load', initializeTheme);


// Helper functions
function clearProductInputs() {
    document.getElementById('productName').value = '';
    document.getElementById('productQty').value = '';
    document.getElementById('productPrice').value = '';
}

function printInvoice() {
    window.print();
}

// Initialize default transaction ID
document.getElementById('transactionId').textContent = generateTransactionId();