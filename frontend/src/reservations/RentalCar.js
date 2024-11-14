import React, { useEffect,useState } from 'react';
import './RentalCar.css';
import axios from 'axios';

const RentalCar = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
      const fetchMenus = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/arentcar/user/cars`);
          if (response.data) {
            setCars(response.data);
          }
        } catch (error) {
          console.error('There was an error fetching the movies!', error);
        }
      };
  
      fetchMenus();
    }, []);

    return (
        <>
        {cars.map((car, index) => {
        console.log(car);  // 각 car 데이터를 출력합니다
        return (
          <div className='rental-car-wrap'>
          <a href='#' key={index}>
            <div className='rental-car-title'>
              <h3>{car.car_type_name}</h3>
              <p className='rental-car-detail'>{car.fuel_type} | {car.seating_capacity} | {car.model_year}</p>
            </div>
            <img src={`${process.env.REACT_APP_IMAGE_URL}/${car.car_image_name}`} alt="Car Image" id='car-image'/>
          </a>
          </div>
        );
      })}
            </>
    );
}

export default RentalCar;
