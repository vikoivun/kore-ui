'use strict';

import React from 'react';
import DocumentTitle from 'react-document-title';

class AboutPage extends React.Component {

  render() {
    return (
      <DocumentTitle title='Tietoa palvelusta - Koulurekisteri'>
        <div className='about-page'>
          <div className='container'>
            <h1>Tietoa Koulurekisteri.hel.fi –palvelusta</h1>
            <p className='lead'>
              Koulurekisteri on vuonna 2011 perustettu Helsingin kaupunginarkiston
              ja opetusviraston yhteinen hanke. Projekti tuottaa Helsingin koulujen
              menneisyyttä ja nykypäivää tarkastelevan yhtenäisen koulurekisterin,
              joka kattaa kaikki erilaiset Helsingissä toimineet koulut 1550-luvulta
              nykypäivään.
            </p>
            <p>
              Koulurekisterin kautta on mahdollista saada tietoja yksittäisen koulun
              historiasta, sen nimen muutoksista, koulurakennuksista, rehtoreista,
              koulujen yhdistymisistä, koulutoiminnan päättymisestä ja koulujen
              arkistomateriaalien sijainnista. Lisäksi tietokannasta saa myös
              kattavan kuvan Helsingin kouluverkosta tiettynä ajanjaksona. Esimerkiksi
              minkä verran oli ruotsinkielisiä kouluja, miten koulut jakautuvat
              kaupunginosittain jne.
            </p>
            <p>
              Koulurekisteri on tarkoitettu päätöksentekijöille, virastoille,
              viran- ja toimenhaltijoille, kaupunkilaisille ja tutkijoille.
              Kouluja koskeva informaatio on hajallaan eikä opetusvirastolla tai
              kaupunginarkistolla ole aiemmin ollut yhtenäistä tietokantaa kouluista
              ja niiden historiasta. Erityisesti rekisteri tulee helpottamaan
              kaupunginarkiston tietopalvelun ja opetusviraston arkiston ja neuvonnan
              toimintaa, joille tulee paljon kyselyjä liittyen kouluihin. Myös kouluilla
              on tarvetta tämän tyyppiselle tiedolle.
            </p>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default AboutPage;
