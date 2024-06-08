'use client'
import { baseUrl, resource } from "../../../utils/api";
import { Input } from "../../../components/input";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useLoading } from "../../../utils/providers/loading";
interface Props {
  accountAvatar: string
}

export default function Avatar({accountAvatar}: Props) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [avatar, setAvatar] = useState<File | undefined>(undefined)
  const { setLoading }: any = useLoading()
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAvatar(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (avatar) {
        const formData = new FormData();
        formData.append('image', avatar);
        const token = localStorage.getItem('accessToken')
        const res = await axios.post(`${baseUrl + resource.uploadAvatar}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        })
        alert('Avatar updated successfully')
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    setImage(accountAvatar)
  }, [accountAvatar])
  return (
    <div className="text-center">
      <div className='resource flex justify-center'>
        <form onSubmit={onSubmit}>
          <div className="preview">
            <button type="button" onClick={() => document.getElementById('uploadImage')?.click()}>
              Upload Image
            </button>
            <button type="submit" >
              Save
            </button>
            <Input
              type="file"
              name="image"
              id="uploadImage"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            {typeof image === 'string' ? (
              <img src={image} alt="Preview" />
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </form>

      </div>

    </div>
  )
}
