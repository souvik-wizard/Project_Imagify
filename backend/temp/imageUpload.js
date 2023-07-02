console.log("linked")

const form=document.querySelector('#upload-image');
console.log(form)
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const file=document.querySelector('#file').files[0];
   console.log(file)
   const sign = await fetch("/signature", {
    method: "POST",
  });

  const signJson = await sign.json();
    console.log(signJson);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signJson.signature);
    formData.append("timestamp", signJson.timestamp);
    formData.append("api_key", 856855472837717);
    const upload = await fetch(
      "https://api.cloudinary.com/v1_1/dqrdar61j/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadJson = await upload.json();
    console.log(uploadJson);
    const userId=document.querySelector("#title").getAttribute("data-user-id");
    const title=document.querySelector("#title").value;
    const image=uploadJson.secure_url;
    const postData=new FormData();
    postData.append("userId",userId);
    postData.append("title",title);
    postData.append("image",image);
    console.log(postData)
    const post=await fetch("/image_upload",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:postData
    });

    const postJson=await post.json();
    console.log(postJson);
})
