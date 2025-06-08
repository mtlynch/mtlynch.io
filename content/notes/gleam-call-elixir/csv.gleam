@external(erlang, "Elixir.CSV", "encode")
fn csv_encode(data: List(List(String))) -> a

@external(erlang, "Elixir.Enum", "to_list")
fn enum_to_list(elixir_enum: a) -> List(String)

pub fn encode(data: List(List(String))) -> List(String) {
  data
  |> csv_encode
  |> enum_to_list
}
