import L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface IRouter {
      route(waypoints: L.LatLng[], callback: (err: any, routes: any[]) => void, context?: any): void;
    }

    interface IControlOptions {
      waypoints?: L.LatLng[];
      routeWhileDragging?: boolean;
      addWaypoints?: boolean;
      draggableWaypoints?: boolean;
      showAlternatives?: boolean;
      lineOptions?: any;
      router?: IRouter;
    }

    class Control extends L.Control {
      constructor(options?: IControlOptions);
      addTo(map: L.Map): this;
      remove(): this;
    }

    function control(options?: IControlOptions): Control;

    interface IOSRMV1Options {
      profile?: string;
      serviceUrl?: string;
    }

    function osrmv1(options?: IOSRMV1Options): IRouter;
  }
}
