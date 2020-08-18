defmodule Webcandy2.RegistrySupervisor do
  @moduledoc """
  https://elixir-lang.org/getting-started/mix-otp/supervisor-and-application.html
  """
  use Supervisor

  def start_link(opts) do
    Supervisor.start_link(__MODULE__, :ok, opts)
  end

  @impl true
  def init(:ok) do
    # https://elixir-lang.org/getting-started/mix-otp/dynamic-supervisor.html
    children = [
      {DynamicSupervisor, name: Webcandy2.BucketSupervisor, strategy: :one_for_one},
      {Webcandy2.Registry, name: Webcandy2.Registry}
    ]

    Supervisor.init(children, strategy: :one_for_all)
  end
end
