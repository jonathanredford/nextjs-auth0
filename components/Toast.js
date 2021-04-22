import { ToastContainer } from 'react-toastify'

const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  }

  const ToastProvider = () => {
    return <ToastContainer
        toastClassName={({ type }) => contextClass[type || "default"] + 
        " relative flex p-1 min-h-10 mb-4 rounded-md justify-between overflow-hidden cursor-pointer transition"
        }
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="bottom-left"
        autoClose={3000}
        newestOnTop={true}
    />
  }

  export default ToastProvider