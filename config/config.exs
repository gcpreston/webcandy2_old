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
  secret_key_base: "x3Evr6w/vnH7NEahMvA87B5lJiP2sulWYBYU0YhtmYPRe4uFfYtIpEf/avWjqEVz",
  render_errors: [view: Webcandy2Web.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Webcandy2.PubSub,
  live_view: [signing_salt: "t1Au2S+X"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
