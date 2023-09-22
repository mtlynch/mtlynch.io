{
  programs.bash.shellAliases = {
    gc = "git commit --message";
    gs = "git status";
    td = "pushd $(mktemp -d)";
  };
}
