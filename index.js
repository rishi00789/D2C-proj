const createU = document.querySelector('#usr-form'); 
const lgForm = document.querySelector('#lg-form');
const dis = document.querySelector('#dis');
const btnC = document.querySelector('.close');
const X = document.querySelector('#X');
const modalD = document.querySelector('#CreateUsr');
const contMain = document.querySelector('.card-body');
const btnLogout = document.querySelector('#logout');
const btnLG = document.querySelector('#lg');
const btnCreateU = document.querySelector('#createNusr');
const cardM = document.querySelector('#card-M');
const loginEmail = document.querySelector('#lEmail');
const loginPass = document.querySelector('#lPass');
const loginSuccess = document.querySelector('#loginSuccess');



// Create Usr

createU.addEventListener('submit', (e) => {
    e.preventDefault();
    let add = document.querySelector('#add');
    const email = document.querySelector('#email').value;
    const pass = document.querySelector('#pass').value;
    firebase.auth().createUserWithEmailAndPassword(email,pass) 
        .then((userCredential) => {
            console.log('New User Created');
            window.location.reload()
            modalD.style.display = 'none';
        })
        .catch((error) => {
            add.innerHTML = error.message;
            dis.style.display = 'block'
            btnC.addEventListener('click', () => dis.style.display = 'none')
            X.addEventListener('click', () => dis.style.display = 'none')
        })
})
// Create Usr

// Login

lgForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    let btn = document.querySelector('#lg')
    let add = document.querySelector('#add');
    let usrA = loginEmail.value;

    firebase.auth().signInWithEmailAndPassword(loginEmail.value,loginPass.value)
    .then((userCredential) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
            } else {
              // No user is signed in.
            }
          });
        lgForm.reset();
        contMain.style.border = '2px solid green';
        btn.style.display = 'none';
        btnLogout.style.display = 'flex'
        btnCreateU.style.display = 'none';
        loginEmail.style.display = 'none';
        loginPass.style.display = 'none';
        loginSuccess.innerHTML = `The user ${usrA} is logged in successfully`;
        localStorage.setItem('usr',loginEmail.value)
    })
    .catch((error) => {
        if (error.a == null){
            add.innerHTML = error.message;
            dis.style.display = 'block'
            btnC.addEventListener('click', () => dis.style.display = 'none')
            X.addEventListener('click', () => dis.style.display = 'none')
        }
    });
})

// Login

  
btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        console.log('Singout')
        contMain.style.border = '0px';
        btnLogout.style.display = 'none'
        btnLG.style.display='flex';
        loginEmail.style.display = 'inline';
        loginPass.style.display = 'inline';
        btnCreateU.style.display = 'block';
        loginSuccess.innerHTML = ''
      }).catch((error) => {
        // An error happened.
      });
      
})