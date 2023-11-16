import React,{useState} from 'react'
import ForgetModal from '../../modal/forgetModal/ForgetModal';
import OtpModal from '../../modal/otpModal/OtpModal';

const AdminLogin = () => {
  const [optModalOpen,setOtpModalOpen]=useState(false);
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //write code to handle login
  const handleAdminLogin = async() => {
    const data = {
      Email : email,
      Password : password
    }
    try{
      const response = await fetch("http://localhost:5005/adminlogin",{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if(responseData.success && !responseData.error) window.location.href ='/adminProfile';
    else if(!responseData.success && !responseData.error) alert("Incorrect password! Try again...");
    else if(!responseData.success && responseData.error) alert("you are not registered admin!");
    }catch(err){
      console.log(err);
    }
  };
  
  return (
    <div>
       <div className='login'>
    <div className="login-container">
      <div className="login-card">
        <h2 className='heading'>Admin Login</h2>
        
        <br/>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button onClick={handleAdminLogin}>Submit</button>
          <button  className="openModalBtn"
        onClick={() => {
          setOtpModalOpen(true);
        }}>Forgot Password</button>
        </div>
      </div>
    
    </div>
   
    {optModalOpen && <OtpModal setOtpModalOpen={setOtpModalOpen} />}
   </div>
    </div>
  )
}

export default AdminLogin
