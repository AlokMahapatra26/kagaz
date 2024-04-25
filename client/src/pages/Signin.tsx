import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Signin() {


  const navigate = useNavigate();

  const [formData , setFormData] = useState({})
  const [error , setError] = useState(null);
  const [loading , setLoading] = useState(false);

  const handleChange = (e:any)=> {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    

    try {
      setLoading(true)
      const response = await fetch('/api/auth/signin', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return; 
      }

      setLoading(false);
      setError(null)
      navigate('/')
    }catch (error:any) {
      setLoading(false)
      setError(error.message)
      
    }
  }

  console.log(formData)
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Signin now!</h1>
      <br />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
  
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" onChange={handleChange} placeholder="email" className="input input-bordered" id='email' required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" onChange={handleChange} placeholder="password" className="input input-bordered" id='password' required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover" onClick={()=>{navigate('/sign-in')}}>Create Account</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button disabled={loading} className="btn btn-primary">{loading ? 'Loading...' : 'Signin'}</button>
        </div>
      </form>
     
    </div>
    {error && <p className="text-red-500">{error}</p>}
  </div>
  
</div>
  )
}

export default Signin