### Exploring string length in C

In C, if I print information about a string, the

```c
void print_string_info(char* value) {
  printf("len=%lu\n", strlen(value));
  printf("value=[%s]\n", value);
}
```

If I call the function with the string `"hello"`:

```c
print_string_info("hello");
```

I get results like this:

```text
len=5
value=[hello]
```

### Truncatings trings in C

However, I can effectively truncate the string by replacing a character with the null byte (`\0`):

```c
char s[] = "hello";
s[2] = '\0';
print_string_info(s);
```

```text
len=2
value=[he]
```

Because I replaced the character at index `2` with a null byte, every string function in C treats that string as if it were two characters long.

This isn't a problem, but now any function that sees the string has no way of knowing the "true" length of the string.

### Corrupting strings in C

What happens if I replace the null character in a string?

```c
char s[] = "hello";
s[5] = 'A'; // Replace the null byte with A.
print_string_info(s);
```

The results in this case are undefined. The program might crash, or it might print out random garbage. `strlen` and `printf` will continue reading past the `A` character looking for the next null byte, but I don't control memory past the end of the `"hello"` string I declared. The program will just be reading whatever happens to be in RAM at that memory location.

Often, overwriting the null terminator causes the program to crash because the operating system detects the application attempting to read memory outside of the address space that the program was assigned. This is the cause of many bugs and security vulnerabilities in C applications.

### Buffer overflows bugs in C

Suppose you have the following function in C that takes a string and adds " rules!" to it:

```c
// INSECURE: Don't do any of this in production code.
void print_rules(char* name) {
  // Create a buffer for our full string that can hold 14 characters plus a null
  // terminator.
  char str[15] = {'\0'};

  // Copy the name into the buffer.
  strcpy(str, name);

  // Copy the end of the string into the buffer.
  strcat(str, " rules!");

  // Print the contents of the full string.
  printf("%s\n", str);
}
```

If I call the function like this:

```c
print_rules("michael");
```

Then the function will print a result like this:

```text
michael rules!
```

My buffer `str` only has enough room for 15 characters, including the null terminator. The string `"michael"` is seven characters, excluding terminator. The string `" rules"` is six characters, excluding null. The `print_rules` is able to concatenate the two into a 15-character buffer (7 + 6) and still have room for the null terminator.

If I try a longer string and exceed the limits of my 15-byte buffer, things don't go so well:

```c
print_rules("rumplestiltskin");
```

```text
*** buffer overflow detected ***: terminated
```

The program crashes because I tried to write beyond the memory region that was allocated for my application. C failed to prevent this mistake because C compilers generally can't identify this class of error, which has been a pervasive source of bugs and security vulnerabilities in C applications.

Calling strlen

```bash
$ zig run src/strings.zig --needed-library c
```

https://www.huy.rocks/everyday/01-04-2022-zig-strings-in-5-minutes
