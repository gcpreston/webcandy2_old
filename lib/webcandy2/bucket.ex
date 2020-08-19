defmodule Webcandy2.Bucket do
  @moduledoc """
  https://elixir-lang.org/getting-started/mix-otp/agent.html
  """
  use Agent, restart: :temporary  # TODO: Wondering how the future logic to reconnect dropped clients will mingle with this

  @doc """
  Starts a new bucket.
  """
  def start_link(_opts) do
    Agent.start_link(fn -> %{} end)
  end

  @doc """
  Gets a value from the `bucket` by `key`.
  """
  def get(bucket, key) do
    Agent.get(bucket, &Map.get(&1, key))
  end

  @doc """
  Puts the `value` for the given `key` in the `bucket`.
  """
  def put(bucket, key, value) do
    Agent.update(bucket, &Map.put(&1, key, value))
  end
end
