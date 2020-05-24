(function () {
  var stripe = Stripe('pk_test_zWhPoJV384YeRFMxDoIn0bUY00DnIIniTt');
  let clientSecret
  let loading = document.querySelector('.loading')
  var form = document.getElementById('payment-form');
  let generalErrors = document.querySelector('.general-errors')
  let paymentRequestButton = document.querySelector('#payment-request-button')
  var elements = stripe.elements();
  var isFormHidden = true

  showEl(loading)
  hideEl(form)

  function handlePaymentFailed(error) {
    hideEl(loading)
    showEl(generalErrors)
    showEl(form)
    generalErrors.innerHTML = error.message
  }

  function handlePaymentSuccess(client_secret) {
    window.location = '/license?id=' + client_secret
  }

  function showError(error) {
    hideEl(loading)
    showEl(generalErrors)
    const displayError = document.getElementById('error-message');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = '';

    }
  }

  fetch(`/.netlify/functions/stripe`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      clientSecret = data.client_secret
      hideEl(loading)
      showEl(form)
    }).catch(e => {
      console.log(e)

      showError({message: "Payment server not responding. Please try again later."})
    })



  var paymentRequest = stripe.paymentRequest({
    country: 'GB',
    currency: 'gbp',
    total: {
      label: 'Demo total',
      amount: 800
    },
    requestPayerName: true,
    requestPayerEmail: true
  });



  // Set up Stripe.js and Elements to use in checkout form
  var style = {
    base: {
      color: "#111",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "20px",
      "::placeholder": {
        color: "#444"
      }
    },
    invalid: {
      color: "#991111",
      iconColor: "#fff"
    }
  };

  var card = elements.create("card", { style: style });
  card.mount("#card-element");



  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    showEl(loading)
    hideEl(form)
    hideEl(generalErrors)

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: document.querySelector('input[name="name"]').value,
            email: document.querySelector('input[name="email"]').value,
          }
        }
      })
      .then(function (result) {
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          handlePaymentFailed(result.error)
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            handlePaymentSuccess(clientSecret)
          }
        }
      }).catch(error => handlePaymentFailed(error));
  });

  var prButton = elements.create('paymentRequestButton', { paymentRequest: paymentRequest });

  card.addEventListener('change', ({ error }) => {
    showError(error)
  });

  // Check the availability of the Payment Request API first.
  paymentRequest
    .canMakePayment()
    .then(function (result) {
      if (result) {
        prButton.mount('#payment-request-button');
        alert('hiding form')
        hideEl(form)
      } else {
        alert('hiding payment button')
        hideEl(paymentRequestButton)
      }
    });

  paymentRequest.on('paymentmethod', function (ev) {
    hideEl(generalErrors)
    showEl(loading)
    // Confirm the PaymentIntent without handling potential next actions (yet).
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: ev.paymentMethod.id
      }, { handleActions: false })
      .then(function (confirmResult) {
        if (confirmResult.error) {
          // Report to the browser that the payment failed, prompting it to
          // re-show the payment interface, or show an error message and close
          // the payment interface.
          ev.complete('fail');
        } else {
          // Report to the browser that the confirmation was successful, prompting
          // it to close the browser payment method collection interface.
          ev.complete('success');
          // Let Stripe.js handle the rest of the payment flow.
          stripe
            .confirmCardPayment(clientSecret)
            .then(function (result) {
              if (result.error) {
                // The payment failed -- ask your customer for a new payment method.
                handlePaymentFailed(result.error)
              } else {
                // The payment has succeeded.
                handlePaymentSuccess(clientSecret)
              }
            });
        }
      });
  });

setInterval(() => {
  if (!clientSecret) {
    hideEl(form)
    isFormHidden = true
  } else {
    if (isFormHidden) {
      showEl(form)
      isFormHidden = false
    }
    
    
  }
}, 5000)

})();