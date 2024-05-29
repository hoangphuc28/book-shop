import {  useMutation, useQuery } from "@apollo/client"
import { getInformation, updateInformation } from "../../../utils/api/graphQL/query";
import Label from "../../../components/label";
import { Input } from "../../../components/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Account } from "../../../utils/interfaces/account";
interface Props {
  accountData: Account
}
export default function BasicInformation({accountData}: Props) {
  const [updateProfileMutation] = useMutation(updateInformation);
  const { register, handleSubmit, reset } = useForm<Account>({
    defaultValues: accountData
  })
  const onSubmit = async (formData: Account) => {
    try {
      const res = await updateProfileMutation({
        variables: formData
      })
      console.log(res)
      alert("Informatin updated successfully")
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    reset(accountData)
    console.log(accountData)
  }, [accountData, reset])
  return(
    <div>
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
          <Input disabled  {...register('email')}/>
        </div>
        <div>
          <Label htmlFor="phone" text={'Phone'}></Label>
          <Input {...register('phone')} />
        </div>
      </div>

    </div>
    <div className="mt-4">
      <button type="submit" className="btn-style2 px-3 py-3 uppercase">save
        changes</button>
    </div>
  </form>
  </div>
  )
}
