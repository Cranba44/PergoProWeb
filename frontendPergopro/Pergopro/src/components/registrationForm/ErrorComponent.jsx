const ErrorComponent = (props) => {
    const {children} = props
  return (
    <div style={{color:'white', backgroundColor:'GrayText', border:1, borderRadius:5}}>{children}</div>
  )
}

export default ErrorComponent