import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface RoutingMachineProps {
  routePoints: [number, number][];
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ routePoints }) => {
  const map = useMap();

  const waypoints = routePoints.map(point => L.latLng(point[0], point[1]));

  const routingControl = L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: false,
    router: L.Routing.osrmv1({
      serviceUrl: 'http://router.project-osrm.org/route/v1',
      profile: 'driving',
    }),
  });

  useEffect(() => {
    if (!map) return;

    routingControl.addTo(map);

  }, [map, routePoints]);

  return null;
};

export default RoutingMachine;
