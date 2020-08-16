defmodule Webcandy2Web.Router do
  use Webcandy2Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  pipeline :auth do
    plug Webcandy2.Accounts.Pipeline
  end

  # We use ensure_auth to fail if there is no one logged in
  pipeline :ensure_auth do
    plug Guardian.Plug.EnsureAuthenticated
  end

  # Maybe logged in routes
  scope "/api/v1", Webcandy2Web do
    pipe_through :api

    get "/login", SessionController, :new
    post "/login", SessionController, :login
    get "/logout", SessionController, :logout
  end


  # Definitely logged in scope
  scope "/api/v1", Webcandy2Web do
    pipe_through [:api, :auth, :ensure_auth]

    resources "/users", UserController
  end
end
