export default function SignInForm() {
  return (
    <div className="my-5">
      <form>
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute top-0 left-0 -mt-4 ml-2 bg-white px-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border border-slate-500 py-1 w-full bg-white px-2"
            required
          />
        </div>
        <div className="mt-5 relative">
          <label htmlFor="password" className="hidden">
            Password
          </label>
          <input
            type={isHidden ? 'password' : 'text'}
            id="password"
            placeholder="Password"
            className="border border-slate-500 px-2 py-1 w-full"
            required
          />
          <div className="absolute top-1 right-0 mr-2 text-sm">
            <span
              onClick={() => {
                setIsHidden(!isHidden);
              }}>
              {isHidden ? (
                <FiEyeOff className="text-lg" />
              ) : (
                <FiEye className="text-lg" />
              )}
            </span>
          </div>
        </div>

        <div className="text-right pt-2">
          <Link className="text-sky-800 font-semibold" to={'/sign-up'}>
            Create Account
          </Link>
        </div>

        <YellowButton
          content="Sign In"
          handleClick={() => console.log('click')}
        />
      </form>
    </div>
  );
}
