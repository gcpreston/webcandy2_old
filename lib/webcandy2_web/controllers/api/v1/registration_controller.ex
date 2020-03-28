defmodule Webcandy2Web.API.V1.RegistrationController do
  use Webcandy2Web, :controller

  alias Ecto.Changeset
  alias Plug.Conn
  alias Webcandy2Web.ErrorHelpers

  @spec create(Conn.t(), map()) :: Conn.t()
  def create(conn, %{"user" => user_params}) do
    conn
    |> Pow.Plug.create_user(user_params)
    |> case do
      {:ok, _user, conn} ->
        json(conn, %{data: %{token: conn.private[:api_access_token], renewal_token: conn.private[:api_renewal_token]}})

      {:error, changeset, conn} ->
        errors = Changeset.traverse_errors(changeset, &ErrorHelpers.translate_error/1)

        conn
        |> put_status(500)
        |> json(%{error: %{status: 500, message: "Couldn't create user", errors: errors}})
    end
    |> Conn.halt
  end
end
