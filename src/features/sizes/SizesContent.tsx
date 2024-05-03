import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import LineBlock from "../../components/client/common/LineBlock";

const SizesContent = () => {

  return (
    <MaxWithLayout>
      <div className="sizes">
        <LineBlock />
        <h1>
          Таблица размеров
        </h1>
        <h2>
          КАК ВЫБРАТЬ ОДЕЖДУ СВОЕГО РАЗМЕРА
        </h2>

        <div className="sizes-inside">
          <table>
            <thead>
            <tr>
              <th>СТАНДАРТ</th>
              <th>ОБХВАТ ГРУДИ</th>
              <th>ОБХВАТ ТАЛИИ</th>
              <th>ОБХВАТ БЕДЕР</th>
              <th>РОССИЯ</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>XXS</td>
              <td>до 87</td>
              <td>до 56</td>
              <td>до 87</td>
              <td>38</td>
            </tr>
            <tr>
              <td>XXS</td>
              <td>до 87</td>
              <td>до 56</td>
              <td>до 87</td>
              <td>38</td>
            </tr>
            <tr>
              <td>XXS</td>
              <td>до 87</td>
              <td>до 56</td>
              <td>до 87</td>
              <td>38</td>
            </tr>
            <tr>
              <td>XXS</td>
              <td>до 87</td>
              <td>до 56</td>
              <td>до 87</td>
              <td>38</td>
            </tr>
            <tr>
              <td>XXS</td>
              <td>до 87</td>
              <td>до 56</td>
              <td>до 87</td>
              <td>38</td>
            </tr>
            <tr>
              <td>XXS</td>
              <td>до 87</td>
              <td>до 56</td>
              <td>до 87</td>
              <td>38</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MaxWithLayout>
  );
};

export default SizesContent;
