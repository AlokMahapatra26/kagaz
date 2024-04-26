import { useSelector } from "react-redux"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  //@ts-ignore
  const {currentUser} = useSelector(state => state.user)

  return (
    <>
     
      <div className="grid flex-grow  card   rounded-none border-r place-items-center border-b-2 p-4">
    
    
    <form action="">
   
    <img src={currentUser.avatar} alt="" className="rounded-full mx-auto m-4"/>
    <label className="input input-bordered flex items-center gap-2">
    <FaUser />
<input type="text" className="grow " placeholder={currentUser.username} disabled />
</label>
<br />
<label className="input input-bordered flex items-center gap-2">
<MdEmail />
<input type="text" className="grow" placeholder={currentUser.email} disabled/>
</label>
    </form>
<br />
    <details className="dropdown inline">
  <summary className="m-1 btn">More Options</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li className="text-red-500"><a>Delete Account</a></li>
    <li><a>Update Details</a></li>
    <li><a>Sign out</a></li>
  </ul>
</details>

  </div> 
      
  
  <div className="text-center p-4">
    <p>Your Books</p><br /><br />
    
  </div>
  
    </>
    
  )
}

export default Profile