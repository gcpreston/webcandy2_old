defmodule Webcandy2.RegistryTest do
  @moduledoc """
  https://elixir-lang.org/getting-started/mix-otp/genserver.html
  """
  use ExUnit.Case, async: true

  alias Webcandy2.Bucket
  alias Webcandy2.Registry

  setup do
    registry = start_supervised!(Registry)
    %{registry: registry}
  end

  test "spawns buckets", %{registry: registry} do
    assert Registry.lookup(registry, "shopping") == :error

    Registry.create(registry, "shopping")
    assert {:ok, bucket} = Registry.lookup(registry, "shopping")

    Bucket.put(bucket, "milk", 1)
    assert Bucket.get(bucket, "milk") == 1
  end

  test "deletes buckets", %{registry: registry} do
    Registry.create(registry, "shopping")
    Registry.delete(registry, "shopping")
    assert Registry.lookup(registry, "shopping") == :error
  end

  test "removes buckets on exit", %{registry: registry} do
    Registry.create(registry, "shopping")
    {:ok, bucket} = Registry.lookup(registry, "shopping")
    Agent.stop(bucket)
    assert Registry.lookup(registry, "shopping") == :error
  end

  test "removes buckets on crash", %{registry: registry} do
    Registry.create(registry, "shopping")
    {:ok, bucket} = Registry.lookup(registry, "shopping")

    # Stop the bucket with non-normal reason
    Agent.stop(bucket, :shutdown)
    assert Registry.lookup(registry, "shopping") == :error
  end

  test "are temporary workers" do
    assert Supervisor.child_spec(Bucket, []).restart == :temporary
  end
end
