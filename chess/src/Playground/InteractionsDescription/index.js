import React from 'react';
import Table from 'react-bootstrap/Table';


export default function Help  () {
    return (
<Table striped className="text-light w-75">
    <caption>
        Tabela z możliwymi interakcjami z szachownicą w trybie: Plac Zabaw
    </caption>
  <thead>
    <tr>
      <th>#</th>
      <th>Interakcja</th>
      <th>Opis</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><kbd>Ctrl</kbd> + klik</td>
      <td>Usunięcie pola</td>
    </tr>
    <tr>
      <td>2</td>
      <td>   {" "}
            Wciśnięty <abbr title="Lewy przycisk myszy">LPM</abbr> +
            przeciąganie</td>
      <td>   {" "}
      Zaznaczanie obszaru, który po puszczeniu{" "}
            <abbr title="Lewy przycisk myszy">LPM</abbr> zostanie dodany (działa
            na dodatkowe - niebieskie kwadraty)
    </td>
    </tr>
    <tr>
      <td>3</td>
      <td >  
        <kbd>Ctrl</kbd> + wciśnięty <abbr title="Lewy przycisk myszy">lpm</abbr> +
            przeciąganie
        </td>
      <td>   {" "}
            Zaznaczanie obszaru, który po puszczeniu{" "}
            <abbr title="Lewy przycisk myszy">lpm</abbr> zostanie usunięty - nie
            działa na pola, na których siedzą figury</td>
    </tr>

    <tr>
      <td>4</td>
      <td >  
          <kbd>Ctrl</kbd> + wciśnięty <abbr title="Lewy przycisk myszy">lpm</abbr> +
            przeciąganie
    </td>
      <td>   {" "}
            Zaznaczanie obszaru, który po puszczeniu{" "}
            <abbr title="Lewy przycisk myszy">lpm</abbr> zostanie usunięty - nie
            działa na pola, na których znajdują się figury</td>
    </tr>

    
    <tr>
      <td>5</td>
      <td >  
        <kbd>Esc</kbd> 
      </td>
      <td>   
      Usunięcie zaznaczenia
      </td>
    </tr>
  </tbody>
</Table>
    )
}