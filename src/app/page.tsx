'use client';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  // const [products, setProducts] = useState<
  //   { id: string; properties: { id: string }[] }[]
  // >([]);
  const [products, setProducts] = useState<
    { id: string; name: string; createdAt: string }[]
  >([]);
  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/products`)
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.items));
  // }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/api/getProducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data.items));
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = async () => {
    if (inputRef.current === null || inputRef.current.value === '') {
      alert('name을 넣어주세요');
      return;
    }
    await fetch(
      `http://localhost:3000/api/notion?name=${inputRef.current?.value}`,
    )
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  return (
    <main>
      <input ref={inputRef} type="text" placeholder="name" />
      <button onClick={handleClick}>add jacket</button>
      <div>
        <p>Product List</p>
        {products &&
          products.map((item) => (
            <div key={item.id}>
              {item.name}
              <span>{item.createdAt}</span>
            </div>
          ))}
        {/* {products &&
          products.map((item) => (
            <div key={item.id}>
              {JSON.stringify(item)}
              {item.properties &&
                Object.entries(item.properties).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      fetch(
                        `http://localhost:3000/api/detail?pageId=${item.id}&propertyId=${value.id}`,
                      )
                        .then((res) => res.json())
                        .then((data) => alert(JSON.stringify(data.detail)));
                    }}
                  >
                    {key}
                  </button>
                ))}
              <br />
              <br />
            </div>
          ))} */}
      </div>
    </main>
  );
}
