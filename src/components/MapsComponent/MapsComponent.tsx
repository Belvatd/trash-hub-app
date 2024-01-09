"use client"

import React, { useState, useRef, useCallback } from "react";
import {
  useLoadScript,
  MarkerF,
  StandaloneSearchBox,
  StreetViewService,
  GoogleMap,
} from "@react-google-maps/api";

const loaderId = "ownersTownGoogleMapApiId";
const config = {
  googleMapsApiKey: "AIzaSyAhBcrx_GRr0IodqwWXAtPT7afiikDAoFE",
  language: "en",
  region: "IN",
  version: "weekly",
  libraries: ["places"],
  preventGoogleFontsLoading: true,
  id: loaderId,
};

const MapsComponent = ({ searchEnabled }: any) => {
  const { isLoaded, loadError } = useLoadScript(config);
  const Loading = <div>Loader</div>;
  const center = { lat: -6.175392, lng: 106.827153 };
  const [location, setLocation] = useState();
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const onClick = (e: any) => {
    console.log("onClick args: ", e);
  };

  const setNewLocation = () => {
    const place = mapRef.current.getPlaces();
    console.log(place[0].geometry.location.lat(), "lat");
    console.log(place[0].geometry.location.lng(), "lng");
    setLocation({
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng(),
    });
  };

  const onPlacesChanged = (...args:any) => {
    console.log("onPlacesChanged args: ", args);
    setNewLocation();
  };

  const onDragEnd = (...args: any) => {
    console.log("onDragEnd args: ", args);
    console.log(
      markerRef.current.position.lat(),
      markerRef.current.position.lng()
    );
    setLocation({
      lat: markerRef.current.position.lat(),
      lng: markerRef.current.position.lng(),
    });
    setNewLocation();
  };

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
    },
    [onPlacesChanged]
  );

  const onMarkerLoad = useCallback(
    (marker) => {
      markerRef.current = marker;
      // const path = marker.getPath();
      console.log(marker, "marker");
    },
    [onDragEnd]
  );

  const renderMap = (
    <GoogleMap
      id="searchbox-example"
      mapContainerStyle={{
        height: "500px",
        width: "100%",
      }}
      zoom={15}
      center={location || center}
      onClick={onClick}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        controlSize: 24,
      }}
    >
      {searchEnabled ? (
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Find your place"
            style={{
              boxSizing: "border-box",
              border: "1px solid transparent",
              width: "240px",
              backgroundColor: "#fff",
              height: "32px",
              padding: "0 12px",
              borderRadius: "3px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              fontSize: "14px",
              outline: "none",
              textOverflow: "ellipses",
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
            }}
          />
        </StandaloneSearchBox>
      ) : (
        <StreetViewService />
      )}
      <MarkerF
        position={location || center}
        draggable
        onDragEnd={onDragEnd}
        onLoad={onMarkerLoad}
      />
    </GoogleMap>
  );

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap : Loading;
};

export default MapsComponent;
