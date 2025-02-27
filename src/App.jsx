import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from './SupabaseClient.jsx';

const imgSrc = '/static/empty-card.png';
const logoSrc = '/static/manafa-black-logo.png';

function App() {
  const [text, setText] = useState("");
  const { t, i18n } = useTranslation();
  const notify = () => toast.success(t('image_downloaded'), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  function handleText(event) {
    setText(event.target.value);
  }

  function switchLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  function downloadImageWithText() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      ctx.font = i18n.language === 'ar' ? '50px Cairo' : '50px NeuePlak';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'black';
      const x = canvas.width / 2;
      const y = canvas.height - 175;
      ctx.fillText(text, x, y);
      const base64image = canvas.toDataURL("image/png");
      const anchor = document.createElement('a');
      anchor.href = base64image;
      anchor.download = `manafa-eid-${kebabCase(text)}-${Date.now()}.png`;
      anchor.click();
      anchor.remove();
      notify();
      let data = {
        text: text,
        language: i18n.language,
        generation_date: getKsaTime().toUTCString(),
      };
      saveData('generated_cards', data);
    };
    image.onerror = (error) => {
      console.error("Error loading image", error);
    };
  }

  async function saveData(tableName, data) {
    const { error } = await supabase
      .from(tableName)
      .insert(data);
    if (error) throw new Error(error.message);
  }

  const kebabCase = string => string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

  function getKsaTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ksaTime = new Date(utc + (3600000 * 3)); // UTC + 3 hours for KSA
    return ksaTime;
  }

  const isRtl = i18n.language === 'ar';
  const fontClass = isRtl ? 'font-cairo' : 'font-neueplak';
  const direction = isRtl ? 'rtl' : 'ltr';

  return (
    <div dir={direction} className={`flex flex-col min-h-screen bg-my-image ${fontClass}`}>
      <div className="pt-8 flex-grow">
        <div className="flex justify-center items-center w-full">
          <img src={logoSrc} alt={t('Eid card background')} className="w-48 h-24 object-contain rounded-md" />
        </div>
        <div className="text-black text-sm flex space-x-2 justify-center mt-2 mb-8" dir="ltr">
          <span
            onClick={() => switchLanguage('en')}
            className={`cursor-pointer pt-0.5 font-bold font-neueplak hover:opacity-75 ${i18n.language === 'en' ? 'underline' : ''
              }`}
          >
            English
          </span>
          <span className="font-sans">|</span>
          <span
            onClick={() => switchLanguage('ar')}
            className={`cursor-pointer font-bold font-cairo hover:opacity-75 ${i18n.language === 'ar' ? 'underline' : ''
              }`}
          >
            العربية
          </span>
        </div>
        <p className={`text-xl text-black text-center mb-8 max-w-md mx-auto`}>{t('message')}</p>
        <div className="flex justify-center items-center">
          <div className="bg-white p-2 shadow-lg rounded-lg max-w-sm w-full">
            <div className="relative" id="image-download">
              <img src={imgSrc} alt={t('Eid card background')} className="object-cover rounded-md" />
              <h1 className={`absolute bottom-[3rem] left-0 right-0 text-center font-medium mx-7 text-black text-[20px]`}>{text}</h1>
            </div>
            <div className="mt-4">
              <input
                type="text"
                dir={direction}
                className={`w-full font-medium p-2 text-md border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out`}
                placeholder={t('input_name')}
                onChange={handleText}
                value={text}
                required
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out focus:outline-none w-full`}
                onClick={downloadImageWithText}
              >
                {t('download')}
              </button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                font="Cairo"
              />
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center font-light font-sans text-gray-500 text-xs my-8">
        <p>Developed by Manafa Tech Team. © {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;