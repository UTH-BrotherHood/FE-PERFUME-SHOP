import React from 'react';
import Slider from 'react-slick';
import HeartIcon from '../svg/HeartIcon';
import Quote from './quote';

// Update your dataNocti interface
export interface dataNocti {
    id: number,
    content: string,
    author: string,
    image: string,
    title: string,
    price: string,
}

const dataPerfume: dataNocti[] = [
    {
        id: 1,
        content: "I Have Wanted This Perfume For The Longest Time And Couldn't Find It For A Good Price Anywhere Until I Discovered This Site.One Of My Favorites And I Get Complimented EveryTime I Wear It !!",
        author: "Clement Hoang",
        image: "https://aime.co/5863-pdt_360/parfum-de-peau-ori.jpg",
        title: "Perfume A",
        price: "$100",
    },
    {
        id: 2,
        content: "I Have Wanted This Perfume For The Longest Time And Couldn't Find It For A Good Price Anywhere Until I Discovered This Site.One Of My Favorites And I Get Complimented EveryTime I Wear It !!",
        author: "Clement Hoang",
        image: "https://aime.co/5863-pdt_360/parfum-de-peau-ori.jpg",
        title: "Perfume B",
        price: "$120",
    },
    {
        id: 3,
        content: "I Have Wanted This Perfume For The Longest Time And Couldn't Find It For A Good Price Anywhere Until I Discovered This Site.One Of My Favorites And I Get Complimented EveryTime I Wear It !!",
        author: "Clement Hoang",
        image: "https://aime.co/5863-pdt_360/parfum-de-peau-ori.jpg",
        title: "Perfume C",
        price: "$90",
    },
];

function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="btnRight absolute top-1/2 transform -translate-y-1/2 -right-20 z-10"
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="95" viewBox="0 0 40 95" fill="none">
                <rect x="37" y="95" width="34" height="95" transform="rotate(-180 37 95)" fill="#e5e5e5" />
                <path d="M18.3333 51.1667L22.5 47.0001L18.3333 42.8334" stroke="black" strokeLinecap="round" />
            </svg>
        </div>
    );
}

function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="btnLeft absolute top-1/2 transform -translate-y-1/2 -left-20 z-10"
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="95" viewBox="0 0 40 95" fill="none">
                <rect x="3" width="34" height="95" fill="#e5e5e5" />
                <path d="M21.6667 43.8333L17.5 47.9999L21.6667 52.1666" stroke="black" strokeLinecap="round" />
            </svg>
        </div>
    );
}

export default function SlideNocti() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="bg-[#f5f6f6]">
            <div className="w-3/5 m-auto ">
                <div>
                    <Slider {...settings}>
                        {dataPerfume.map((d) => (
                            <div key={d.id} className="p-4  ">
                                <div className=" flex py-24 gap-12">
                                    <img src={d.image} alt={d.title} className="w-48 rounded-[50%] h-48" />
                                    <div className='flex flex-col items-baseline'>
                                        <Quote/>
                                     
                                        <p className="mt-2">{d.content}</p>
                                        <p className="mt-7  font-bold uppercase">- {d.author}</p>
                                        <div className="flex justify-end mt-4">
                                            <HeartIcon />
                                        </div> 
                                    </div>
                                   
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
