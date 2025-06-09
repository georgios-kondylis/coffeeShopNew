import React from 'react'

const SkeletonCard = () => {
  return (
     <div className="bg-[#d9d9d9] animate-pulse rounded-xl p-4 h-[180px] w-full">
      <div className="w-1/2 h-4 bg-gray-300 rounded mb-3"></div>
      <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
      <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
    </div>
  )
}

export default SkeletonCard