const getUrl ="http://localhost:3000/getT"
addEventListener('DOMContentLoaded', ()=>{
    fetch(getUrl)
  .then(response => response.json())
  .then(data => {
    const receivedVariable = data.accessToken;
    console.log(receivedVariable);
    
    // Now you can use receivedVariable on the client side
  })
  .catch(error => console.error('Error:', error));
  
  
})