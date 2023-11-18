import React,{useState}  from 'react'

const UpdatePassModal = ({setOpenUpdatePassword}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updatePassword= async()=>{
      if(oldPassword === ''){
        alert(`Old password can't be empty!`);
        return;
      }
      if(newPassword === '' || confirmPassword === '' || newPassword !== confirmPassword){
        alert(`Password can't confirmed!`);
        return;
      }
      setOpenUpdatePassword(false);
      try {
        const data = {
          old_password: oldPassword,
          new_password: newPassword
        }
        const response = await fetch("http://localhost:5005/changePass", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        });
        const responseData = await response.json();
        alert(responseData.message);

    }catch(err){
      console.log(err);
    }
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
