import { useState, useEffect } from 'react';
import CafeItem from './CafeItem.jsx';
import Meals from './Meals.jsx'; 
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';
import Button from './UI/Button.jsx';
import { sortPlacesByDistance } from '../loc.js';

const requestConfig = {};

export default function Cafe() {
  const [showMenu, setShowMenu] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false); 
  const [cafes, setCafes] = useState([]);
  const {
    data: loadedCafe,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/places', requestConfig, []);

  useEffect(() => {
    if (!isLoading && !error && loadedCafe) {
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedCafes = sortPlacesByDistance(loadedCafe.places, position.coords.latitude, position.coords.longitude);
        setCafes(sortedCafes);
      });
    }
  }, [isLoading, error, loadedCafe]);

  if (isLoading) {
    return <p className="center">Fetching places...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch places" message={error} />;
  }

  const handleViewMenu = () => {
    setShowMenu(true);
    setShowBackButton(true); 
  };

  const handleGoBack = () => {
    setShowMenu(false);
    setShowBackButton(false); 
  };

  return (
    <>
      {showBackButton && (
      <div style={{ marginLeft: '220px' }}>
        <Button onClick={handleGoBack}>Back</Button>
      </div>
    )}

      {showMenu ? (
        <Meals />
      ) : (
        <ul id="places">
          {cafes.map((cafe) => (
            <CafeItem key={cafe.id} cafe={cafe} onViewMenu={handleViewMenu} /> 
          ))}
        </ul>
      )}
    </>
  );
}
