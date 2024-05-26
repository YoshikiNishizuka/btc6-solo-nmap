import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './App.css'
// 現在地取得
const getCurrentPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

// 現在地アイコン=>未実装
const currentIcon = Leaflet.icon({
  // iconUrl: './mapIcon/icon1.png',
  iconSize: [40, 40],
});
// 検索値アイコン=>未実装
const placeIcon = Leaflet.icon({
  // iconUrl: "./mapIcon/icon2.png",
  iconSize: [40, 40],
  className: "placeIcon",
});

const App = () => {
  const [mapKey, setMapKey] = useState(0); //Map再描画用
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [placeData, setPlaceData] = useState([]);
  const [mapzoom, setMapzoom] = useState("13");

  useEffect(() => {
    moveCurrentPosition();
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => setPlaceData(data));
  }, []);

  const moveCurrentPosition = async () => {
    const location = await getCurrentPosition();
    setCurrentPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setMapKey(new Date().getTime());
  };

  // 検索処理
  const getAllList = () => {
    setMapzoom("13");
    setCurrentPosition({
      lat: 35.175,
      lng: 137.06,
    });
    setMapKey(new Date().getTime());
    fetch("/api/list")
      .then((res) => res.json())
      .then((data) => setPlaceData(data));
  };

  const getNearestList = async () => {
    setMapzoom("16");
    const location = await getCurrentPosition();
    setCurrentPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setMapKey(new Date().getTime());
  };

  return (
    <>
      <h1>N-map </h1><h2>~長久手市 公共トイレ検索 非公式ツール~</h2>
      <div>
        <button onClick={() => moveCurrentPosition()}>現在地へ移動</button>
        <button onClick={() => getAllList()}>長久手全表示</button>
        <button onClick={() => getNearestList()}>近い順検索</button>
      </div>
      {/* 地図表示 */}
      <MapContainer
        id="map"
        key={mapKey}
        center={currentPosition}
        zoom={mapzoom}
        style={{ height: "60vh", width: "80vw" }}
      >
        {/* 地図のタイル情報 */}
        <TileLayer
          //地理院タイル=>位置情報とズレる
          // attribution='&amp;copy <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a>'
          // url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 現在地ピン */}
        <Marker id="map" position={currentPosition}>
          <Popup>現在地</Popup>
        </Marker>
        {/* 検索地ピン */}
        {placeData.length > 0
          ? placeData.map((item) => (
              <Marker key={item.id} position={item}>
                <Popup>
                  <b> {item.name} </b>
                  <br />
                  {item.address}
                </Popup>
              </Marker>
            ))
          : null}
      </MapContainer>
    </>
  );
};

export default App;
