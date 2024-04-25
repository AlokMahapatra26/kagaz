
import { useNavigate } from "react-router-dom"

function Signin() {


  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Signin now!</h1>
      <br />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover" onClick={()=>{navigate('/sign-up')}}>Create an account</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Signin