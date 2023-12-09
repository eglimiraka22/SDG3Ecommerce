import { useEffect, useRef } from "react";
import "./style.css";
const MapOptika = () => {
  const mapContainerRef = useRef(null);

  const renderMap = () => {
    // Array of coordinates for multiple locations
    const locations = [
      { lat: 41.32975952060109, lng: 19.81327111473067, title: "Optika Luani, Rruga e Durresit" },
      { lat: 41.323742383556976, lng: 19.80450665811597, title: "Optika Luani, 21 Dhjetori" },
      { lat: 41.324923388886575, lng: 19.812774537188208, title: "Optika Luani ,Rruga Sami Frasheri" },
      // Add more locations as needed
    ];
  
    // Create map instance
    const map = new window.google.maps.Map(mapContainerRef.current, {
      zoom: 14,
      center: locations[0], // Set the center to the first location
    });
  
    // Add markers for each location
    locations.forEach(location => {
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: location.title,
      });
  
      // Add click event listener to open Google Maps
      marker.addListener('click', () => {
        const mapUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        window.open(mapUrl, '_blank');
      });
    });
  };
  
  const googleChecker = () => {
    if (!window.google) {
      setTimeout(googleChecker, 100);
    } else {
      renderMap();
    }
  };



  useEffect(() => {
    googleChecker();
  }, []); // Empty dependency array ensures that this effect runs only once

  return (
    <div className='map-holder'>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default MapOptika;
