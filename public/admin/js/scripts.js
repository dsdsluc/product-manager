const buttonStatus = document.querySelectorAll("[button-status]");
console.log(buttonStatus)
if(buttonStatus.length > 0 ){
    let url = new URL(location.href);
    console.log(url)
    buttonStatus.forEach(item=>{
        
        item.addEventListener("click",()=>{
            const status = item.getAttribute("button-status");
            if(status != ""){
                url.searchParams.set("status",status);
            }
            else{
                url.searchParams.delete("status");
            }
          
            window.location.href = url.href
        })
    })
}

const formSearch = document.querySelector("#form-search");

if(formSearch){
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const url = new URL(location.href);;
        const value = e.target.keyword.value;
        if(value != ""){
            url.searchParams.set("keyword",value);
        }else{
            url.searchParams.delete("keyword");
        }
    
        window.location.href = url.href
    })
}

// Pagination 
const buttonsPagination = document.querySelectorAll("[button-pagination]");

if(buttonsPagination.length > 0 ){
    let url = new URL(location.href)
    buttonsPagination.forEach(button=>{
        button.addEventListener("click",()=>{
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page",page);

            window.location.href = url.href
        })
    })
}
// End Pagination 


// Change Status 
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0 ){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
    
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}

// End Change Status 

// Multi Check-Box

const checkboxMulti = document.querySelector("[checkbox-multi]");

if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector(["input[name=checkall]"]);
    const inputsId = checkboxMulti.querySelectorAll("input[name=id]");
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputsId.forEach(input=>{
                input.checked = true
            })
        }
        else{
            inputsId.forEach(input=>{
                input.checked = false
            })
        }
        
    })
    inputsId.forEach(input=>{
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked");
            if(countChecked.length == inputsId.length ){
                inputCheckAll.checked = true
            }else{
                inputCheckAll.checked = false
            }
        })
    })
    // Form changeMulti
    const formChangeMulti = document.querySelector("[form-change-multi]");
    if(formChangeMulti){
        formChangeMulti.addEventListener("submit",(e)=>{
            e.preventDefault();
            let ids =[];
            const typeChange = e.target.elements.type.value;
            if(typeChange == "delete-all"){
                const conFirmDeleteAll = confirm("Ban co chac muon xoa ko");
                if(!conFirmDeleteAll){
                    return ;
                }
            }
            const inputChecked = checkboxMulti.querySelectorAll("[name=id]:checked");
            if(inputChecked.length > 0){
                const inputIds = formChangeMulti.querySelector("[name=ids]");
                inputChecked.forEach(input=>{
                    const id = input.value
                    if(typeChange == "change-position"){
                        const position = input.closest("tr").querySelector("input[name=position]").value
                       ids.push(`${id}-${position}`);
                    }
                    else{
                        ids.push(id);
                    }
                })
                inputIds.value = ids.join(", ");
                formChangeMulti.submit();
            }
            else {
                alert("Day chon it nhat 1 ban ghi")
            }
        })
    }
// End Form changeMulti
}

// delete Item 
const buttonDeletes = document.querySelectorAll("[delete-button]");
if(buttonDeletes.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDeletes.forEach(button=>{
        button.addEventListener("click",()=>{
            const id = button.getAttribute("data-id");
            console.log(id);
            const action = path + `/${id}?_method=DELETE`;
            formDeleteItem.action = action;

            formDeleteItem.submit();
        })
    })
    
   
}

// Enddelete Item 

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

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change",(e)=>{
        if(e.target.files.length){
            const image  = URL.createObjectURL(e.target.files[0]);
            uploadImagePreview.src = image;
        }
    })
}
// End Upload Image