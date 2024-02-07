// Create a div element for the overlay
const overlay = document.createElement('div');

// Set the style to cover the whole page with a semi-transparent background and a z-index of 1
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black background
overlay.style.zIndex = 1000; // set the z-index to 1

// Create a div for the "Purchase Confirmed" message
const confirmationDiv = document.createElement('div');
confirmationDiv.style.position = 'absolute';
confirmationDiv.style.top = '50%';
confirmationDiv.style.left = '50%';
confirmationDiv.style.transform = 'translate(-50%, -50%)';
confirmationDiv.style.backgroundColor = 'white'; // set the background color to white
confirmationDiv.style.padding = '20px'; // add some padding for better visibility
confirmationDiv.style.textAlign = 'center'; // center-align the content

const p = document.createElement('p');
p.textContent = 'Purchase Confirmed';
confirmationDiv.appendChild(p);

// Create a button for "Close"
const closeButton = document.createElement('button');
closeButton.textContent = 'Close';
closeButton.addEventListener('click', () => {
  // Remove the overlay and the confirmation div when the close button is clicked
  document.body.removeChild(overlay);
  document.body.removeChild(closeButton);
  document.location.href= "/"
});
// Append the close button to the body
confirmationDiv.appendChild(closeButton);
// Append the confirmation div to the overlay
overlay.appendChild(confirmationDiv);

// Append the overlay to the body
document.body.appendChild(overlay);

