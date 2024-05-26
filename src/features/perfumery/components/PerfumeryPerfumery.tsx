import React, { useState } from 'react';
import Image from "next/dist/client/legacy/image";
import perfumeryPerfumeryOne from "../../../../public/perfumery-perfumery-one.png";
import perfumeryPerfumeryTwo from "../../../../public/perfumery-perfumery-two.png";
import perfumeryPerfumeryThree from "../../../../public/perfumery-perfumery-three.png";
import MaxWithLayout from "../../../layouts/MaxWithLayout";

const PerfumeryPerfumery = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharacters = 300;

  const fullText = `
            <p>
            Любимые духи — пленительный аромат, изящный флакон, и коробочка с логотипом любимого бренда — объект,
            пропитанный образами и эмоциями. Чем больше мы знаем об истории духов, о фирме, под чьим именем они
            выпущены, о личности заказчика или создателя, - тем богаче для нас звучит мелодия аромата.
          </p>
          <p>
            Когда мы душимся, ароматы проникают в нас и постепенно становятся частью нас самих.
            Если вы любите ароматы и духи для вас не просто парфюмерная композиция, а нечто большее — настроение,
            воспоминания, эмоции и чувства — то мой парфюмерный магазинчик точно для вас.
          </p>
  `;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateHTML = (str: any, maxLength: any) => {
    if (typeof document === 'undefined') {
      return str;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = str;

    let truncatedStr = '';
    let charCount = 0;

    const truncateNode = (node: any) => {
      if (charCount >= maxLength) {
        return;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        if (charCount + node.textContent.length > maxLength) {
          truncatedStr += node.textContent.substring(0, maxLength - charCount) + '...';
          charCount = maxLength;
        } else {
          truncatedStr += node.textContent;
          charCount += node.textContent.length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        truncatedStr += `<${node.nodeName.toLowerCase()}`;
        for (let attr of node.attributes) {
          truncatedStr += ` ${attr.name}="${attr.value}"`;
        }
        truncatedStr += '>';
        for (let child of node.childNodes) {
          truncateNode(child);
          if (charCount >= maxLength) {
            break;
          }
        }
        truncatedStr += `</${node.nodeName.toLowerCase()}>`;
      }
    };

    for (let child of tempDiv?.childNodes as any) {
      truncateNode(child);
      if (charCount >= maxLength) {
        break;
      }
    }

    return truncatedStr;
  };

  const displayedText = isExpanded ? fullText : truncateHTML(fullText, maxCharacters);


  return (
    <div className="perfumery-perfumery">
      <MaxWithLayout padding={'0 20px'}>
        <div className="perfumery-perfumery-line">
          <div className="perfumery-perfumery-line-extra" />
        </div>
        <h2>
          Парфюмерия
        </h2>
        <div className="perfumery-perfumery-mob">
          <div dangerouslySetInnerHTML={{ __html: displayedText }} className="perfumery-perfumery-mob" />
          <button onClick={toggleExpand} className="perfumery-perfumery-mob-button">
            {isExpanded ? 'Скрыть' : 'Показать еще'}
          </button>
        </div>
      </MaxWithLayout>
      <MaxWithLayout padding={'0'}>
        <div className="perfumery-perfumery-inside p-h20">
          <div className="perfumery-perfumery-inside-left">
            <p>
              Любимые духи — пленительный аромат, изящный флакон, и коробочка с логотипом любимого бренда — объект,
              пропитанный образами и эмоциями. Чем больше мы знаем об истории духов, о фирме, под чьим именем они
              выпущены, о личности заказчика или создателя, - тем богаче для нас звучит мелодия аромата.
            </p>
            <p>
              Когда мы душимся, ароматы проникают в нас и постепенно становятся частью нас самих.
              Если вы любите ароматы и духи для вас не просто парфюмерная композиция, а нечто большее — настроение,
              воспоминания, эмоции и чувства — то мой парфюмерный магазинчик точно для вас.
            </p>
            <div className="perfumery-perfumery-inside-left-img">
              <Image
                src={perfumeryPerfumeryOne}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
          </div>
          <div className="perfumery-perfumery-inside-right">
            <div className="perfumery-perfumery-inside-right-img-one">
              <Image
                src={perfumeryPerfumeryTwo}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
            <div className="perfumery-perfumery-inside-right-img-two">
              <Image
                src={perfumeryPerfumeryThree}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
          </div>
        </div>
      </MaxWithLayout>
    </div>
  );
};

export default PerfumeryPerfumery;
