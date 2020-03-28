defmodule Webcandy2Web.Router do
  use Webcandy2Web, :router
  use Pow.Phoenix.Router

  # Set up according to https://hexdocs.pm/pow/api.html

  pipeline :api do
    plug :accepts, ["json"]
    plug Webcandy2Web.APIAuthPlug, otp_app: :webcandy2
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: Webcandy2Web.APIAuthErrorHandler
  end

  scope "/api/v1", Webcandy2Web.API.V1, as: :api_v1 do
    pipe_through :api

    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create, :delete]
    post "/session/renew", SessionController, :renew
    get "/unprotected", ProtectedController, :no_auth_test
  end

  scope "/api/v1", Webcandy2Web.API.V1, as: :api_v1 do
    pipe_through [:api, :api_protected]

    # protected endpoints here
    get "/protected", ProtectedController, :auth_test
  end
end
