
import './App.css';
import './Post'
import Post from './Post';
import React,{useState, useEffect} from 'react'
import {auth, db} from './firebase'
import Modal from '@material-ui/core/Modal'
import {makeStyles}from '@material-ui/core/styles'
import {Button,Input}from '@material-ui/core'
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles()
  const [modalStyle]= useState(getModalStyle)
  const [post,setPost]= useState([]);
  const [open,setOpen]=useState(false)
  const [username,setUsername]= useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [openSignIn, setOpenSignIn]=useState(false)

  // useEffect hanya akan aktif ketila terjadi perubhahan pada file yan gsedang diawasi'
useEffect(()=>
{
 const unSubscribe= auth.onAuthStateChanged((userAuth)=>
{
    if(userAuth)
    {
      // pengguna telah login
      console.log(userAuth)
      setUser(userAuth)
      if(userAuth.displayName)
      {
        // jangan update username
      }
    }
    else
    {
      // pengguna telah keluar
      setUser(null)
    }
  
  })
  return()=>{
    unSubscribe()
      
  }
},[user,username])


  useEffect(()=>{
    // disini code akan dijalan kan
    db.collection('post').onSnapshot(snapshot =>
      // onSnapshot akan menangkap perubahan pada directory posts pada firestore
      {
        setPost(snapshot.docs.map(doc =>({
          id: doc.id,
          post: doc.data()
        })))

      })
// tanda [] artinya proses useEffect hanya akan terjadi sekali dan akan berjalan kembali jika
// state mengalami perubahan 
  },[])
  const signUp=(event)=>
  {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then(userAuth=>
      {
        return userAuth.user.updateProfile({
          displayName:username,
        })
      })
    .catch((error)=>alert(error.message))
    setOpen(false)
  }

 
const signIn =(event)=>
{
  event.preventDefault()
  auth.signInWithEmailAndPassword(email,password)
  .catch(error=>
    {
      alert(error)
    })
    setOpenSignIn(false)
}

  return (
    
    <div className="App">
      {user?.displayName?(<ImageUpload username={user.displayName}/>):(<h3> maaf kamu harus login</h3>)}
      
            <Modal
        open={open}
        onClose={()=>setOpen(false)}
    
      >
      <div style={modalStyle} className={classes.paper}>
        
        <form className="app_signup">
        <center>
        <img
        className="app_headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
    
        </center>
            
              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                
                <Input 
                placeholder="userbane"
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}/>

              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
              <Button type="submit" onClick={signUp}>Sign dfgdUp</Button>
        </form>
    </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
    
      >
      <div style={modalStyle} className={classes.paper}>
        
        <form className="app_signup">
        <center>
        <img
        className="app_headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
    
        </center>
            
              <Input 
                placeholder="email"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

              <Input 
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
              <Button type="submit" onClick={signIn}>Sign in</Button>
        </form>
    </div>
      </Modal>
        
      <div className="app_header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
      </div>
   { user ? ( <Button onClick={()=>auth.signOut()}>Logout</Button>)
   :( 
       <div>
            <Button onClick={()=>setOpenSignIn(true)}>Login</Button>
            <Button onClick={()=>setOpen(true)}>Signup</Button> 
       </div>
      )}
      
      <h1> Instagram Clone By Nauval NV, </h1>

      {/*Post*/ }
    
      { /*Post*/}
    

{
  post.map(({id, post}) =>(
  <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageurl} />
  
  ))
}
   
   
    </div>
  );
}

export default App;
