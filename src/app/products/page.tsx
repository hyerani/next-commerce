'use client';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { useState } from 'react';
// import ImageGallery from 'react-image-gallery';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const Products = () => {
  // 작은 썸네일 이미지 눌렀을때 해당 이미지로 이동
  const [index, setIndex] = useState(0);

  // return <ImageGallery items={images} />;
  return (
    <>
      <Carousel autoplay withoutControls wrapAround slideIndex={index}>
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex' }}>
        {images.map((item, idx) => (
          <div key={idx} onClick={() => setIndex(idx)}>
            <Image
              key={item.original}
              src={item.original}
              alt="image"
              width={100}
              height={60}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
