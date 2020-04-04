defmodule Webcandy2Web.API.V1.UserController do
  use Webcandy2Web, :controller

  @pow_config [otp_app: :webcandy2]

  alias Ecto.Changeset
  alias Plug.Conn
  alias Webcandy2Web.APIAuthPlug
  alias Webcandy2Web.ErrorHelpers

  @spec show(Conn.t(), map()) :: Conn.t()
  def show(conn, _params) do
    conn
    |> APIAuthPlug.fetch(@pow_config)
    |> case do
      {conn, nil} ->
          # This case should only occur in a web request if the route is unprotected
          conn
          |> put_status(401)
          |> json(%{status: 401, message: "Invalid token"})
      
      {conn, user} ->
          conn
          |> json(%{user: user})
    end
    |> Conn.halt
  end

  @spec create(Conn.t(), map()) :: Conn.t()
  def create(conn, %{"user" => user_params}) do
    conn
    |> Pow.Plug.create_user(user_params)
    |> case do
      {:ok, _user, conn} ->
        json(conn, %{token: conn.private[:api_access_token], renewal_token: conn.private[:api_renewal_token]})

      {:error, changeset, conn} ->
        errors = Changeset.traverse_errors(changeset, &ErrorHelpers.translate_error/1)

        conn
        |> put_status(500)
        |> json(%{status: 500, message: "Couldn't create user", errors: errors})
    end
    |> Conn.halt
  end
end
