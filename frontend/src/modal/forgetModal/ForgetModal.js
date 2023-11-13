import React,{useState} from 'react'
import "./forgetModal.scss"
const ForgetModal = ({setOpenModal , setOtpModalOpen}) => {
    const [regNumber, setRegNumber] = useState('');

    // code for send OTP
    const sendOTP = async() => {
        setOpenModal(false);
        const data = {
          Reg_no : regNumber,
        }
        try{
          const response = await fetch("http://localhost:5005/sendOTP",{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        alert("OTP has been sent to your institute email!");
        setOtpModalOpen(true);
      }catch(err){
          console.log(err);
        }
    };
  return (
    <div className="modalBackground">
       <div className="modalContainer">
         <div className="titleCloseBtn">
        <button
          onClick={() => {
            setOpenModal(false);
          }}
        >
          X
        </button>
      </div>
         <div className="title">
            <h3>Registration number:</h3>
         </div>
         <div className="body">
            <input
              type="text"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
             />
         </div>
         <div className="footer">
           <button className='sendOTP' onClick={sendOTP}>Send OTP </button>
           
         </div>
      </div>
  </div>
  )
}

export default ForgetModal
