'use client'
import {  useMutation, useQuery } from "@apollo/client"
import { getInformation, updateInformation } from "../../../utils/api/graphQL/query";
import Label from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";


 function Profile() {
  const { data } = useQuery(getInformation)
  const [updateProfileMutation] = useMutation(updateInformation);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName:  '',
      address:'',
      phone: '',
    }
  })
  const onSubmit = async (formData) => {
    try {
      const res = await updateProfileMutation({
        variables: formData
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    console.log(data)
    reset({
      fullName: data?.information.fullName,
      address: data?.information?.address,
      phone: data?.information?.phone
    })
  }, [data])

  return (
    <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
      <h4 className="text-lg font-medium capitalize mb-4">
        Profile information
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" text={'Full name'}></Label>
              <Input {...register('fullName')} />
            </div>
            <div>
              <Label htmlFor="address" text={'Address'}></Label>
              <Input {...register('address')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" text={'Email'}></Label>
              <Input disabled value={data?.information?.email || ''} />
            </div>
            <div>
              <Label htmlFor="phone" text={'Phone'}></Label>
              <Input {...register('phone')} />
            </div>
          </div>

        </div>
        <div className="mt-4">
          <button type="submit" className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">save
            changes</button>
        </div>
      </form>
    </div>
  )
}
export default Profile;
