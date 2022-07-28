import './src/styles/global.css'

export const Wrapper = ({ children }) => (
  <>
    {/* <MyContext.Provider value={...}> */}
    <div className='wrapped'>{children}</div>
    {/* </MyContext.Provider> */}
  </>
)
