import React, { useState, useEffect } from "react";

function WebPlayback(props) {
  const [player, setPlayer] = useState(undefined);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getAccessToken() {
      let response = await fetch("/spotify/get-access-token");
      response = await response.json();
      setToken(response.access_token);
    }
    
    

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        getAccessToken();
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });
    
        setPlayer(player);
    
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });
    
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });
    
        player.connect();
      };
  }, []);

  

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          {player ? (
            <button
              className="btn-spotify"
              onClick={() => player.togglePlay()}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default WebPlayback;
