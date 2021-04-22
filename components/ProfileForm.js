import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function ProfileForm() {
    const [ session, loading ] = useSession()
    const { register, handleSubmit, formState, watch, errors, reset } = useForm()
    const { isSubmitting } = formState

    useEffect(() => {
        if(session) {
            reset({
                name: session.user.name,
                email: session.user.email
            })
        }
    }, [session])

    const onSubmit = async (data) => {
        return new Promise(async resolve => {
            fetch('/api/me', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/javascript'
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if(res.ok) {
                    toast.info("Profile updated!", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        hideProgressBar: true,
                    })
                }
                resolve()
            })
            .catch(err => {
                console.log('Failed to update profile: ', err)
                toast.info("Error: " + err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    hideProgressBar: true,
                })
                resolve()
            })
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
                <input {...register('email')} disabled={true} type="email" className="mt-1 block w-full rounded-md text-gray-100 bg-gray-900 border-transparent focus:border-gray-600 focus:bg-gray-700 focus:ring-0" />
            </label>
            
            <div className="block">
                <button type="submit" disabled={isSubmitting ? true : false} className="py-2 px-4 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-900 hover:text-gray-200">
                    {
                        isSubmitting
                        ? 'Updating...'
                        : 'Update my info'
                    }
                </button>
            </div>
        </form>
    );
}

export default ProfileForm


