var successEl = document.querySelector('.success')
var errorEl = document.querySelector('.error')
var slowEl = document.querySelector('.slowly')
var loadingEl = document.querySelector('.loading')
var licenseEl = document.querySelector('#license-license')
var licenseNameEl = document.querySelector('#license-name')
var licenseEmailEl = document.querySelector('#license-email')
hideEl(successEl)
hideEl(errorEl)
hideEl(slowEl)
showEl(loadingEl)
function getUrlParameter(name) {
    name = name
        .replace(/[\[]/, '\\[')
        .replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null
        ? ''
        : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


let licenseId = getUrlParameter('id')

function displayLicense(lName, email, licenseKey, receiptUrl) {
    console.log(lName, email, licenseKey)
    licenseEl.innerHTML = licenseKey
    licenseNameEl.innerHTML = lName
    licenseEmailEl.innerHTML = email
}

var counter = 0

function getPaymentConfirmation() {
    fetch(`/.netlify/functions/license?id=${licenseId}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            counter++
            if (counter === 12) {
                showEl(errorEl)
                hideEl(loadingEl)
                hideEl(slowEl)
                return false;
            }
            if (data.message === "missing") {
                throw "No record in database of your payment yet. "
            }
            let charge = data
                .event
                .data
                .object
                .charges
                .data[0]
            displayLicense(charge.billing_details.name, charge.billing_details.email, data.license, charge.receipt_url)
            hideEl(loadingEl)
            hideEl(slowEl)
            showEl(successEl)
        })
        .catch(error => {
            console.log(error)
            showEl(slowEl)
            setTimeout(getPaymentConfirmation, 2000)
        })
}
getPaymentConfirmation()
