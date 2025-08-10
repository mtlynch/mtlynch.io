// Create a custom Gleam type to represent the type we receive from Elixir.
type ElixirEnumerable

@external(erlang, "Elixir.CSV", "encode")
fn csv_encode(data: List(List(String))) -> ElixirEnumerable

@external(erlang, "Elixir.Enum", "to_list")
fn enum_to_list(elixir_enum: ElixirEnumerable) -> List(String)

pub fn encode(data: List(List(String))) -> List(String) {
  data
  |> csv_encode
  |> enum_to_list
}
