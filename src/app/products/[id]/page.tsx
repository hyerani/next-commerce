'use client';
import CustomEditor from '@/components/Editor';
import { EditorState, convertFromRaw } from 'draft-js';
import { Metadata } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Carousel from 'nuka-carousel';
import { useEffect, useState } from 'react';
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
  const params: Record<string, string | string[]> | null = useParams();
  const productId = params?.id;
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  );
  useEffect(() => {
    if (productId != null) {
      fetch(`http://localhost:3000/api/getProduct?id=${productId}`, {
        cache: 'no-store',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents)),
              ),
            );
          } else {
            setEditorState(EditorState.createEmpty());
          }
        });
    }
  }, [productId]);

  const handleSave = () => {
    alert('save');
  };

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
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Products;
