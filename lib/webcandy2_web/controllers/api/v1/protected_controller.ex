defmodule Webcandy2Web.API.V1.ProtectedController do
    use Webcandy2Web, :controller

    alias Plug.Conn
    alias Pow.Plug

    @spec token_verify(Conn.t(), map()) :: Conn.t()
    def token_verify(conn, _params) do
        conn
        |> Plug.current_user()
        |> json(%{data: %{message: "A protected hello to you!"}})
    end
end