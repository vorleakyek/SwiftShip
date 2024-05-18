import { useNavigate } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
import { getUserInfo } from '../data';
import { AppContext } from '../components/AppContext';
import { set } from 'husky';

export default function Checkout() {

  const { user } = useContext(AppContext);

  const [card, setCard] = useState('');
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    address: '',
    city: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    state: '',
    zipCode: '',
    email:''
  });

  const navigate = useNavigate();
  function handleSubmit() {
    navigate('/check-out');
  }

  useEffect(()=>{
    async function getInfo() {
      const userInfo = await getUserInfo(user.userID);
      if(userInfo) setUserInfo(userInfo);
    }

    getInfo();
  },[]);

  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phoneNumber,
    state,
    email,
  } = userInfo;

  return (
    <>
      <div>
        <h1 className='font-bold py-2'>Checkout</h1>
        <div className="bg-neutral-300 py-1 px-3 font-semibold">
          <h2>1. Shipping and billing address</h2>
        </div>
        <div className='text-left'>
          <p>Name: {firstName} {lastName}</p>
          <p>Email: {email}</p>
          <div>
            <span className="inline m-0">Address: </span>
            <div className="inline-block ml-1">
              {address},
              <span className="m-0">
                {city}, {state} {zipCode}
              </span>
            </div>
          </div>

          <p>{phoneNumber}</p>
        </div>

      </div>
      <div>

        <div className="bg-neutral-300 py-1 px-3 font-semibold">
          <h2>2. Payment Information</h2>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="pt-3">
            <p>Credit Card</p>
          </div>
          <div className="flex">
            <img
              src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/visa-new.svg"
              alt="visa"
            />
            <img
              src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/master-new.svg"
              alt="master"
            />
            <img
              src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/discover-new.svg"
              alt="discover"
            />
            <img
              src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/amex-new.svg"
              alt="america-express"
            />
          </div>
          <div className="pt-3">
            <label htmlFor="card-info">
              <span className="mr-2 mt-3">Debit/Credit Card Number:</span>
              <div className="ml-3">
                <input
                  id="card-info"
                  name="card-info"
                  type="number"
                  className={`input-box ${!card && isError ? 'red-border' : 'gray-border'
                    } `}
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${!card && isError ? '' : 'hidden'
                    }`}>
                  Card number field is required
                </span>
              </div>
            </label>
          </div>
          <div className="flex justify-center pt-2">
            <button className="bg-amber-400 rounded-3xl px-5 py-1 my-3">
              Review Order
            </button>
          </div>
        </form>

      </div>


    </>

  );
}
