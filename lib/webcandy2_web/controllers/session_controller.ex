defmodule Webcandy2Web.SessionController do
  use Webcandy2Web, :controller

  alias Webcandy2.{Accounts, Accounts.User, Accounts.Guardian}

  def new(conn, _) do
    changeset = Accounts.change_user(%User{})
    maybe_user = Guardian.Plug.current_resource(conn)
    if maybe_user do
      redirect(conn, to: "/secret")
    else
      render(conn, "new.html", changeset: changeset, action: Routes.session_path(conn, :login))
    end
  end

  def login(conn, %{"user" => %{"username" => username, "password" => password}}) do
    case Accounts.authenticate_user(username, password) do
      {:ok, user} ->
        conn
        |> put_session(:current_user_id, user.id)
        |> configure_session(renew: true)
        |> put_status(:ok)
        |> put_view(Webcandy2Web.UserView)
        |> render("show.json", user: user)
      {:error, message} ->
        conn
        |> delete_session(:current_user_id)
        |> put_status(:unauthorized)
        |> put_view(Webcandy2Web.ErrorView)
        |> render("401.json", message: message)
      end
  end

  def logout(conn, _) do
    conn
    |> Guardian.Plug.sign_out(Guardian, _opts = [])
    |> render("logout.json")
  end

  defp login_reply({:ok, user}, conn) do
    conn
    |> Guardian.Plug.sign_in(Guardian, user)
    # |> redirect(to: "/secret")
  end

  defp login_reply({:error, reason}, conn) do
    conn
    |> put_flash(:error, to_string(reason))
    |> new(%{})
  end
end
