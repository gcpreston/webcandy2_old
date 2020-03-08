# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :webcandy2,
  ecto_repos: [Webcandy2.Repo]

# Configures the endpoint
config :webcandy2, Webcandy2Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "/fXUOWe+b8NvgtjetQ2A2zdFc/W//M0AuYkAq4eNWwo7HOS1tgURx+lUawXQ6/t0",
  render_errors: [view: Webcandy2Web.ErrorView, accepts: ~w(json)],
  pubsub: [name: Webcandy2.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "iKUo0n8B"]

config :webcandy2, :pow,
  user: Webcandy2.Users.User,
  repo: Webcandy2.Repo

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
