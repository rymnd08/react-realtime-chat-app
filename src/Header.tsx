type SignInProps = {
  signIn : () => Promise<void>
  isLogin: boolean
  logOut: () => Promise<void>
}

const Header = ({signIn, isLogin, logOut}: SignInProps) => {
    return ( 
        <div className="absolute top-0 h-16 w-full bg-dark bg-opacity-90 text-white flex justify-between items-center px-8 font-semibold">
          <div className="flex gap-1 items-center">
            <img src="/reactlogo.png" className="h-[30px] " alt="react icon" />
            <h3 className='text-2xl hidden md:block'>React realtime chat app</h3>
          </div>
          {isLogin &&
             <button className='text-2xl' onClick={logOut}><span className="hidden md:inline-block">Logout</span> <i className="bi bi-box-arrow-right"></i></button>
          }
          {!isLogin && 
          <button className='text-2xl' onClick={signIn}>Login <i className="bi bi-google"></i></button>}
        </div>
     );
}
 
export default Header;