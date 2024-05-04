import { useDispatch, useSelector } from "react-redux"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { UseDispatch } from "react-redux";
import { deleteUserFailure , deleteUserSuccess , deleteUserStart} from "../redux/user/userSlice";


function Profile() {

  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async() => {
    try{
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        return;
      }
    }catch(e){
      
    }
  }

  const handleDeleteUser = async() => {
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}` , {
        method : 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

    }catch(e:any){
      dispatch(deleteUserFailure(e.message))
      alert("Something went wrong")
    }
  }

  // const navigate = useNavigate();

  //@ts-ignore
  const {currentUser} = useSelector(state => state.user)

  return (
    <>
     
      <div className="grid flex-grow  card   rounded-none border-r place-items-center border-b-2 p-4">
    
    
    <form action="">
   
    <img src={currentUser.avatar} alt="" className="rounded-full mx-auto m-4 w-16"/>
    <label className="input input-bordered flex items-center gap-2 ">
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
    <li onClick={handleDeleteUser} className="text-red-500"><a>Delete Account</a></li>
    <li onClick={()=>{navigate('/update-profile')}}><a>Update Details</a></li>
    <li onClick={handleSignOut}><a>Sign out</a></li>
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