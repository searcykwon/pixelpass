axios.defaults.withCredentials = true

function logout() {
document.getElementById('#logoutBtn')
window.location.href = 'http://localhost:3000/logout';
}//how to clear the cookies 


function passwordSubmit(event) {
    event.preventDefault()

    const form = document.querySelector('pwmanagerform')
    const site = document.querySelector('#website')
    const user = document.querySelector('#username')
    const pass = document.querySelector('#pass')

    body = {
        
        site: site.value,
        user: user.value,
        pass: pass.value
    }

    // let table = document.querySelector()

    axios.post('http://localhost:3000/manager', body)
    .then(() => {
        fetchData()
        alert('Successfully Added Password!')
        // const row = document.createElement('tr')
        // row.innerHTML = `<td>${site.value}</td>` 
        // row.innerHTML += `<td>${user.value}</td>`
        // row.innerHTML += `<td>${pass.value}</td>`
        // row.innerHTML += `<td><button class='edit' id='edit' required>EDIT</button></td>
        // <td><button class='delete' id='delete' onclick="deletePassword()">DELETE</button></td> 
        // <td><button class='check' id='check' required>CHECK</button></td>`//whatever i can do in HTMl i can do in this string
        // document.querySelector('#managerstable tbody').appendChild(row) //appendChild adds a child to the parent HTML element
        //i have a table body and i want to append new rows to it ^^
        //apply styling to button in css for this i can create global button style but if there are lots
        //of buttons apply a class and style them within the class
    });  
    //the process of appending rows 
    //1.create a new row element 
    //2.set the rows innerHTML to whatever you want. values of columns
    //3. select the table or the id of the table body with a querySelector 
    //4. need to add rows to currently existing table body by using appendChild
}

const addPassBtn = document.querySelector('.managersubmit') //this is selecting the submit button for a new password

addPassBtn.addEventListener('click', passwordSubmit)

function fetchData() { //
    axios.get('http://localhost:3000/manager')
    .then((userData) => { //assigning a name to the response from the data on the backend and the making a call back function
        document.querySelector('#managerstable tbody').innerHTML = ""//clear the table before updating info 
        userData.data.forEach((element) => { //forEach is basically a for of loop
            const row = document.createElement('tr')
            row.innerHTML = `<td class="trwebsite" id="trwebsite-${element.id}">${element.website}</td>` 
            row.innerHTML += `<td class="trusername" id="trusername-${element.id}">${element.username}</td>`
            row.innerHTML += `<td class="trpassword" id="trpassword-${element.id}" onclick="alert('${element.password}')">${hidePassword(element.password)}</td>` //can do inner.html with document.queryselctor
            row.innerHTML += `<td><button class="edit" id="edit-${element.id}" onclick="editPassword(${element.id})">EDIT</button></td>
            <td><button class='delete' onclick="deletePassword(${element.id})">DELETE</button></td> 
            <td><button class='check' id='check'>CHECK</button></td>`//whatever i can do in HTML i can do in this string
            document.querySelector('#managerstable tbody').appendChild(row)
        })
        console.log(userData.data)
    }) //this is returning the data from the backend for a specific user^
}//make server get updated credentials and then use those credentials for each function


fetchData() //when functions are called this way the script for the js needs to be
//inside of the body. see HTML page for more. want this to be called when the page is loaded


//FETCHING DATA
//1. need to get data with a get request
//2.extract desired info from response. u can console and see what data is there to see 
//what data you're interested in
//3.if it's an array--loop over the array(forEach) and then add it to the table.

function deletePassword(password) {

    axios.delete('http://localhost:3000/manager/'+ password) //${password}<alt way 2 write
    .then(() => {
        fetchData()
        alert('Successfully Deleted Password!')})
}

function editPassword(password) {
    // axios.get('http://localhost:3000/manager' + password) //don't need to get data because it's already on page
    // .then((userData) => {

        const editButton = document.querySelector(`#edit-${password}`) //change to elemnt.id.. 
        const editSite = document.getElementById(`trwebsite-${password}`) //just "trwebsite etc.. doesn't work because all elemnts created in the row have same id. call by pk-ID as well 
        const editUser = document.getElementById(`trusername-${password}`)
        const editPass = document.getElementById(`trpassword-${password}`)

        editButton.innerText = "SAVE"
        editSite.contentEditable = true;
        editUser.contentEditable = true;
        editPass.contentEditable = true;

        body = {
        
            site: editSite.innerText,
            user: editUser.innerText,
            pass: editPass.innerText
        }
    
        editButton.addEventListener('click', function(){
            axios.put('http://localhost:3000/manager/'+ password, body)
            .then(() => {
                fetchData()
                
            editButton.innerText = "EDIT"

            editSite.contentEditable = false;
            editUser.contentEditable = false;
            editPass.contentEditable = false;

            alert('Successfully Edited!')

            })
        })
    //send PUT request. (on backend UPDATE TABLE)


    }

    //give a unique id to each cell in table based on credential-id
    //when user clicks edit 
    //get the info for the data we want to edit 
    //selects username password and website fields
    //text area appears(we grab the elements we want and turn them into an input form)
    //edit button gets changed to save button 
    //once saved is clicked it takes the data and updates it on the page and in the backend
    //
    //css
  

function hidePassword(password) {
    let str=''
    for (let i = 0; i < password.length; i++) {
        str += '*'
    }
    return str
}

// function checkPwStrength(event) {
//     event.preventDefault(); 

// axios.get()
    
// }

// const checkBtn = document.querySelector('#check')


//do the check on front end.

//send a request to the backend checking if a person has cookies or not
//route protection verifyUser function 
//send axious request //.then 
//make an export import function 

//