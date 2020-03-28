defmodule Webcandy2Web.API.V1.ProtectedController do
    use Webcandy2Web, :controller

    alias Plug.Conn
    alias Webcandy2Web.APIAuthPlug

    @pow_config [otp_app: :webcandy2]

    @spec no_auth_test(Conn.t(), map()) :: Conn.t()
    def no_auth_test(conn, _params) do
        conn
        |> json(%{data: %{message: "Hello, anonymous user!"}})
        |> Conn.halt()
    end

    @spec auth_test(Conn.t(), map()) :: Conn.t()
    def auth_test(conn, _params) do
        conn
        |> APIAuthPlug.fetch(@pow_config)
        |> case do
            {conn, nil} ->
                # This case should not occur due to this being a protected route
                conn
                |> put_status(401)
                |> json(%{error: %{status: 401, message: "Invalid token"}})
            
            {conn, user} ->
                conn
                |> json(%{data: %{message: "A protected hello to you, " <> user.email <> "!"}})
        end
        |> Conn.halt()
    end
end