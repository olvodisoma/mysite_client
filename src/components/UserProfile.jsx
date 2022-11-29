import React from "react";
import { FileDrop } from "./FileDrop";
import { Form,FormGroup,Label,Input,Col } from "reactstrap";

export const UserProfile = () => {
  return (
    <div>
        <h6>Felhasználói fiók</h6>
      <Form>
        <FormGroup row>
          <Label for="pw" sm={12}>
            New Password
          </Label>
          <Col sm={8}>
            <Input
              id="pw"
              name="password"
              type="password"
            />
          </Col>
          <Col sm={4}>
            <Input
              type="button"
              value="changePassword"
              onClick={()=>console.log("Change Password...")}
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};
