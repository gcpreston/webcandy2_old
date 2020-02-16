defmodule Webcandy2Web.TestController do
  use Webcandy2Web, :controller

  def index(conn, _) do
    text(conn, "Hello world!")
  end
end
