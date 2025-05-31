/// Encodes a list of rows to CSV format and returns as a single string.
@external(erlang, "Elixir.CSV", "encode")
fn csv_encode(data: List(List(String))) -> a

@external(erlang, "Elixir.Enum", "join")
fn enum_join(enumerable: a, separator: String) -> String

/// Converts data to CSV string format.
pub fn to_string(data: List(List(String))) -> String {
  data
  |> csv_encode
  |> enum_join("")
}
