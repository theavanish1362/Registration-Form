import React, { useState } from 'react'

const Registration = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const [form, setform] = useState({
        userId: 49,
        name:"",
        email:"",
        phone:"",
        password: "",
        confirmPassword: "",
        address: ""

    })

    const handleChange =(e) =>{
        setform({...form, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",
                    header: {"Content-Type": "application/json"},
                    body:JSON.stringify(form)
                }
            );

            if(!res.ok) throw new Error("Registration Failed");
        } catch(err){
            setError(err.message || "Error Occurred")
        } finally{
            setLoading(false);
        }

    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10'>
            <h2 className='text-xl font-bold mb-5 flex justify-center'>User Registration</h2>
            {["name", "email", "phone", "password", "confirmPassword", "address"].map((field)=>(
                <input key={field} type={field.includes("password")?"password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={form[field]}
                required 
                onChange={handleChange}
                className='w-full p-2 border-1 rounded-2xl m-4'/>
            ))}

            <button type='submit' className='w-full border-2 p-2 rounded-2xl m-4 bg-blue-800 text-white'>Submit</button>

        </form>
    </div>
  )
}

export default Registration