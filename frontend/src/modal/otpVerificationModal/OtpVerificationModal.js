import React , {useState} from 'react'
 
const OtpModal = ({setOtpModalOpen}) => {

    const verify = async() => {
        setOtpModalOpen(false);
        if(confirmPassword === newPassword){
          const data = {
            newPassword : newPassword,
            OTP : otp
          }
          try{
            const response = await fetch("http://localhost:5005/verifyOTP",{
            method : 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
          });
          const responseData = await response.json();
          if(responseData.success){
            alert('Successfully changed password');
          }else{
            alert('OTP verification failed !')
          }
        }catch(err){
            console.log(err);
          }
        }else{
          alert('Passwords do not match!');
        }
    };
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp]=useState('');
  return (
    
      <div className="modalBackground">
       <div className="modalContainer">
         <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOtpModalOpen(false);
             }}
            >
            X
          </button>

        </div>
        <div className='new-password'>
            <h3>New Password:</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
             />
        </div>
        <div className='confirm-password'>
            <h3>Confirm Password:</h3>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
             />
        </div>
        <div className='OTP'>
            <h3>OTP:</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
             />
        </div>
        <div className="footer">
           <button className='verifyBtn' onClick={verify}>Verify </button>
           
         </div>

      </div>
    </div>
  )
}

export default OtpModal
