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
  secret_key_base: "P7vV71HvWVBcLbthtny6W+oTr6OeafLRjJHnoJ3bVrcAS8lBPRry0oqpebnU7Yjx",
  render_errors: [view: Webcandy2Web.ErrorView, accepts: ~w(json)],
  pubsub: [name: Webcandy2.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "KprOnfOk"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :guardian, Guardian,
  issuer: "Webcandy2",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Webcandy2.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
