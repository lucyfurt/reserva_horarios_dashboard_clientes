import React from 'react';
import { Carousel } from 'antd';
import image1 from '../temp/sala1.jpg'; 
import image2 from '../temp/sala2.jpg';
import image3 from '../temp/sala3.jpg';

const contentStyle = {
  height: '100vh', 
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

const App = () => (
  <Carousel autoplay>
    <div>
      <h3 style={{ ...contentStyle, backgroundImage: `url(${image1})` }}></h3>
    </div>
    <div>
    <h3 style={{ ...contentStyle, backgroundImage: `url(${image2})` }}></h3>
    </div>
    <div>
    <h3 style={{ ...contentStyle, backgroundImage: `url(${image3})` }}></h3>
    </div>
  </Carousel>
);

export default App;
