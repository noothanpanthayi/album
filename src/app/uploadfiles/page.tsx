'use client'
import Image from 'next/image';
import React, {Fragment, useState } from 'react';
import uploadFilesToS3 from './fileupload';

export default function UploadForm() {

  type State = {
    selectedFiles:File[]
  }

  const [state, setState]=useState<State>({
    selectedFiles:[]
  })

    
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
      const files: FileList | null = e.target.files; 
      setState({ selectedFiles: files ? Array.from(files) : [], }); 
    };
    


  const handleSubmit = async () => {
  //  if(!state.selectedFiles) 
  //   {return}
   
   const bucketName='amzn-s3-nkalbum-bucket';
   const folderName="nkxmasvacation";
   console.log("BUCKET NAME ", bucketName)
   const filesArray=Array.from(state.selectedFiles);
   await uploadFilesToS3(bucketName, folderName, filesArray);

  };

  console.log("State ", state);

  return <>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} multiple />
      <button type="submit">Upload</button>
      
      
    </form>
    <div style={{display:'flex', gridTemplateColumns:"1fr", gap:'5px'}}>
    {state?.selectedFiles?.map((file:File)=>{
      return <Fragment key={file?.name}>
        <Image alt="uploaded images" src={URL.createObjectURL(file)} width={100} height={100}/>
      </Fragment>
    })} 
    
  </div>
      {/* <h1>{File?.name&&File.name[0].length>1?File.name[0]:"Not yet loaded"}</h1> */}
  </>


}
