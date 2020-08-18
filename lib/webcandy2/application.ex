defmodule Webcandy2.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Webcandy2.Repo,
      # Start the Telemetry supervisor
      Webcandy2Web.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Webcandy2.PubSub},
      # Start the Endpoint (http/https)
      Webcandy2Web.Endpoint,
      # Start a worker by calling: Webcandy2.Worker.start_link(arg)
      # {Webcandy2.Worker, arg}
      {Webcandy2.Registry, name: Webcandy2.RegistryServer}  # TODO: Figure out better name(s)?
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Webcandy2.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Webcandy2Web.Endpoint.config_change(changed, removed)
    :ok
  end
end
