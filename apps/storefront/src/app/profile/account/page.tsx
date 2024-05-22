export default function Account() {
    return (
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7">
            <h4 className="text-lg font-medium capitalize mb-4">
                Account
            </h4>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first">Old Password</label>
                        <input type="text" name="first" id="first" className="input-box" />
                    </div>
                    <div>
                        <label htmlFor="last">New Password</label>
                        <input type="text" name="last" id="last" className="input-box" />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <button type="submit" className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">save
                    changes</button>
            </div>
        </div>

    )
}