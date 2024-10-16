/* eslint-disable react/prop-types */
import { formatDistance } from 'date-fns'
import avaterImage from '../../../../assets/defaultImage/avatar.png'
import { Link } from "react-router-dom"
import { Dot } from '../../../../svg/Dots'

const ShowPost = ({post}) => {
  console.log(post)
  return (
    <div className="w-full p-3 mb-4 rounded-md shadow-md">
      <div className="flex items-center justify-between ">
        <div className="flex items-center w-2/4 gap-x-4">
          <div className='w-12 h-12 overflow-hidden rounded-full '>
          <Link to={`/profile/${post.user.username}`}>
          <img className='object-cover w-full h-full' src={post.user.profilePicture || avaterImage} alt="profile Photo" />
          </Link>
          </div>
          <div>
            <Link className='font-gilroyMedium' to={`/profile/${post.user.username}`}>
            {post.user.username}
            </Link>
            <span className='block text-sm text-secondary_color font-gilroyRegular'>{formatDistance(post.createdAt ,new Date(), { addSuffix: true })}</span>
          </div>
        </div>
       <div className='cursor-pointer text-blue'>
       <Dot/>
       </div>
      </div>
        
    </div>
  )
}

export default ShowPost