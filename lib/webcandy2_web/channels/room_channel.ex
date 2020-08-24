defmodule Webcandy2Web.RoomChannel do
  use Phoenix.Channel

  alias Webcandy2.Registry
  alias Webcandy2.Bucket

  def join("room:" <> room_id, params, socket) do
    is_client = params["client_name"] == room_id
    socket = assign(socket, :is_client, is_client)

    # If bucket already exists, this has no effect
    Registry.create(Registry, room_id)
    {:ok, bucket} = Registry.lookup(Registry, room_id)

    if !Bucket.get(bucket, :client_connected) do
      Bucket.put(bucket, :client_connected, is_client)

      if is_client do
        send(self(), "client_connect")
      end
    end

    # TODO: This doesn't seem very secure, TODO: Figure out what I meant by this
    {:ok,
     %{
       color: Bucket.get(bucket, :color),
       client_connected: Bucket.get(bucket, :client_connected)
     }, socket}
  end

  def terminate(_reason, socket) do
    # If client disconnects, broadcast the event to the channel
    if socket.assigns[:is_client] do
      room_id = String.slice(socket.topic, 5..-1)
      {:ok, bucket} = Registry.lookup(Registry, room_id)
      Bucket.put(bucket, :client_connected, false)

      broadcast(socket, "client_disconnect", %{})
    end
  end

  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # Handle color changes
  def handle_in("shout", payload, socket) do
    "room:" <> room_id = socket.topic
    {:ok, bucket} = Registry.lookup(Registry, room_id)
    Bucket.put(bucket, :color, payload)

    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  # Get around not being able to broadcast from join/3
  def handle_info("client_connect", socket) do
    broadcast(socket, "client_connect", %{})
    {:noreply, socket}
  end
end
