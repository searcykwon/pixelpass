axios.defaults.withCredentials = true

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
});

}

const addPassBtn = document.querySelector('.managersubmit') //this is selecting the submit button for a new password

addPassBtn.addEventListener('click', passwordSubmit)




function displayUserCredentials(credentials) {
    const table = document.querySelector('#managerstable');

    credentials.forEach(credential => {
        //credentials
        const newRow = table.insertRow();
        newRow.className = 'tableinfo';

        // table info 
        const websiteBlock = newRow.insertCell();
        websiteBlock.textContent = credential.website;
        console.log(websiteCell)

        const usernameBlock = newRow.insertCell();
        usernameBlock.textContent = credential.username;
        console.log(usernameCell)

        const passwordBlock = newRow.insertCell();
        passwordBlock.textContent = credential.password;
        console.log(passwordBlock)

        // buttons
        // const editCell = newRow.insertCell();
        // const editButton = document.createElement('button');
        // editButton.textContent = 'Edit';
        // editButton.addEventListener('click', () => handleEdit(credential.id)); 
        // editCell.appendChild(editButton);

        // const deleteCell = newRow.insertCell();
        // const deleteButton = document.createElement('button');
        // deleteButton.textContent = 'Delete';
        // deleteButton.addEventListener('click', () => handleDelete(credential.id));
        // deleteCell.appendChild(deleteButton);

        // const checkCell = newRow.insertCell();
        // const checkButton = document.createElement('button');
        // checkButton.textContent = 'Check';
        // checkButton.addEventListener('click', () => handleCheck(credential.password));
        // checkCell.appendChild(checkButton);
    });
    axios.get('http://localhost:3000/manager')
    .then(response => {
        displayUserCredentials(response.data);
    })
    .catch(error => {
        console.error('ERROR GETTING USER CREDENTIALS', error);
    });

}

addPassBtn.addEventListener('click', displayUserCredentials)

// function createNewRow() {
//i thought to creat a new row and then put add the information in
// }
    // let tb = document.querySelector('table')
    

    // str =<tr class="tableinfo">
    // <td>${website}</td>
    // <td>Username</td>
    // <td>Password</td>
    // </tr>
    //  arr = response.data

     // tb.innerHTML = tb.innerHTML + str


// let list1 = [];
// let list2 = [];
// let list3 = [];
// let n=1;
// let x=0;

//     const table = document.getElementById('tableinfo');
//     const newRow = table.insertRow(n);

//     list1[x] = document.getElementById('website').value
//     list2[x] = document.getElementById('username').value
//     list3[x] = document.getElementById('pass').value

//     const cell = newRow.insertCell(0);
//     const cell1 = newRow.insertCell(1);
//     const cell2 = newRow.insertCell(2);
//     cell.innerHTML = list1[x];
//     cell.innerHTML = list2[x];
//     cell.innerHTML = list3[x];

//     n++;
//     x++;

    // Clearing existing table rows
    // table.innerHTML = ''  ;  



    // // Add header row
    // const newRow = table.insertRow();
    // headerRow.className = 'tableheaders';
    // //headerText = site, username, password... 
    // ['Website', 'Username', 'Password', 'Edit', 'Delete', 'Check'].forEach(headerText => {
    //     const th = document.createElement('th'); //creating th element 
    //     th.textContent = headerText;
    //     headerRow.appendChild(th); 
    // });

    // credentials.forEach(credential => {
    //     const row= table.insertRow();
    //     row.className="tableinfo";
    // })

    // ['website', 'username', 'password'].forEach(field => {
    //     const cell = row.insertCell();
    //     cell.textContent = credential[field];

    // const editCell = row.insertCell();
    // const editButton = document.createElement('button')
    // editButton.textContent = 'EDIT'
    // editButton.addEventListener('click', handleEdit)
    // editCell.appendChild(editButton);

    // const deleteCell = row.insertCell();
    // const deleteButton = document.createElement('button')
    // deleteButton.textContent = "DELETE"
    // deleteButton.addEventListener("click", handleDelete);
    // deleteCell.appendChild(editButton);

    // const checkCell = row.insertCell();
    // const checkButton = document.createElement('button')
    // checkButton.textContent = "CHECK"
    // checkButton.addEventListener("click", handleDelete);
    // checkCell.appendChild(editButton);





// }

//need an axios call to localhost:3000/credentials
//take the response from axios fill in the table on the manager.html page
//assessment 3

//when user logs in 
