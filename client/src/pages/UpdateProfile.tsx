import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage , ref, uploadBytesResumable } from "firebase/storage"
import { useNavigate } from "react-router-dom"




import  {app} from "../firebase"
import { updateUserStart, updateUserSuccess , updateUserFailure } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"


function UpdateProfile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  

  const fileRef = useRef(null)
  const [file , setFile] = useState(undefined)
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData , setFormData] = useState({})
  

  console.log(formData)
  console.log(filePerc)
  console.log(fileUploadError)
  //@ts-ignore
  const {currentUser , loading , error} = useSelector(state => state.user)


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },  [file])

  //File uploading 
  const handleFileUpload = (file:any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  //handle changes func
  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  console.log(formData)

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    

    try {
      dispatch(updateUserStart());
     
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data.message))
        return; 
      }

      dispatch(updateUserSuccess(data))
      
      navigate('/profile')
      
      
      
    }catch (error:any) {
      
      dispatch(updateUserFailure(error.message));
      
    }

  }

  

  return (
    <div>
      
      
      
     

    


      <div className="hero min-h-screen ">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Update Details!</h1>
      <br />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
      <img src={formData.avatar || currentUser.avatar} alt="profile photo" className="rounded-full cursor-pointer w-16 mx-auto" onClick={()=> fileRef.current.click()}/>
      <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
      <input type="file" ref={fileRef}  accept="image/*" onChange={(e)=>setFile(e.target.files[0] )}/>
      
      <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text"  onChange={handleChange}  className="input input-bordered" id='username' required defaultValue={currentUser.username}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" onChange={handleChange}  className="input input-bordered" id='email' required  defaultValue={currentUser.email} />
        </div>
        {/* <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" onChange={handleChange} placeholder="password" className="input input-bordered" id='password' required />
         
        </div> */}
        <div className="form-control mt-6">
          <button disabled={loading} className="btn btn-primary">{loading ? 'Loading...' : 'Update'}</button>
        </div>
        <div>
          
        </div>
      </form>
     
    </div>
    {error && <p>{error}</p>}
    
  </div>
  
</div>

     
      
  
</div>
       
    
  )
}

export default UpdateProfile