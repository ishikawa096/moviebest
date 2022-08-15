import React from "react"

const Headline = ({ children }: { children: React.ReactElement }) => (
  <div className='w-full text-2xl lg:text-4xl text-center py-10 tracking-widest text-gray-700'>
    {children}
  </div>
)

export default Headline
