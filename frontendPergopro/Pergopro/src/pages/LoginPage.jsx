import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { login, signUp } from "../core/services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { doLoginActions } from "../components/user/UserActions";
import { useState } from "react";
import HomePage from "./HomePage";
// import ErrorGeneralComponent from '../components/registrationForm/ErrorGeneralComponent';
// import ErrorComponent from '../components/registrationForm/ErrorComponent';


const initialValuesForm = {
    firstName:'',
    lastName:'',
    username:'',
    email: '',
     password:'' 
     
}
const userSchema = Yup.object({
    firstName:Yup.string().required('You must enter a firstname'),
    lastName:Yup.string().required('You must enter a lastname'), 
    username:Yup.string().required('Must be an unique username'),
    email: Yup.string().email().required('An email is a must'),
     password:Yup.string().required().min(4, 'Pass need to be larger than 4 characters')
})

const submitHandler = () => {
    alert('Registration succesfull!')
}



const LoginPage = () => {


    const user= useSelector((state)=> state.userReducer.user);
    const dispatch = useDispatch()

    const [flagLogin, setFlagLogin] = useState(true);
    const [loginInfo, setLoginInfo] = useState({})
    const [registerInfo, setRegisterInfo] = useState({});

    

    const doLogin = async () => {
        const userInfo = await login(loginInfo.email, loginInfo.password)
        dispatch(doLoginActions({
            user: userInfo
        }))
        console.log('Usuario logeado')
    }
 
    //Pasamos los valores tomados del formulario formik para que se tomen como body en el backend
    const doRegister = async (values) => {
        const userInfo= await signUp(values)
        dispatch(doLoginActions({
            user: userInfo
        }))
        console.log('Usuario registrado')
    }

    const handlerLoginInfo = (name, value) => {
        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    // const handlerRegisterInfo = (name, value) => {
    //     setRegisterInfo({
    //         ...registerInfo,
    //         [name]: value
    //     })
    // }
  return (
    <div>
       
        
        {
                !user? (
                    flagLogin
                    ? (
                        <div>
                             <header>
                                <h1>PergoPro Solutions</h1>
                                <h2>Sueña con un diseño, nosotros lo hacemos realidad.</h2>
                            </header>

                        <h3>Nuestros productos</h3> 
                        
                            <div>
                                <span>Email: </span>
                                <input type="text" placeholder="Email" name='email' onChange={(e)=>handlerLoginInfo(e.target.name, e.target.value)}/>
                            </div>
                            <div>
                            <span>Password: </span>
                            <input type="password" name='password' placeholder="Password" onChange={(e)=>handlerLoginInfo(e.target.name, e.target.value)}/>
                            </div> 
                            <div>
                                <button onClick={doLogin}>Log in</button> 
                            </div>
                            <div>
                                <button onClick={() => setFlagLogin(false)}>Join us?</button>

                            </div>
                            
        
                        
                        <hr />
                    </div>
                    
                    )
                    : (
                        <div>
                            <div>
                                <h3> Here for first time? Sign up now!</h3>
                                <Formik
                                    initialValues={initialValuesForm}
                                    onSubmit={doRegister}
                                    validationSchema={userSchema}
                                    >
                                    {({errors}) => (
                                        <Form style={{display:'flex', flexDirection: 'column', gap: 5}}>
                                             {
                                                errors && <ErrorMessage name='name' component={ErrorGeneralComponent}/>
                                            }

                                                <div style={{display:'flex', flexDirection: 'column', gap: 5}}>
                                                    <span name='name'>firstName</span>
                                                    {
                                                        errors && <ErrorMessage name='firstName' component={ErrorComponent}/>
                                                    }
                                                    <Field type="text" placeholder='firstName' name='firstName' ></Field>
                                                </div>
                                                <div style={{display:'flex', flexDirection: 'column', gap: 5}}>
                                                    <span name='name'>lastName</span>
                                                    {
                                                        errors && <ErrorMessage name='lastName' component={ErrorComponent}/>
                                                    }
                                                    <Field type="text" placeholder='lastName' name='lastName' ></Field>
                                                </div>
                                                <div style={{display:'flex', flexDirection: 'column', gap: 5}}>
                                                    <span>Username</span>
                                                    {
                                                        errors && <ErrorMessage name='username' component={ErrorComponent}/>
                                                    }
                                                    <Field type="text" placeholder='username' name='username'  ></Field>
                                                </div>
                                                <div style={{display:'flex', flexDirection: 'column', gap: 5}}>
                                                    <span>Email</span>
                                                    {
                                                        errors && <ErrorMessage name='email' component={ErrorComponent}/>
                                                    }
                                                    <Field type="text" placeholder='email' name='email' ></Field>
                                                </div>
                                                <div style={{display:'flex', flexDirection: 'column', gap: 5}}>
                                                    <span>Password</span>
                                                    {
                                                        errors && <ErrorMessage name='password' component={ErrorComponent}/>
                                                    }
                                                    <Field type="password" placeholder='password' name='password' ></Field>
                                                </div>
                                                <div>
                                                    <button type='submit'  >Sign up</button>
                                                </div>
                                                
                                        </Form>
                                        // onClick={doRegister}
                                        // onChange={(e) => handlerRegisterInfo(e.target.name, e.target.value)}
                                    )}        
                                </Formik>

                            </div>
                            <div>
                                 <button onClick={() => setFlagLogin(true)}>Go back to login</button>

                            </div>
                        </div>
                    )
                )
                : (
                    <HomePage/>
                )
        }


        
        
        <footer>
            <p>2023. Pergopro Solutions. All rights reserved.</p>
        </footer>
    </div>

  )
}

export default LoginPage