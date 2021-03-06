/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Map as LeafletMap,
  MapProps as LeafletMapProps,
  TileLayer,
} from 'react-leaflet';

interface MapProps extends LeafletMapProps {
  interactive?: boolean;
  children: React.ReactNode;
}

export default function Map({
  children,
  interactive = true,
  ...props
}: MapProps) {
  return (
    <LeafletMap
      center={[-17.5638372, -52.560919]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...props}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {children}
    </LeafletMap>
  );
}
