defmodule Webcandy2.BucketTest do
  use ExUnit.Case, async: true

  test "stores values by key" do
    {:ok, bucket} = Webcandy2.Bucket.start_link([])
    assert Webcandy2.Bucket.get(bucket, "milk") == nil

    Webcandy2.Bucket.put(bucket, "milk", 3)
    assert Webcandy2.Bucket.get(bucket, "milk") == 3
  end
end
