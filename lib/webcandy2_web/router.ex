defmodule Webcandy2Web.Router do
  use Webcandy2Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api/v1", Webcandy2Web do
    pipe_through :api

    get "/test", TestController, :index
  end
end
