/* eslint-disable react/prop-types */

const PostError = ({error,setError}) => {
  return (
    <>
    <div className="absolute top-0 right-0 z-10 flex items-center justify-center h-full postError bg-blur">

    <div className="text-center">
    <p className="text-red font-gilroyBold">{error}</p>
    <button onClick={()=>setError("")} className="px-4 py-2 mt-2 text-white rounded-lg bg-green font-gilroyRegular">try again</button>
    </div>
    </div>
    </>
  )
}

export default PostError