import gleam/io
import csv

pub fn main() {
  let books_data = [
    ["Title", "Author", "Release Year"],
    ["Infinite Jest", "David Foster Wallace", "1996"],
    ["Emma", "Jane Austen", "1815"],
    ["Catch-22", "Joseph Heller", "1961"]
  ]

  let csv_output = csv.to_string(books_data)

  io.println("Books encoded as CSV:")
  io.println(csv_output)
}
