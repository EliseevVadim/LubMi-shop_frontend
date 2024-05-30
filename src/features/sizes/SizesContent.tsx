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
              <th>ЕВРОПЕЙСКИЙ РАЗМЕР</th>
              <th>РОССИЙСКИЙ РАЗМЕР</th>
              <th>ОБХВАТ ГРУДИ</th>
              <th>ОБХВАТ ТАЛИИ</th>
              <th>ОБХВАТ БЕДЕР</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>XS</td>
              <td>42</td>
              <td>82-85</td>
              <td>60-63</td>
              <td>90-93</td>
            </tr>
            <tr>
              <td>S</td>
              <td>44</td>
              <td>86-89</td>
              <td>64-67</td>
              <td>94-97</td>
            </tr>
            <tr>
              <td>M</td>
              <td>46</td>
              <td>90-93</td>
              <td>68-71</td>
              <td>98-101</td>
            </tr>
            <tr>
              <td>L</td>
              <td>48</td>
              <td>94-97</td>
              <td>72-75</td>
              <td>102-105</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>50</td>
              <td>98-101</td>
              <td>76-80</td>
              <td>106-109</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MaxWithLayout>
  );
};

export default SizesContent;
