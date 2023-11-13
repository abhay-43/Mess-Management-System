import React,{useState} from 'react'
import ForgetModal from '../../modal/forgetModal/ForgetModal';
import OtpModal from '../../modal/otpModal/OtpModal';

const AdminLogin = () => {
  const [optModalOpen,setOtpModalOpen]=useState(false);
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //write code to handle login
  const handleAdminLogin = async() => {
       alert("Admin Login pressed")
  };
  
  return (
    <div>
       <div className='login'>
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
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
