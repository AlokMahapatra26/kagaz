import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage , ref, uploadBytesResumable } from "firebase/storage"

import  {app} from "../firebase"

function UpdateProfile() {

  const fileRef = useRef(null)
  const [file , setFile] = useState(undefined)
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [formData , setFormData] = useState({})

  console.log(formData)
  console.log(filePerc)
  console.log(fileUploadError)
  //@ts-ignore
  const {currentUser} = useSelector(state => state.user)


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },  [file])

  //File uploading 
  const handleFileUpload = (file) => {
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

  return (
    <div>
      
      
      
      <img src={formData.avatar || currentUser.avatar} alt="profile photo" className="rounded-full cursor-pointer " onClick={()=> fileRef.current.click()}/>
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

     
      
  
</div>
       
    
  )
}

export default UpdateProfile