/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Marker, TileLayer } from 'react-leaflet';
import { useParams, Link } from 'react-router-dom';
import L from 'leaflet';

import PrimaryButton from '../../components/PrimaryButton';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';

import './styles.css';
import api from '../../services/api';

import happyMapIcon from '../../utils/happyMapIcon';

interface OrphanageParams {
  id: string;
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekend: boolean;
  images: Array<{
    url: string;
    id: number;
  }>;
}
export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    });
  }, []);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                interactive={false}
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
              >
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta
                <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekend ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos
                  <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos
                  <br />
                  fim de semana
                </div>
              )}
            </div>
            <a
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?phone=55${orphanage.whatsapp}&text=Olá, gostaria de informações adicionais sobre o orfanato`}
              target="_blank"
            >
              <PrimaryButton type="button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </PrimaryButton>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
