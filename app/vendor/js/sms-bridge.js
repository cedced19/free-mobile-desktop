// This file replaces sms.js to use the exposed electronAPI
window.SMS = {
  send: async function(number, message) {
    return await window.electronAPI.sms.send(number, message);
  }
  // Add other SMS functions as needed
};

// Define the global sms function that app.js is trying to use
window.sms = function(user, message) {
  console.log('Sending SMS to user:', user.name, 'Message:', message);
  
  // Construct the SMS URL for Free Mobile service
  const url = `https://smsapi.free-mobile.fr/sendmsg?user=${encodeURIComponent(user.id)}&pass=${encodeURIComponent(user.tocken)}&msg=${encodeURIComponent(message)}`;
  
  // Use the fetch API to send the request
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`SMS sending failed with status: ${response.status}`);
      }
      console.log('SMS sent successfully to', user.name);
      return response.text();
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
    });
  
  return true;
}; 