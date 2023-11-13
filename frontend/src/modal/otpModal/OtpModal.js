import React , {useState} from 'react'
 
const OtpModal = ({setOtpModalOpen}) => {

    const verify = async() => {
        setOtpModalOpen(false);
        alert("verification initiated !");
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
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}

             />
        </div>
        <div className='confirm-password'>
            <h3>Confirm Password:</h3>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}

             />
        </div>
        <div className='OTP'>
            <h3>OTP:</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}

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
