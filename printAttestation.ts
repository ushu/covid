import * as Print from "expo-print"
import { format as formatDate } from "date-fns"
const locale = require("date-fns/locale/fr")
import { UserInfo, Kind } from "./UserInfo"

const printAttestation = (userInfo: UserInfo, kind: Kind) =>
  Print.printAsync({
    html: renderToHTML(userInfo, kind),
    orientation: Print.Orientation.portrait,
    // A4 format
    // @ts-ignore
    width: 595,
    height: 842,
  })

const renderToHTML = (userInfo: UserInfo, kind: Kind) =>
  `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet">
  <style>
    :root {
      font-family: 'Lato', sans-serif;
    }

    @page {
      size: A4;
      margin: 20px;
    }

    body {
      margin: 0;
      padding: 60px;
      padding-bottom: 0;
    }

    h1 {
      font-size: 16pt;
      font-weight: 700;
      text-align: center;
    }

    h2 {
      font-size: 10pt;
      font-weight: 300;
      text-align: center;
      margin-bottom: 20px;
      padding-left: 35px;
      padding-right: 35px;
    }

    p,
    dt,
    dd,
    li {
      font-size: 10pt;
    }

    dl {
      display: flex;
      flex-direction: column;
    }

    dl>.line {
      display: flex;
    }

    dl>.line,
    li {
      padding-bottom: 20px;
    }

    li {
      padding-left: 35px;
      list-style: none;
    }

    li:before {
      position: absolute;
      font-size: 30pt;
      margin-top: -14px;
      margin-left: -80px;
    }

    li.checked:before {
      font-family: -apple-system;
      content: '\\2611'
    }

    li.unchecked:before {
      font-family: -apple-system;
      content: '\\2610';
    }
    dt {
      display: block;
      width: 110px;
    }

    dd {
      flex: 1;
    }

    .right {
      text-align: right;
      margin-bottom: 0;
      font-size: 14px;
    }
  </style>

  <title>Document</title>
</head>

<body>
  <h1>ATTESTATION DE DÉPLACEMENT DÉROGATOIRE</h1>
  <h2>En application de l’article 1er du décret du 16 mars 2020 portant réglementation des déplacements dans le cadre de
    la
    lutte contre la propagation du virus Covid-19 :</h2>

  <p>Je soussigné(e)</p>
  <dl>
    <div class="line">
      <dt>Mme / M.</dt>
      <dd>${userInfo.firstName} ${userInfo.lastName}</dd>
    </div>
    <div class="line">
      <dt>Né(e) le :</dt>
      <dd>${formatDate(userInfo.birthDate, "dd MMMM yyyy", { locale })}</dd>
    </div>
    <div class="line">
      <dt>Demeurant: </dt>
      <dd>${userInfo.street}<br>${userInfo.postCode} ${userInfo.city}</dd>
    </div>
  </dl>

  <p>certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par l’article 1er du décret du 16
    mars 2020 portant réglementation des déplacements dans le cadre de la lutte contre la propagation du virus Covid-19
    :</p>

  <ul>
    <li class="${
  kind === "pro" ? "checked" : "unchecked"
  }">déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu’ils
      sont
      indispensables à
      l’exercice d’activités ne pouvant être organisées sous forme de télétravail (sur justificatif permanent) ou
      déplacements
      professionnels ne pouvant être différés ;</li>
    <li class="${
  kind === "shopping" ? "checked" : "unchecked"
  }">déplacements pour effectuer des achats de première nécessité dans des établissements autorisés
      (liste sur
      gouvernement.fr) ;</li>
    <li class="${
  kind === "health" ? "checked" : "unchecked"
  }">déplacements pour motif de santé ;</li>
    <li class="${
  kind === "family" ? "checked" : "unchecked"
  }">déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la
      garde d’enfants ;
    </li>
    <li class="${
  kind === "sport" ? "checked" : "unchecked"
  }">déplacements brefs, à proximité du domicile, liés à l’activité physique individuelle des
      personnes, à
      l’exclusion de
      toute pratique sportive collective, et aux besoins des animaux de compagnie.</li>
  </ul>

  <p class="right">Fait à ${userInfo.city}, le ${formatDate(
    new Date(),
    "dd/MM/yyyy",
    { locale },
  )}</p>
  <p class="right">(signature)</p>
</body>

</html>`

export default printAttestation