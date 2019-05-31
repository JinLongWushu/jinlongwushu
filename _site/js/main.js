// Make sure service workers are supported

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('../sw.js')
			.then(reg => console.log('Service Worker: Registered'))
			.catch(err => console.log(`Service Worker: Error: ${err}`));
	})
}


// Listen for offline
window.addEventListener("load", () => {
	const offlineMessage = document.querySelector('.connectionStatus-offline');
	const onlineMessage = document.querySelector('.connectionStatus-online');
  function handleNetworkChange(event) {
    if (navigator.onLine) {
      onlineMessage.classList.add("show");
      setTimeout(function(){ 
      	onlineMessage.classList.remove("show");
      }, 5000);

    } else {
      offlineMessage.classList.add("show");
      setTimeout(function(){ 
      	offlineMessage.classList.remove("show");
      }, 5000);
    }
  }
  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);
});