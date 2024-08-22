const usernameTextField = document.getElementById('username')
const adduserBtn = document.getElementById('adduser')
const recordsDisplay = document.getElementById('records')

//get data
let userArray = []
let edit_id = null

//get data localStorage
let objstr = localStorage.getItem('users')
//console.log(objstr)
if (objstr != null) {
    userArray = JSON.parse(objstr) //convert string to object
    // console.log(userArray)
}

displaydata()

adduserBtn.onclick = () => {
    const name = usernameTextField.value
    //alert(name)
    if (edit_id != null) {
        userArray.splice(edit_id, 1, { 'name': name })
        edit_id = null
        adduserBtn.innerText = 'Add user';
    }
    else {
        userArray.push({ 'name': name })
        // console.log(userArray)
    }
    usernameTextField.value = ''//data empty
    savedata(userArray)
}

function savedata(userArray) {
    // console.log(userArray)
    let str = JSON.stringify(userArray)//change for string
    // console.log(str)
    localStorage.setItem('users', str)   //string formate
    displaydata()
}

function displaydata() {
    let data = ''
    userArray.forEach((item, i) => {
        data += `<tr>
        <th>${i + 1}</th>
        <td>${item.name}</td>
        <td>
        <i class="btn text-white fa fa-edit btn-info mx-2"
        onclick='EditInfo(${i})'></i>
        <i class="btn text-white fa fa-trash btn-danger "
        onclick='DeleteInfo(${i})'></i>
        </td>
       </tr> `;
        // console.log(data)
    })
    recordsDisplay.innerHTML = data;
}

function DeleteInfo(id) {
    // alert(id)
    userArray.splice(id, 1);
    savedata(userArray)
}

function EditInfo(id) {
    // alert(id)
    edit_id = id
    usernameTextField.value = userArray[id].name;
    adduserBtn.innerText = 'Update User';
}

