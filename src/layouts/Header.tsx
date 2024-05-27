import React from 'react';
import {FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { PiShoppingBagLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header
      style={{
        width: '100%',
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
        
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#4b0055',
          color: 'white',
          padding: '5px 10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <select
            style={{
              marginRight: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              color: '#333',
              backgroundColor: 'white',
            }}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">VND</option>
          </select>
          <select
            style={{
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              color: '#333',
              backgroundColor: 'white',
            }}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">VietNamese</option>
          </select>
        </div>

        <div style={{ textAlign: 'center', flex: 1 }}>
          🔥 Only 11 days left until VALENTINE'S DAY! 🔥
        </div>
        <div style={{ width: '170px' }}></div>
      </div>
      <div
        style={{
          width: '90%',
          margin: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '30%'}}>

          <input
            type="text"
            placeholder="Hey, what are you looking for?"
            style={{
              width: '90%',
              padding: '10px',
              borderRadius: '10px 0 0 10px',
              border: '1px solid #ccc',
            }}
          />
                    
        <button
            style={{
              padding: '10px',
              borderRadius: '0 10px 10px 0',
              border: '1px solid #ccc',
              backgroundColor: '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
               <FaSearch />
          </button>
        </div>
        <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    width: '50%',
    margin: '0 auto',

  }}
>
  <img
    src="https://imgs.search.brave.com/UxwOKcdQthp4oYCXIN9XOZ0FrRJJyRbPDre5EKdkEIA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU2LzE4LzIw/LzM2MF9GXzc1NjE4/MjA2MV9FZVdSWDZz/ZWgwRVcyV2dsaVlx/dGo1YjgxV1BWQmIx/cy5qcGc"
    alt="Perfume Icon"
    style={{
      width: '80px',
      height: 'auto',
      marginRight: '5px',
    }}
  />

  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'left', 
    }}
  >
    <h1
      style={{
        fontSize: '2.5em',
        color: '#4b0055',
        margin: '0',
        marginBottom: '5px',
      }}
    >
      PerfumeShop
    </h1>
    <p
      style={{
        fontSize: '1.2em',
        color: '#777',
        margin: '0',
      }}
    >
      TRUSTED ONLINE SINCE 1997
    </p>
  </div>
</div>

        <div style={{
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
}}>
    <span style={{
         fontSize: '24px'
         }}>
        <CiShoppingCart />
    </span>
    <a href="/account" style={{
         marginRight: '10px', textDecoration: 'none', color: '#333', whiteSpace: 'nowrap'
          }}>
            My Account</a>
    <span style={{
         fontSize: '24px' 
         }}>
        <CiHeart />
    </span>
    <a href="/wishlist" style={{ 
        marginRight: '10px', textDecoration: 'none', color: '#333' 
        }}>Wishlist</a>
    <span style={{
         fontSize: '24px' 
         }}>
        <PiShoppingBagLight />
    </span>
    <a href="/account" style={{ 
        marginRight: '-50px', textDecoration: 'none', color: '#333', whiteSpace: 'nowrap' 
        }}>
             2 Items</a>
</div>

      </div>

      <nav
        style={{
          width: '90%',
          margin: '0 auto',
          borderTop: '1px solid #ddd',
          padding: '10px 0',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <li style={{ margin: '0 10px' }}>
            <a
              href="/perfumes"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >
              Perfumes
            </a>
          </li>
          <li style={{ margin: '0 10px' }}>
            <a
              href="/brands"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >
              Brands
            </a>
          </li>
          <li style={{ margin: '0 10px' }}>
            <a
              href="/skincare"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >
              Skincare
            </a>
          </li>
          <li style={{ margin: '0 10px' }}>
            <a
              href="/makeup"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >
              Makeup
            </a>
          </li>
          <li style={{ margin: '0 10px' }}>
            <a
              href="/haircare"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >
              Haircare
            </a>
          </li>
          <li style={{ margin: '0 10px' }}>
            <a
              href="/aromatherapy"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >

              Aromatherapy
            </a>
          </li>
          <li style={{ margin: '0 10px' }}>
            <a
              href="/candles"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >
              Candles
            </a>
          </li>
          <li style={{ margin: '0 10px' }}>
            <a
              href="/gifts"
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '5px 10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
            >
              Gifts
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
