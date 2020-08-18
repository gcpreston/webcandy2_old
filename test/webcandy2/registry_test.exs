defmodule Webcandy2.RegistryTest do
  @moduledoc """
  https://elixir-lang.org/getting-started/mix-otp/genserver.html
  """
  use ExUnit.Case, async: true

  setup do
    registry = start_supervised!(Webcandy2.Registry)
    %{registry: registry}
  end

  test "spawns buckets", %{registry: registry} do
    assert Webcandy2.Registry.lookup(registry, "shopping") == :error

    Webcandy2.Registry.create(registry, "shopping")
    assert {:ok, bucket} = Webcandy2.Registry.lookup(registry, "shopping")

    Webcandy2.Bucket.put(bucket, "milk", 1)
    assert Webcandy2.Bucket.get(bucket, "milk") == 1
  end

  test "removes buckets on exit", %{registry: registry} do
    Webcandy2.Registry.create(registry, "shopping")
    {:ok, bucket} = Webcandy2.Registry.lookup(registry, "shopping")
    Agent.stop(bucket)
    assert Webcandy2.Registry.lookup(registry, "shopping") == :error
  end
end
