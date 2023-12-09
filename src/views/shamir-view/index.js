import React from "react";
import "./style.css";
import imageShamir from "../../images/Shamir-1.jpg";
import GlacierImg from "../../images/Glacier-Interstitial.jpg"
import useScrollTop from "../../hooks/useScrollTop";
const ShamirView = () => {
  useScrollTop(1)

  return (
    <main>
      <div className='shamir-header'>
        <p>Shamir</p>
      </div>
      <div className='shamir-main-container'>
        <div className='shamir-section-one'>
          <div className='shamir-section-one-text'>
            <h1>Industria optike SHAMIR</h1>

            <p>
              Industria Optike Shamir eshte nje nga kompanite lider ne prodhimin
              e lenteve cilesore progressive dhe te thjeshta. E themeluar ne
              vitin 1972, fillimisht e orientuar drejt prodhimit te lenteve
              bifokale, kompania u fokusua shpejt drejt prodhimit te lenteve te
              avancuara progressive.Mbi pese dekada, Shamir ka fituar nje vend
              te rendesishem si nje kompani boterore e njohur per inovacion,
              teknologjine e xhamit dhe praktikat me te rrepta sa i perket
              sigurimit te cilesise se produkteve te saj. Shamir perdor dhe
              shfrytezon teknika te avancuara te prodhimit te materialeve, me
              qellim revolucionarizimin e sherbimit ndaj klienteve te tij.Ofron
              zgjidhje zgjidhje per cdo nevoje te kujdesit ndaj
              shikimit,gjithashtu mbulon nje game te gjere produktesh optike ne
              varesi te mjedisit te punes apo aktivitetesh sportive.
            </p>
          </div>
          <div className='shamir-section-one-image'>
            <h1 className='shamir-section-one-image-title'>SHAMIR</h1>
            <img src={imageShamir} alt='' />
          </div>
        </div>
        <div className='shamir-section-one'>
          <div className='shamir-section-one-text'>
            <p>
              Shamir Glacier Plus UV siguron mbrojtje maksimale te rrezeve uv
              per syte tuaj, duke bllokuar rrezet qe vijne drejt ne sy dhe ato
              qe vijne nga reflektimet dhe per kete arsye,mbrojtja eshte
              maksimale.  <br /> <br />
              Veshja e lentes nuk do te konsumohet ose do te
              gervishet,duke e lene lenten te qarte per nje kohe te gjate
              gjithashtu dhe shume e lehte per tu pastruar
            </p>
          </div>
          <div className='shamir-section-one-image'>
            <img src={GlacierImg} alt='' />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShamirView;
