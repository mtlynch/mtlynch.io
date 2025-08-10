import gleam/io
import gleam/string
import csv

pub fn main() {
  [
    ["Title", "Author", "Release Year"],
    ["Infinite Jest", "David Foster Wallace", "1996"],
    ["Emma", "Jane Austen", "1815"],
    ["Catch-22", "Joseph Heller", "1961"]
  ] |> csv.encode()
    |> string.concat()
    |> io.print()
}
