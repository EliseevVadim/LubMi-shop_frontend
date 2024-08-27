import React, { useEffect, useState } from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import Image from "next/dist/client/legacy/image";
import perfumerDifferent from '../../../../public/perfumer-different.jpg'

const PerfumerDifferent = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharacters = 600; // Количество символов, которые нужно показывать

  const fullText = `
    <h3>Всю парфюмерную продукцию можно условно поделить на 3 «группы»:</h3>
    <p><span>Массмаркет</span> — массовые продажи, или «товары широкого потребления», они не отличаются сложностью ароматов,
    подбором сырья, тонкостью нот, но у них другое преимущество — доступность. Такие флакончики массово
    заполоняют полки супермаркетов, павильоны на рынках, в подземных переходах.</p>
    <p><span>Luxe</span> - как правило, парфюмерное творчество известных домов мод, ювелиров, парфюмерных компаний. Данная
    продукция следует тенденциям моды и всегда нравится людям. Такая любовь неслучайна. При создании того, или
    иного аромата класса люкс, парфюмерные компании инвестируют колоссальные денежные средства на изучение
    общественного мнения. Парфюмерия Luxe – это всегда грандиозные шоу, широкомасштабные рекламные кампании с
    участием голливудских звёзд первой величины, топ-моделей и выдающихся спортсменов.</p>
    <p><span>Нишевая парфюмерия</span> — творение парфюмеров — индивидуалов, или парфюмерных домов с богатой историей и
    огромным опытом в создании парфюма. В таких домах трудятся самые креативные и тонкочувствующие «носы»
    нашего времени. Нишевая парфюмерия (от французского la niche - ниша, ячейка) - не просто запахи, это
    искусство создания аромата, религия парфюмерных нот и философия раскрытия парфюма на коже человека.</p>
    <p>Зачастую нишевая парфюмерия использует весьма необычное сырьё в производстве своих ароматов. Ароматы могут
    удивлять, влюблять в себя, смущать, шокировать, погружать в воспоминания; одно точно — они не оставят вас
    равнодушными. Ноты бывают разными, необычными, редко встречающимися. К примеру: Водка и шампанское,
    гваяковое дерево, белые трюфели и шампиньоны, мокрый табак и древесина на морозе, запах старого авто и
    медовой патоки.</p>
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
    <div className='perfumery-different'>
      <MaxWithLayout>
        <div className="perfumery-perfumery-line">
          <div className="perfumery-perfumery-line-extra" />
        </div>
        <h2>
          В ЧЕМ ОТЛИЧИЯ НИШЕВОЙ, ЛЮКСОВОЙ
          И МАССМАРКЕТ ПАРФЮМЕРИИ
        </h2>
      </MaxWithLayout>
      <MaxWithLayout padding={0}>
        <div className="perfumery-different-inside">
          <div className="perfumery-different-inside-img">
            <Image
              src={perfumerDifferent}
              layout={"fill"}
              objectFit={'cover'}
            />
          </div>
          <div className="perfumery-different-inside-text p-h20-media">
            <h3>
              Всю парфюмерную продукцию можно условно
              поделить на 3 «группы»:
            </h3>
            <p>
              <span>Массмаркет</span> — массовые продажи, или «товары широкого потребления», они не отличаются
              сложностью ароматов,
              подбором сырья, тонкостью нот, но у них другое преимущество — доступность. Такие флакончики массово
              заполоняют полки супермаркетов, павильоны на рынках, в подземных переходах.
            </p>
            <p>
              <span>Luxe</span> - как правило, парфюмерное творчество известных домов мод, ювелиров, парфюмерных
              компаний. Данная
              продукция следует тенденциям моды и всегда нравится людям. Такая любовь неслучайна. При создании того, или
              иного аромата класса люкс, парфюмерные компании инвестируют колоссальные денежные средства на изучение
              общественного мнения. Парфюмерия Luxe – это всегда грандиозные шоу, широкомасштабные рекламные кампании с
              участием голливудских звёзд первой величины, топ-моделей и выдающихся спортсменов.
            </p>
            <p>
              <span>Нишевая парфюмерия</span> — творение парфюмеров — индивидуалов, или парфюмерных домов с богатой
              историей и
              огромным опытом в создании парфюма. В таких домах трудятся самые креативные и тонкочувствующие «носы»
              нашего времени. Нишевая парфюмерия (от французского la niche - ниша, ячейка) - не просто запахи, это
              искусство создания аромата, религия парфюмерных нот и философия раскрытия парфюма на коже человека.
            </p>
            <p>
              Зачастую нишевая парфюмерия использует весьма необычное сырьё в производстве своих ароматов. Ароматы могут
              удивлять, влюблять в себя, смущать, шокировать, погружать в воспоминания; одно точно — они не оставят вас
              равнодушными. Ноты бывают разными, необычными, редко встречающимися. К примеру: Водка и шампанское,
              гваяковое дерево, белые трюфели и шампиньоны, мокрый табак и древесина на морозе, запах старого авто и
              медовой патоки.
            </p>
          </div>
          <div className="perfumery-different-inside-mob-text p-h20-media">
            <div dangerouslySetInnerHTML={{ __html: displayedText }} className="perfumery-different-inside-mob-text" />
            <button onClick={toggleExpand} className="perfumery-different-inside-button">
              {isExpanded ? 'Скрыть' : 'Показать еще'}
            </button>
          </div>
        </div>
      </MaxWithLayout>

    </div>
  );
};

export default PerfumerDifferent;
