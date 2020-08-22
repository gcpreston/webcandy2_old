defmodule Webcandy2Web.RoomChannel do
  use Phoenix.Channel

  alias Webcandy2.Registry
  alias Webcandy2.Bucket

  def join("room:" <> room_id, _params, socket) do
    # For now, simply create a bucket for the room if one doesn't already exist
    resp = Registry.lookup(Registry, room_id)
    if resp == :error do
      Registry.create(Registry, room_id)
      {:ok, socket}
    else
      {:ok, bucket} = resp
      {:ok, %{color: Bucket.get(bucket, :color)}, socket}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  def handle_in("shout", payload, socket) do
    "room:" <> room_id = socket.topic
    {:ok, bucket} = Registry.lookup(Registry, room_id)
    Bucket.put(bucket, :color, payload)

    broadcast socket, "shout", payload
    {:noreply, socket}
  end
end
