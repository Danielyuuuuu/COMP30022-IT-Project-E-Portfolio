import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://i.pinimg.com/originals/db/1c/1a/db1c1ad07b38e8feab26ab31c2961b75.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Product Design',
    key: '1'
  },
  {
    src: 'https://i.redd.it/wc2vtyzlnmw41.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Photography & Images',
    key: '2'
  },
  {
    src: 'http://sf.co.ua/16/08/wallpaper-3b352.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Graphic Design',
    key: '3'
  }
];

const HomeSlide = () => <UncontrolledCarousel items={items} />;

export default HomeSlide;