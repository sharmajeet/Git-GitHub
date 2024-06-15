import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "../App.css";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="homepage-container">
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm} >

        <input
          placeholder="Enter your email"
          className="input-container"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          placeholder="Enter room name"
          className="input-container"
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button className="call">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;