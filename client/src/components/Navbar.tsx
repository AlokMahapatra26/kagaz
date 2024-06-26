import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";


function Navbar() {


   const navigate = useNavigate(); 
   //@ts-ignore
   const {currentUser} = useSelector(state => state.user)

  return (
    <>
    <div className="navbar bg-base-100 shadow">
  <div className="flex-1">
    <p className="btn btn-ghost text-xl" onClick={()=>{navigate('/')}}>Kagaz</p>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search"  className="input input-bordered w-24 md:w-auto" />
    </div>
   {
    currentUser ? (
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
          <img  src={currentUser.avatar} alt="profile" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li onClick={()=>navigate('/profile')}>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li onClick={()=>navigate('/write')}><a>Write</a></li>
        {/* <li onClick={()=>navigate('/sign-up')}><a>Logout</a></li> */}
      </ul>
    </div>
    ) : <li className="btn" onClick={()=>{navigate('/sign-in')}}>Signin</li>
   }
  </div>
</div>
    </>
  )
}

export default Navbar