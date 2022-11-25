import React,{useState} from "react";
import { useMutation } from "react-query";
import {useNavigate} from "react-router-dom";
import { checkUsername,checkEmail,register } from "./getData";
import {Form,FormGroup,Input,Label,FormFeedback,Button,FormText} from "reactstrap";
import { validate } from 'react-email-validator';

export const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [isValidU, setIsValidU] = useState(null)
    const [isValidP, setIsValidP] = useState(null)
    const [isValidE, setIsValidE] = useState(null)
    const [success,setSuccess] = useState(null)
    const [msg,setMsg] = useState("")

    const mutationCheckUsername=useMutation(checkUsername,{
      onSuccess:(data)=>{
        console.log(data.data.rowCount,data.data.username)
        if(data.data.rowCount==0)
          setIsValidU(true)
        else
          setIsValidU(false)
      }
    })

    const handleCheckUsername = () =>{
      if(username)
        mutationCheckUsername.mutate({username:username})
      else
        setIsValidU(false)
    }

    const handleCheckEmail = () =>{
      if(validate(email))
        mutationCheckEmail.mutate({email:email})
      else{
        console.log('kliens oldali ellenőrzés')
        setIsValidE(false)
      }
    }

    const mutationCheckEmail=useMutation(checkEmail,{
      onSuccess:(data)=>{
        console.log(data.data.rowCount,data.data.username)
        if(data.data.rowCount==0)
          setIsValidE(true)
        else
          setIsValidE(false)
      }
    })

    const handleCheckPassword = () =>{
      password.length<6 ? setIsValidP(false) : setIsValidP(true)
    }

    const mutationRegister=useMutation(register,{
      onSuccess:(data)=>{
        if(data.data?.id){
          setSuccess(true)
          setUsername('')
          setEmail('')
          setPassword('')
          setIsValidU(null)
          setIsValidE(null)
          setIsValidP(null)
        }
        else{
          setSuccess(false)
        }
        setMsg(data.data.msg)
      }
      })

  

  return (
    <Form className="login border p-3 shadow mt-1 rounded">
        <h3>Sign Up Form</h3>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input className={isValidU==null ? "" : (isValidU ? "is-valid" : "is-invalid")}
            autoFocus
            value={username} onChange={(e)=>setUsername(e.target.value)}
            onBlur={handleCheckUsername}
            onKeyPress={(e)=>e.key=='Enter' ? document.getElementById('email').focus() : ''}
        />
        <FormFeedback>Username already exists!</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" id="email" className={isValidE==null ? "" : (isValidE ? "is-valid" : "is-invalid")}
            value={email} onChange={(e)=>setEmail(e.target.value)}
            onBlur={handleCheckEmail}
            onKeyPress={(e)=>e.key=='Enter' ? document.getElementById('password').focus() : ''}
        />
        <FormFeedback >Email already exists! / Email is incorrect!</FormFeedback>
        <FormText>Email must contain '@' character!</FormText>
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" id="password" className={isValidP==null ? "" : (isValidP ? "is-valid" : "is-invalid")}
            value={password} onChange={(e)=>setPassword(e.target.value)}
            onBlur={handleCheckPassword}
            
        />
        <FormFeedback>Invalid password!</FormFeedback>
        <FormText>Password must be at least 6 characters!</FormText>
      </FormGroup>


      <div>
        <Input type="button" className="btn btn-dark" 
        disabled={!isValidU || !isValidE || !isValidP}
        onClick={()=>mutationRegister.mutate({username:username,email:email,password:password})}
        value="Sign up"/>
      </div>
      <div className="msg">{msg}</div>
      {success && <div className="btn btn-outline-dark mt-2"
      onClick={()=>navigate('/login')}
      >Jelentkezz be</div>}
    </Form>
  );
};
