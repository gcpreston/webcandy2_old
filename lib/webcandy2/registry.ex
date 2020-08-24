defmodule Webcandy2.Registry do
  @moduledoc """
  A GenServer to keep track of the state of each active Webcandy client.

  https://elixir-lang.org/getting-started/mix-otp/genserver.html
  https://elixir-lang.org/getting-started/mix-otp/dynamic-supervisor.html
  """
  use GenServer

  require Logger

  ## Client API

  @doc """
  Starts the registry.
  """
  def start_link(opts) do
    GenServer.start_link(__MODULE__, :ok, opts)
  end

  @doc """
  Looks up the bucket pid for `name` stored in `server`.

  Returns `{:ok, pid}` if the bucket exists, `:error` otherwise.
  """
  def lookup(server, name) do
    GenServer.call(server, {:lookup, name})
  end

  @doc """
  Ensures there is a bucket associated with the given `name` in `server`.
  """
  def create(server, name) do
    GenServer.cast(server, {:create, name})
  end

  @doc """
  Ensures there is no bucket associated with the given `name` in `server`.
  """
  def delete(server, name) do
    GenServer.cast(server, {:delete, name})
  end

  ## GenServer callbacks

  @impl true
  def init(:ok) do
    # name -> bucket
    buckets = %{}
    # name -> ref
    names = %{}
    # ref -> name
    refs = %{}
    {:ok, {buckets, names, refs}}
  end

  @impl true
  def handle_call({:lookup, name}, _from, state) do
    {buckets, _, _} = state
    {:reply, Map.fetch(buckets, name), state}
  end

  @impl true
  def handle_cast({:create, name}, state) do
    {buckets, names, refs} = state

    if Map.has_key?(buckets, name) do
      {:noreply, state}
    else
      {:ok, pid} = DynamicSupervisor.start_child(Webcandy2.BucketSupervisor, Webcandy2.Bucket)
      ref = Process.monitor(pid)
      refs = Map.put(refs, ref, name)
      names = Map.put(names, name, ref)
      buckets = Map.put(buckets, name, pid)
      Logger.debug("Created bucket \"" <> name <> "\"")
      {:noreply, {buckets, names, refs}}
    end
  end

  @impl true
  def handle_cast({:delete, name}, state) do
    {buckets, names, refs} = state

    if Map.has_key?(names, name) do
      {ref, names} = Map.pop(names, name)
      refs = Map.delete(refs, ref)
      buckets = Map.delete(buckets, name)
      Logger.debug("Deleted bucket \"" <> name <> "\"")
      {:noreply, {buckets, names, refs}}
    else
      {:noreply, state}
    end
  end

  @impl true
  def handle_info({:DOWN, ref, :process, _pid, _reason}, {buckets, names, refs}) do
    # TODO: Cast delete to avoid code duplication?
    {name, refs} = Map.pop(refs, ref)
    names = Map.delete(names, name)
    buckets = Map.delete(buckets, name)
    Logger.debug("Deleted bucket \"" <> name <> "\"")
    {:noreply, {buckets, names, refs}}
  end

  @impl true
  def handle_info(msg, state) do
    Logger.debug("Received message: " <> msg)
    {:noreply, state}
  end
end
