import React,{useState} from "react";
import { FileDrop } from "./FileDrop";
import {useMutation} from "react-query";
import { Form,FormGroup,Label,Input,Col,Button,Spinner } from "reactstrap";
import { updateAvatar } from "./getData";
import { MyModal } from "./MyModal";

export const UserProfile = ({loggedInUser,setLoggedInUser}) => {
  const [selFile,setSelFile] = useState({})
  const [msg,setMsg] = useState('')
  const [isUploading,setIsUploading] = useState(false)
  const [modal, setModal] = useState(false)

  //console.log(selFile)

  const mutationAvatar=useMutation(updateAvatar,{
    onSuccess: (data) =>{
      console.log(data.data.msg)
      setMsg(data.data.msg)
      setLoggedInUser({...loggedInUser,avatar:data.data.avatar,avatar_id:data.data.avatar_id})
      setIsUploading(false)
    }
  })

  const handleUpdateAvatar=()=>{
    console.log("Ajaxot hívjuk")
    const formdata = new FormData()
    formdata.append("selFile",selFile)
    formdata.append("username",loggedInUser.username)
    formdata.append("avatar_id",loggedInUser.avatar_id)
    setIsUploading(true)
    mutationAvatar.mutate(formdata)
  }

  const handleDelete=()=>{
    console.log("Törlés")
    setModal(true)
  }


  return (
    <div className="mt-3">
      <h6 className="p-2 border-bottom text-center">Felhasználói fiók</h6>
      <div className="row border p-1">
        <div className="col-4">Email:</div>
        <div className="col-8">{loggedInUser.email}</div>
      </div>
      <Form className="border p-2 m-2 shadow">
        <FormGroup row>
          <Label for="pw" sm={12}>
            New Password
          </Label>
          <Col sm={8}>
            <Input id="pw" name="password" type="password" />
          </Col>
          <Col sm={4}>
            <Input
              type="button"
              value="changePassword"
              className="btn btn-primary"
              onClick={() => console.log("Change Password...")}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <FileDrop setSelFile={setSelFile} />
        </FormGroup>

        <FormGroup row className="justify-content-center">
          {!isUploading ? (
            <Input
              type="button"
              className="btn btn-primary w-50 m-1"
              value="Update Avatar"
              disabled={!selFile.name}
              onClick={handleUpdateAvatar}
            />
          ) : (
            <Button color="primary" className="w-50 m-1" disabled>
              <Spinner size="sm">Uploading Avatar...</Spinner>
              <span> Loading</span>
            </Button>
          )}

          <Input
            type="button"
            className="btn btn-danger w-50 m-1"
            onClick={handleDelete}
            value="Delete My Profile"
          />
        </FormGroup>
        <p className="msg">{msg}</p>
      </Form>
      {modal && <MyModal modal={modal} setModal={setModal} username={loggedInUser.username}
      avatar_id={loggedInUser.avatar_id} setLoggedInUser={setLoggedInUser}/>}
    </div>
  );
};
