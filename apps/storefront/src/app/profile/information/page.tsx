'use client'
import { useQuery } from '@apollo/client';
import { getInformation } from '../../../utils/api/graphQL/query'
import Avatar from "./avatar";
import BasicInformation from "./basicInformation";
import { Account } from '../../../utils/interfaces/account';

function Profile() {
  const { data } = useQuery(getInformation)
  const accountData: Account = data?.information as Account

  return (
    <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
      <h4 className="text-lg font-medium capitalize mb-4">
        Profile information
      </h4>
      <div className="grid-cols-2 grid">
        <Avatar accountAvatar={accountData?.avatar}/>
        <BasicInformation accountData={accountData}/>
      </div>
    </div>
  )
}
export default Profile;
