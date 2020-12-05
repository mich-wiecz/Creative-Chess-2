import React, {useRef, forwardRef} from 'react';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Card from 'react-bootstrap/Card';
 import Image from 'react-bootstrap/Image';
 import InputGroup from 'react-bootstrap/InputGroup';
 import FormControl from 'react-bootstrap/FormControl';
 import ProfilePicture from 'assets/profi.jpg';
import GithubIcon from 'assets/GitHub-Mark-32px.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'contexts/TranslationProvider';





const ContactDataItem = forwardRef((
  {
  prepend,
  label,
  value,
  onTextClick, 
  onClipboardClick,
}
, ref) => {
    return (
        <InputGroup className="mb-3 px-3 pr-md-5">
        <InputGroup.Prepend>
          <InputGroup.Text id={label}>
           {prepend}
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          ref={ref}
          aria-label={label}
          readonly
          value={value}
          onClick={() => onTextClick(ref)}
        />
        {
            onClipboardClick &&
            <InputGroup.Append
            className="cursor-pointer "
            onClick={() => onClipboardClick(ref)}
            >
          <InputGroup.Text 
          id={label} 
          className="bg-dark">
          <FontAwesomeIcon 
         icon={faClipboard}
         size="sm"
         color="white"
         />
          </InputGroup.Text>
        </InputGroup.Append>
        }

      </InputGroup>
    )
})




const Prelude =  forwardRef((_props, ref) => {

    const emailInput = useRef(null);
    const githubInput = useRef(null);
    const phoneInput = useRef(null);


   const handleCopyToClipboard = (ref) => {
    if (!ref || !ref.current) return;
    ref.current.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
   } 

   const handleSelectingAll = (ref) => {
     console.log(ref)
    if (!ref || !ref.current) return;
    ref.current.select();
   }



       
const getTranslation = useTranslation();

     return (
<Card ref={ref} className="my-5" id="prelude" onClick={() => {
  console.log(ref.current.offsetTop)
}}>
  <Card.Header>
  <Card.Title className="text-center">
    {
      getTranslation({
        pl: "Dzień dobry",
        en: "Hello"
      })
    }
     
     </Card.Title>
  </Card.Header>
<Row>
    <Col className="text-center" xs={12} md={4}>
  <Card.Img 
  variant="left" 
  src={ProfilePicture} 
  width="200px" 
  className="p-2 thumbnail text-center"
  />
  </Col>
  <Col xs={12} 
  md={8}
  >
  <Card.Body>
    <Card.Text>
      {
        getTranslation({
          en: (
            <>
      <span className="d-block">
        My name is Michał Wieczorek.
      </span>
        <span className="d-block">
        I am 22 years old.
      </span>
      <span className="d-block lead">
      I offer my abilities and skills as a front-end developer. I cordially invite you to check the text below and contact me.
      </span>
            </>
          ),
      pl: (
        <>
      <span className="d-block">
        Nazywam się Michał Wieczorek.
      </span>
        <span className="d-block">
        Mam 23 lata.
      </span>
      <span className="d-block lead">
      Oferuję swoje zdolności i umiejętności jako front-end developer. Zapraszam do zapoznania się z tekstem poniżej i do kontaktu.
      </span>
            </>
      )
        })
      }
       
    </Card.Text>
  </Card.Body>
  <section>

  <ContactDataItem 
   prepend={"@"}
   label="email"
   value="m98.wieczorek@onet.pl"
  ref={emailInput}
  onClipboardClick={handleCopyToClipboard}
  onTextClick={handleSelectingAll}
  />

    <ContactDataItem 
   prepend={
    <Image 
    src={GithubIcon} 
    alt="logo github" 
    style={{
        width: '1rem'
    }}
    />
   }
   label="github account"
   value="https://github.com/mich-wiecz"
  ref={githubInput}
  onClipboardClick={handleCopyToClipboard}
  onTextClick={handleSelectingAll}
  />

<ContactDataItem 
   prepend={
    <FontAwesomeIcon 
     icon={faPhoneAlt}
     size="sm"
     />
   }
   label="telephone number"
   value="698 419 296"
  ref={phoneInput}
  onTextClick={handleSelectingAll}
  />
  </section>
  </Col>
  </Row>
</Card>

     )
 })
 

 export default Prelude;