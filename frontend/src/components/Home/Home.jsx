import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({user}) => {
  return (
    <section className="relative h-[89vh] w-full flex flex-col W_LIMIT justify-center">
      {/* ABSOLUTE */}
      {user && (
        <h1 className="txtSH absolute top-[20px] left-0">
          Welcome {user ? user.firstName : 'Guest'}, had your coffee yet?
        </h1>
      )}

      <div className="flex flex-col">
        <h1 className="txtSH font-semibold text-[50px] max-lg:text-[40px] max-md:text-[30px]">
          Crafted with Care <br /> Inspired by Tradition
        </h1>
        <p className="txtSH mt-[20px] text-[20px] max-md:text-[16px]">
          Step into a world of timeless coffee culture, <br /> where flavor,
          warmth, and elegance blend in perfect harmony.
        </p>
    
        <Link to={'/menu'} className="BTN_STYLES">
          Get Yours
        </Link>
      </div>
    </section>
  )
}

export default Home