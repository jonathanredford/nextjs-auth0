import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function ProfileForm() {
    const [ session, loading ] = useSession()
    const { register, handleSubmit, watch, errors, reset } = useForm()

    useEffect(() => {
        if(session) {
            reset({
                name: session.user.name,
                email: session.user.email
            })
        }
    }, [session])

    const onSubmit = data => {
        console.log(data)
        toast("Success Notification !", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
        })
    }
    
    if(loading) return null
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                            
            <label className="block">
                <span className="text-gray-500">Full name</span>
                <input {...register('name')} type="text" className="mt-1 block w-full rounded-md text-gray-100 bg-gray-900 border-transparent focus:border-gray-600 focus:bg-gray-700 focus:ring-0" />
            </label>
            <label className="block">
                <span className="text-gray-500">Email address</span>
                <input {...register('email')} type="email" className="mt-1 block w-full rounded-md text-gray-100 bg-gray-900 border-transparent focus:border-gray-600 focus:bg-gray-700 focus:ring-0" />
            </label>
            
            <div className="block">
                <button type="submit" className="py-2 px-4 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-900 hover:text-gray-200">Update my info</button>
            </div>
        </form>
    );
}

export default ProfileForm


