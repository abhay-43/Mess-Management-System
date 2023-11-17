import React,{useState}  from 'react'

const UpdatePassModal = ({setOpenUpdatePassword}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updatePassword= ()=>{
         
    }
  return (
    <div className="modalBackground">
    <div className="modalContainer">
      <div className="titleCloseBtn">
         <button
           onClick={() => {
            setOpenUpdatePassword(false);
          }}
         >
         X
       </button>

     </div>
     <div className='old-password'>
         <h3>Old Password:</h3>
         <input
           type="password"
           value={oldPassword}
           onChange={(e) => setOldPassword(e.target.value)}

          />
     </div>
     <div className='new-password'>
         <h3>New Password:</h3>
         <input
           type="password"
           value={newPassword}
           onChange={(e) => setNewPassword(e.target.value)}

          />
     </div>
     <div className='confirm-password'>
         <h3>Confirm Password:</h3>
         <input
           type="password"
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}

          />
     </div>
    
     <div className="footer">
        <button className='updateBtn' onClick={updatePassword}>Update </button>
        
      </div>

   </div>
 </div>
  )
}

export default UpdatePassModal
