import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

class ContactMeInfo extends React.Component {
  render() {
    return (
      <div>
        <Card className="contactMeInfo">
          <CardBody>
            <CardTitle>Contact</CardTitle>
            <CardSubtitle>info@mysite.com</CardSubtitle>
            <CardSubtitle>Tel: 123-456-7890</CardSubtitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default ContactMeInfo;
