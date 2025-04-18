const url = `https://api.imgbb.com/1/upload?key=${'df414536c62sfdaa0a114d75d61'}`;

const uploadImgBB = async (img: any): Promise<string | undefined | null> => {
  //  // console.log("🚀 ~ file: imgbbUploads.ts:4 ~ uploadImgBB ~ img:", img)

  const formData = new FormData();
  formData.append('image', img);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    console.log(response, 'response');
    if (response.ok) {
      const data = await response.json();
      const imgUrl = data.data.display_url;
      return imgUrl;
    } else {
      // throw new Error("Failed to upload image");
      //  // console.log("Failed to upload image");
    }
  } catch (error) {
    console.error('Error in uploadImgBB:', error);
    // throw error;
  }
};

export default uploadImgBB;
