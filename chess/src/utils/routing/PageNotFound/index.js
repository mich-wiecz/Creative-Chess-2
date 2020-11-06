import * as React from "react";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import Background404 from "assets/404.jpg";
import Caption404 from "assets/404caption.png";
import classes from "./PageNotFound.module.scss";


export default function PageNotFound() {

  const history = useHistory();

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Background}>
        <img src={Background404} alt="Szachownica z przewróconymi figurami" />
      </div>
      <div className={classes.Caption}>
        <img src={Caption404} alt="napis 404" />
      </div>
      <div className={classes.TextPanel}>
        <p>
          <strong>Strona nie została znaleziona</strong>
        </p>
        <Button
          onClick={() => {
            history.push("/");
          } }
        >
          Przejdź do strony głównej
        </Button>
      </div>
    </div>
  );
}
