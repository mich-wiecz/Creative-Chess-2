import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export function LanguageSwitch({
  lang,
  onClick
}) {
  return (
    <ButtonGroup
      aria-label="Zmiana języka"
      style={{
        position: 'absolute',
        top: 70,
        right: 0,
        width: 120,
        zIndex: 1000
      }}
    >
      <Button
        variant="dark"
        active={lang === 'pl'}
        onClick={onClick}
      >
        PL
        </Button>
      <Button
        variant="dark"
        active={lang === 'en'}
        onClick={onClick}
      >
        EN
        </Button>
    </ButtonGroup>
  );
}
