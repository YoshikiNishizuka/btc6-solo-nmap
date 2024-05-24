import "./App.css";
import Names from "./components/Names";


function App() {
  return (
    <>
      <script>
        {navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locationInfoElement =
              document.getElementById("location-info");
            locationInfoElement.textContent = `現在地 [ 緯度: ${latitude}, 経度: ${longitude} ]`;
          },

          function (error) {
            console.error("位置情報の取得に失敗しました。", error);
            const locationInfoElement =
              document.getElementById("location-info");
            locationInfoElement.textContent = "位置情報の取得に失敗しました。";
          }
        )}
        ;
      </script>
      <p id="location-info">位置情報取得中</p>
      <button >地図表示</button>
      <p className="read-the-docs">近くのトイレはここです</p>
      <p>
        <Names />
      </p>
    </>
  );
}

export default App;
