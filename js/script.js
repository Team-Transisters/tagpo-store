document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const subject = document.getElementById("contactSubject").value;
        const purpose = document.getElementById("contactPurpose").value;

        const recipient = "hello@examplewebsite142.com";
        const mailSubject = encodeURIComponent(subject);
        const mailBody = encodeURIComponent(
            'Name: ${name}\nEmail: ${email}\nPurpose: ${purpose}'
        );

        window.location.href = "mailto:${recipient}?subject=${mailSubject}&body=${mailBody}";
      });
    }
});

const orderForm = document.getElementById("orderForm");

if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("productName").value;
        const email = document.getElementById("orderSize").value;
        const product = document.getElementById("orderQuantity").value;
        const quantity = document.getElementById("customerName").value;

        const recipient = "orders@examplewebsite142.com";
        const mailSubject = encodeURIComponent("Order Request: ${productName}'");
        const mailBody = encodeURIComponent(
            'Customer Name: ${customerName}\n' +
            'Item: ${productName}\n' +
            'Size: ${orderSize}\n' +
            'Quantity: ${orderQuantity}\n\n' +
            'Please provide any additional details or special requests here.'
        );

        window.location.href = 'mailto:${recipient}?subject=${mailSubject}&body=${mailBody}';
    });
}