defmodule Webcandy2.Users.User do
  use Ecto.Schema
  use Pow.Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :email]}
  schema "users" do
    pow_user_fields()

    timestamps()
  end
end
