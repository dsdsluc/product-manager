// Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = showAlert.getAttribute("data-time") || 3000;
    console.log(time);
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },time)
}
// End Alert