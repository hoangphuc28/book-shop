import { baseUrl } from "../../api"

async function getData() {
  const res = await fetch( `${baseUrl}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Profile() {

    return (
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
            <h4 className="text-lg font-medium capitalize mb-4">
                Profile information
            </h4>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first">First name</label>
                        <input type="text" name="first" id="first" className="input-box" />
                    </div>
                    <div>
                        <label htmlFor="last">Last name</label>
                        <input type="text" name="last" id="last" className="input-box" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" className="input-box" />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone number</label>
                        <input type="text" name="phone" id="phone" className="input-box" />
                    </div>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" className="input-box" />
                </div>
            </div>
            <div className="mt-4">
                <button type="submit" className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">save
                    changes</button>
            </div>
        </div>

    )
}
