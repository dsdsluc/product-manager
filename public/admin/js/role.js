const tablePermission = document.querySelector("[table-permission]");

if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click",()=>{
        let result = [];

        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(row=>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name == "id"){
                inputs.forEach(input=>{
                    const value = input.value;
                    result.push({
                        id: value,
                        permissions: []
                    });
                })
            }else{
                inputs.forEach((input, index)=>{
                    const checked = input.checked;

                    if(checked){
                        result[index].permissions.push(name);
                    }
                })
            }
        })
        


    
        const formChangePermissions = document.querySelector("#form-change-permissions");
        const inputPermissions = formChangePermissions.querySelector("input");
        inputPermissions.value = JSON.stringify(result);
        formChangePermissions.submit();
    })
    
}

// Permission Data 
const dataRecords = document.querySelector("[data-records]");
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));

    records.forEach((item,index)=>{
        const permissions = item.permissions;
        console.log(item.title);
        console.log(permissions);
        permissions.forEach(permission=>{
            const row = tablePermission.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked =true;
        })
    })

}
// End Permission Data 